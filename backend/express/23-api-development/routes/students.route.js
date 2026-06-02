const express = require("express");
const router = express.Router();

const Student = require("../models/students.model");

const multer = require("multer");
const path = require("path");
const fs = require("fs/promises"); // for deleting files like profile_pic using promises instead of callbacks

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

// get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a single student by id
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
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
    res.status(500).json({ message: error.message });
  }
});

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
router.put("/:id", upload.single("profile_pic"), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const updatedData = {
      ...req.body,
    };

    // If new image uploaded
    if (req.file) {
      // delete old image
      if (student.profile_pic) {
        try {
          await fs.unlink(student.profile_pic);
        } catch (error) {
          console.log("Old image not found");
        }
      }
      updatedData.profile_pic = req.file.path;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true, // Return the updated document instead of the original one
        runValidators: true, // Apply schema validation rules to the update operation
      },
    );
    res.json(updatedStudent);

  } catch (error) {
    // Handle invalid ObjectId error : when user send invalid mongodb _id in the request params
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }
    res.status(500).json({ message: error.message });
  }
});

// delete a student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete profile picture if it exists
    if (student.profile_pic) {
      try {
        await fs.unlink(student.profile_pic);
      } catch (error) {
        console.log("Image already deleted or not found");
      }
    }

    // Delete the student
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });

  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid student ID",
      });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
