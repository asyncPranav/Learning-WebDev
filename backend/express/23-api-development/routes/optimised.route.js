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

/*
Problem:
  Multer uploads profile image before Mongoose validates required fields.
  If any required field (name, age, phone, email, gender, address) is missing,
  database validation fails after the image is already stored. 
  the uploaded image becomes unnecessary and wastes disk I/O.

  Example:
  Invalid student data + valid image
          |
          v
  Image uploaded
          |
          v
  Mongoose validation fails
          |
          v
  Image must be deleted

  Solution:
  Add validation middleware before multer to check required fields first.
  because multer is a middleware, it will execute in the order it is defined in the route.
  So, we can add a validation middleware before multer to check required fields first.
  If validation fails, we can send a response to the client without uploading the image.
  Only upload the image if the student data is valid.
  Mongoose validation should still remain as the final database-level validation.
*/
const validateStudentData = (req, res, next) => {
  const { name, age, phone, email, gender, address } = req.body;

  if (!name || !age || !phone || !email || !gender || !address) {
    return res.status(400).json({
      message: "Name, age, phone, email, gender and address are required",
    });
  }

  next();
};

/*
  Why not use validateStudentData for update?

  validateStudentData is designed for CREATE operations where all required fields
  must be present in the request body.

  During UPDATE, users usually update only specific fields.
  Example:
  PUT /students/:id
  {
    "phone": "9999999999"
  }

  Requiring all fields during update will incorrectly reject valid partial updates
  because missing fields are treated as undefined.

  Therefore:
  - POST  -> validate all required fields using validateStudentData
  - PUT/PATCH -> validate only the fields that are provided using validateUpdateStudentData

  Mongoose schema validation remains the final database-level protection.
*/
const validateUpdateStudentData = (req, res, next) => {
  const allowedFields = ["name", "age", "phone", "email", "gender", "address"];

  for (const field of allowedFields) {
    if (field in req.body && String(req.body[field]).trim() === "") {
      return res.status(400).json({
        message: `${field} cannot be empty`,
      });
    }
  }

  next();
};

// helper function to delete files safely
const deleteFile = async (filePath) => {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.log("File not found:", filePath);
  }
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
router.post(
  "/",
  validateStudentData,
  upload.single("profile_pic"),
  async (req, res) => {
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
      // Problem:
      // Image upload happens before database save.
      // If MongoDB validation fails or duplicate email error occurs,
      // the uploaded image has no database reference.

      // Solution:
      // Remove the uploaded image to prevent unused files in storage.

      if (req.file) {
        try {
          await fs.unlink(req.file.path);
        } catch (err) {
          console.log("Uploaded image not found");
        }
      }

      res.status(500).json({ message: error.message });
    }
  },
);

/* ------> Flow of create student route now looks like this:

  Request
    |
    v
  validateStudentData()
    |
    |---- missing fields
    |        |
    |        v
    |     400 Error
    |
    v
  Multer uploads image
    |
    v
  Student.create()
    |
    |---- duplicate email / DB error
    |        |
    |        v
    |   Delete uploaded image
    |
    v
  Student saved successfully
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
  validateUpdateStudentData,
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

      res.status(200).json(updatedStudent);
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
              -------------------------
              |                       |
           Invalid                  Valid
              |                       |
              ↓                       ↓
        400 Error              validateUpdateStudentData
                                      |
                           -------------------------
                           |                       |
                    Empty field              Valid data
                           |                       |
                           ↓                       ↓
                    400 Error              upload.single()
                                                  |
                                                  |
                                      -------------------------
                                      |                       |
                                  No image              Image uploaded
                                      |                       |
                                      |                Save image path
                                      |                       |
                                      ------------↓------------
                                                  |
                                                  |
                                      Find student by ID
                                                  |
                              --------------------------------
                              |                              |
                         Student not found              Student found
                              |                              |
                              ↓                              ↓
                   Delete uploaded image             Store old image path
                              |                              |
                              ↓                              ↓
                         404 Error                 Prepare updatedData
                                                           |
                                      ----------------------
                                      |                    |
                                New image?              No image
                                      |                    |
                                      ↓                    ↓
                           Add new image path       Keep old image
                                      |
                                      |
                              findByIdAndUpdate()
                                      |
                         ------------------------------
                         |                            |
                  Database error                 Update success
                         |                            |
                         ↓                            ↓
              Delete newly uploaded image       Delete old image
                         |                            |
                         ↓                            ↓
                   Throw error              Send updated student
                         |
                         ↓
                  500 Error Response
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

    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Error handling middleware for multer errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  next(err);
});

module.exports = router;
