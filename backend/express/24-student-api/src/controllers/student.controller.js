import mongoose from "mongoose";
import Student from "../models/Student.model.js";
import ApiError from "../utils/ApiError.js";
import deleteFile from "../utils/deleteFile.js";

const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

const createStudent = async (req, res, next) => {
  try {
    // This line will cause the issue because req.body contains only text fields not file fields. You need to handle file uploads separately.
    // const student = await Student.create(req.body);

    const { name, rollNo } = req.body;

    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      // How it works ?
      // If a student with the same roll number already exists
      // We throw an ApiError with a 400 status code and a message indicating that the student already exists.
      // This error will be caught by the catch block below
      // The error will be then caught by global error handler middleware and sent as a response to the client.
      throw new ApiError(400, "Student with this roll number already exists");
    }
    const student = await Student.create({
      name,
      rollNo,
      profile: req.file ? req.file.path : null,
    });

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    // Remove uploaded file if student creation fails due to DB error
    if (req.file) {
      await deleteFile(req.file.path);
    }

    next(error);
  }
};
/* 
POST /students
        |
Image Uploaded
        |
        ↓
createStudentValidator
        |
        |
   -----------------
   |               |
 Invalid         Valid
   |               |
deleteFile()       |
   |               |
400 Error          |
                   ↓
        createStudent Controller
                  |
                  ↓
        Check duplicate rollNo
                  |
          -----------------
          |               |
       Exists            New
          |               |
      ApiError       Student.create()
          |               |
          |          --------------
          |          |            |
          |       Success       Error
          |          |            |
          |       Response    deleteFile()
          |                       |
      errorHandler            errorHandler
*/

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};
/* 
Request
    |
    ↓
validateObjectId middleware
    |
    ├── Invalid ID
    |       ↓
    |   Error response (400)
    |
    └── Valid ID
            |
            ↓
      getStudentById controller
            |
            ↓
      Student.findById()
            |
        ┌───────────────┐
        │               │
    Found          Not Found
        │               │
        ↓               ↓
    200 OK       throw ApiError(404)
                        |
                        ↓
                errorHandler
*/

const updateStudentById = async (req, res, next) => {
  // When we should delete the newly uploaded image

  // Scenerio 1:
  // If student does not exist, but multer may have already uploaded a new image.
  // Remove it because it has no database reference. and we did it twice.
  // one in the catch block and one in the try block.
  // so now catch block deletion is unnecessary

  // Scenerio 2:
  // If student exists, and again multer may have already uploaded a new image.
  // In this sceneiro, we must need image cleanup in catch block (in all cases student found)
  // Case 1: Duplicate rollNo
  // Request -> Multer uploads image -> Find student -> Student found -> Check duplicate rollNo -> Duplicate found -> throw ApiError(400) -> catch -> Delete uploaded image
  // Case 2: MongoDB connection fails
  // Request -> Multer uploads image -> Find student -> Student found -> findByIdAndUpdate() -> MongoDB disconnected -> catch -> Delete uploaded image
  // Case 3: Mongoose validation error
  // Request -> Multer uploads image -> Find student -> Student found -> findByIdAndUpdate({ runValidators: true }) (rollNo must be +ve) -> Mongoose ValidationError -> catch -> Delete uploaded image

  let shouldDeleteNewImage = !!req.file; // we prefer !!req.file instead of assigning true because we want to store the actual condition of whether a file exists, not blindly set it to true.

  try {
    const { name, rollNo } = req.body;

    // check if student exists or not
    const existingStudent = await Student.findById(req.params.id);
    if (!existingStudent) {
      // Student does not exist,
      // but multer may have already uploaded a new image.
      // Remove it because it has no database reference.
      if (req.file) {
        await deleteFile(req.file.path);
        shouldDeleteNewImage = false; // we set it to false because we have already deleted the newly uploaded image, so no need to delete it again in catch block.
      }
      throw new ApiError(404, "Student not found");
    }

    // if student exists, check updated rollNo is unique or not
    // we did it because usually rollNo comes as string from req.body, but in DB it is stored as number. So we need to convert it to number before comparing.
    const newRollNo = rollNo ? Number(rollNo) : undefined;
    if (newRollNo && newRollNo !== existingStudent.rollNo) {
      const studentWithSameRollNo = await Student.findOne({
        rollNo: newRollNo,
      });
      if (studentWithSameRollNo) {
        throw new ApiError(400, "Student with this roll number already exists");
      }
    }

    // prepare the update object
    const updatedData = {};

    // update only those fields which are present in the request body
    // if (name) updatedData.name = name;
    // if (newRollNo) updatedData.rollNo = newRollNo;

    // Industry statndards : update fields via comparing with undefined (because rollNo provide 0 will be falsy value, and upper logic will fail to update rollNo to 0)
    if (name !== undefined) updatedData.name = name;
    if (newRollNo !== undefined) updatedData.rollNo = newRollNo;
    if (req.file) updatedData.profile = req.file.path;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true },
    );

    // Database update successfull, now no need to delete the newly uploaded image in catch block
    shouldDeleteNewImage = false;

    // Database update successfull
    // Now delete old image
    // Important: Never delete old image before DB update, if DB update fails then that student  will have broken profile path
    if (req.file && existingStudent.profile) {
      await deleteFile(existingStudent.profile);
    }

    // return response
    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    // If DB update fails, delete the newly uploaded image to avoid orphan files
    if (shouldDeleteNewImage) {
      await deleteFile(req.file.path);
    }

    // Pass the error to the global error handler middleware
    next(error);
  }
};

/* 
PATCH /students/:id
        |
        ↓
validateObjectId
        |
        |
  -------------------
  |                 |
Invalid           Valid
  |                 |
400 Error     updateStudentValidator
                       |
                ----------------
                |              |
             Invalid         Valid
                |              |
            400 Error     upload.single()
                                |
                                ↓
                    updateStudentById Controller
                                |
                                ↓
                    Find existing student
                                |
                    -----------------------
                    |                     |
               Not Found                Found
                    |                     |
            Delete new image              |
                    |                     |
                    ↓                     ↓
             ApiError(404)       Check rollNo change
                                          |
                                -----------------------
                                |                     |
                          Duplicate               Unique
                                |                     |
                        throw ApiError            Prepare updateData
                                |                     |
                                ↓                     ↓
                         catch block            findByIdAndUpdate()
                                |                     |
                         delete new image        ----------------------
                                                 |                    |
                                                Success              Error
                                                   |                   |
                                 shouldDeleteNewImage=false            |
                                                   |                   |
                                            Delete old image           |
                                                   |                   |
                                            Send response              |
                                                                       |
                                                                 catch block
                                                                       |
                                                         shouldDeleteNewImage?
                                                                 |
                                                    -------------------------
                                                    |                       |
                                                  True                  False
                                                    |                       |
                                           Delete new image             Nothing
                                                    |
                                                    ↓
                                               errorHandler

*/

const deleteStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }
    
    // await Student.findByIdAndDelete(req.params.id);
    await student.deleteOne(); // This is better than findByIdAndDelete because you already fetched the student document, so you can call deleteOne() on it directly. This avoids an extra query to the database.

    // Delete the profile image if it exists after DB deletion to avoid broken profile path in case of DB deletion failure
    if (student.profile) {
      await deleteFile(student.profile);
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* 
DELETE /students/:id
          |
          ↓
 validateObjectId middleware
          |
          ↓
 deleteStudentById controller
          |
          ↓
 Student.findById()
          |
     ----------------
     |              |
 Not Found        Found
     |              |
     ↓              ↓
ApiError(404)   Store profile path
                    |
                    ↓
          findByIdAndDelete()
                    |
          -----------------
          |               |
       Success          Error
          |               |
          ↓               ↓
    deleteFile()      errorHandler
          |
          ↓
    Send response
*/

export {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
