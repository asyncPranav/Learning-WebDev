import { body, validationResult } from "express-validator";
import deleteFile from "../utils/deleteFile.js";

/* 
  const createStudentValidator = (req, res, next) => {
    const { name, rollNo } = req.body;
    if (!name || !rollNo) {
      return res.status(400).json({
        status: 400,
        message: "name and rollNo are required fields",
      });
    }
  }; 
*/

// Here we are using express-validator to validate the request body for creating a student. 
// The createStudentValidator middleware checks if the name and rollNo fields are present and valid. 
// If there are validation errors, it responds with a 400 status code and the error messages. 
// If there are no errors, it calls next() to proceed to the next middleware or route handler.

// We are using array of validation middlewares to validate the request body. 
// The first two middlewares check if the name and rollNo fields are present and valid. 
// The last middleware checks if there are any validation errors and responds with a 400 status code and the error messages if there are any errors. 
// If there are no errors, it calls next() to proceed to the next middleware or route handler.
const createStudentValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("name is required"),

  body("rollNo")
    .notEmpty().withMessage("roll no is required")
    .isInt({ min: 1 }).withMessage("roll no must be a positive integer"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      // delete newly uploaded file if validation fails
      if (req.file) {
        await deleteFile(req.file.path);
      }

      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];


export default createStudentValidator;
