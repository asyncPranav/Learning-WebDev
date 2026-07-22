const express = require("express");
const router = express.Router();

const Student = require("../models/students.model");

const multer = require("multer");
const path = require("path");
const fs = require("fs/promises"); // for deleting files like profile_pic using promises instead of callbacks

const mongoose = require("mongoose"); // for validating ObjectId in the request params for update and delete operations

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const newFileName = `${baseName}-${Date.now()}${ext}`;
    cb(null, newFileName);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  /*   
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    } 
  */
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Initialize multer with storage, file filter and limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// validate ObjectId middleware for update and delete operations
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid student ID",
    });
  }
  next();
};

// get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a single student by id
router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a student
router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {
    // const newStudent = await Student.create(req.body);
    // res.status(201).json(newStudent);

    const newStudent = new Student(req.body);
    if (req.file) {
      newStudent.profile_pic = req.file.path;
    }
    const savedNewStudent = await newStudent.save();
    res.status(201).json(savedNewStudent);
    
  } catch (error) {
    // Problem :
    // Image uploaded successfully
    // but student creation failed.

    // Solution :
    // Delete uploaded image because no database record exists.

    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (err) {
        console.log("Uploaded image not found");
      }
    }

    res.status(500).json({ message: error.message });
  }
});

/* -----> Flow of create student route ( Not Optimised )

  FLOW:

  Client sends request
          |
          v
  Multer middleware runs first
  (upload.single("profile_pic"))
          |
          v
  Image is saved in uploads folder
          |
          v
  Route handler starts
          |
          v
  Create Student object from req.body
          |
          v
  Attach image path to Student object
          |
          v
  Save student using newStudent.save()
          |
          +----------------+
          |                |
          v                v
    Save successful    Save failed
          |                |
          v                v
  Return 201          Delete uploaded image
  response            using fs.unlink()
                          |
                          v
                      Return 500 error
*/

// ==> cleaner approach for above code - create a student or add new student
// router.post("/", upload.single("profile_pic"), async (req, res) => {
//   try {
//     const studentData = {
//       ...req.body,
//       profile_pic: req.file ? req.file.path : undefined,
//     };
//     const student = await Student.create(studentData);
//     res.status(201).json(student);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// update a student
router.put(
  "/:id",
  validateObjectId,
  upload.single("profile_pic"),
  async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        // Problem : if student not found and user uploaded a new image then that image will be stored in uploads folder without any reference in database and it will consume storage unnecessarily.
        // Solution : if student not found then delete the uploaded image immediately before sending response to client
        if (req.file) {
          try {
            await fs.unlink(req.file.path);
          } catch (error) {
            console.log("Uploaded image not found");
          }
        }
        return res.status(404).json({ message: "Student not found" });
      }

      const updatedData = {
        ...req.body,
      };

      // Store old image path
      // We will delete it only after successful database update.
      const oldProfilePic = student.profile_pic;

      // If user uploaded new image
      if (req.file) {
        // Add new image path to updated object
        updatedData.profile_pic = req.file.path;
      }

      let updatedStudent;
      try {
        updatedStudent = await Student.findByIdAndUpdate(
          req.params.id,
          updatedData,
          {
            new: true, // Return the updated document instead of the original one
            runValidators: true, // Apply schema validation rules to the update operation
          },
        );
      } catch (error) {
        // If there is any error during database update and user uploaded new image then delete that image to prevent unnecessary storage consumption
        // Problem :
        // New image was uploaded successfully
        // but database update failed.

        // Example :
        // - Validation error
        // - MongoDB connection issue
        // - Server error

        // Result :
        // Uploaded image has no database reference.
        // Solution :
        // Delete newly uploaded image.

        if (req.file) {
          try {
            await fs.unlink(req.file.path);
          } catch (error) {
            console.log("Uploaded image not found");
          }
        }
        throw error; // Rethrow the error after handling the uploaded image because we want to send error response to client as well.
      }

      // If user uploaded new image and database update is successful then delete old profile picture if it exists to prevent unnecessary storage consumption

      // Database update succeeded

      // Problem :
      // Old image is no longer needed.

      // Solution :
      // Delete old image after successful database update.

      if (req.file && oldProfilePic) {
        try {
          await fs.unlink(oldProfilePic);
        } catch (error) {
          console.log("Old image already deleted or not found");
        }
      }

      res.json(updatedStudent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

/* 
                  UPDATE REQUEST
                        |
                        |
                  PUT /students/:id
                        |
                        |
            validateObjectId middleware
                        |
              ---------------------
              |                   |
            Invalid              Valid
              |                   |
              ↓                   ↓
        Send 400 Error      upload.single()
                                    |
                                    |
                          ------------------
                          |                |
                      No image          New image uploaded
                          |                |
                          ↓                ↓
                    req.file = null    Save image in uploads/
                                            |
                                            ↓
                                Find student by ID
                                            |
                      --------------------------------
                      |                              |
                Student not found             Student found
                      |                              |
                      ↓                              ↓
            Is new image uploaded?          Create updatedData
                      |                              |
            -------------------                      |
            |                 |                      |
          Yes                No                      |
            |                 |                      |
            ↓                 ↓                      ↓
  Delete uploaded file    Return 404       Store old image path
                                                |
                                                ↓
                                        Is new image uploaded?
                                                |
                                -------------------------------
                                |                             |
                              Yes                            No
                                |                             |
                                ↓                             ↓
                      Add new image path          Keep old image
                      to updatedData               unchanged
                                |
                                |
                                ↓
                    findByIdAndUpdate()
                                |
                  ------------------------------
                  |                            |
            Database update success       Database update fails
                  |                            |
                  ↓                            ↓
        updatedStudent received        Delete new uploaded image
                  |                            |
                  |                            ↓
                  |                     Throw error
                  |                            |
                  ↓                            ↓
        Was new image uploaded?        Outer catch handles error
                  |
          -----------------
          |               |
        Yes              No
          |
          ↓
  Is old image available?
          |
    --------------
    |            |
  Yes            No
    |             |
    ↓             ↓
  Delete old     Nothing
  image
    |
    ↓
  Send updated student response

*/


// delete a student
router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Problem :
    // Current flow : Student found -> delete profile picture -> delete student from database
    // If there is any error during profile picture deletion then student will not be deleted from database.
    // Example : Student found -> Delete profile picture -> Delete student -> Fails
    // Result : Student record remains in database with profile picture path but profile picture has been deleted and it may cause inconsistency in data.
    // Solution : First delete student from database and if that is successful then delete profile picture.

    // Store image path before deleting student
    const profilePic = student.profile_pic;

    // Delete student from database first
    await Student.findByIdAndDelete(req.params.id);

    // Database delete succeeded
    // Now safely delete image
    if (profilePic) {
      try {
        await fs.unlink(profilePic);
      } catch (error) {
        console.log("Image already deleted or not found");
      }
    }

    res.json({ message: "Student deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
