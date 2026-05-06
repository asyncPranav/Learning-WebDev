const express = require("express");
const app = express();

// We will do form validation using express-validator
const { body, validationResult } = require("express-validator");

// -------------Validation methods-------------
// 1. notEmpty() - checks if the field is not empty
// 2. isEmail() - checks if the field is a valid email
// 3. isLength(options) - checks if the field is of a certain length, options can be { min: number, max: number }
// 4. matches(pattern) - checks if the field matches a certain pattern, pattern can be a regex
// 5. isNumeric() - checks if the field is a number
// 6. isAlpha() - checks if the field contains only letters
// 7. isAlphanumeric() - checks if the field contains only letters and numbers
// 8. isIn(values) - checks if the field is in a certain array of values
// 9. isURL() - checks if the field is a valid URL
// 10. isDate() - checks if the field is a valid date
// 11. isStrongPassword(options) - checks if the field is a strong password, options can be { minLength: number, minLowercase: number, minUppercase: number, minNumbers: number, minSymbols: number }
// 12. isUppercase() - checks if the field is uppercase
// 13. isLowercase() - checks if the field is lowercase
// 14. isMobilePhone(locale) - checks if the field is a valid mobile phone number, locale can be 'en-US', 'en-GB', etc.
// 15. custom(fn) - allows you to create a custom validation function

// -------------Sanitization methods-------------
// 1. trim() - removes whitespace from both ends of the field
// 2. ltrim() - removes whitespace from the left end of the field
// 3. rtrim() - removes whitespace from the right end of the field
// 4. escape() - replaces <, >, &, ', " with their HTML entities
// 5. unescape() - replaces HTML entities with their corresponding characters
// 6. toInt() - converts the field to an integer
// 7. toFloat() - converts the field to a float
// 8. toBoolean() - converts the field to a boolean
// 9. toDate() - converts the field to a date
// 10. toArray() - converts the field to an array
// 11. toString() - converts the field to a string
// 12. normalizeEmail(options) - normalizes an email address, options can be { all_lowercase: boolean, gmail_remove_dots: boolean, gmail_remove_subaddress: boolean, gmail_convert_googlemaildotcom: boolean }
// 13. customSanitizer(fn) - allows you to create a custom sanitization function

// NOTE : If you want complete list of validation and sanitization methods, you can check the official documentation of express-validator: https://github.com/validatorjs/validator.js

// Middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Validation rules for the form : field is selcted by name attribute in the form
// This is an array of middleware functions that will be executed in order when the form is submitted. 
// Each middleware will validate a specific field in the form and if there are any validation errors, they will be stored in the request object and can be accessed in the route handler.
const formValidationRules = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
    .trim()
    .toLowerCase()
    .isAlpha().withMessage("Username must contain only letters")
    .custom(value => {
      if (value.toLowerCase() === "admin") {
        throw new Error("Username cannot be admin");
      }
      return true;
    })
    .customSanitizer(value => {
      return value.charAt(0).toUpperCase() + value.slice(1); // Capitalize the first letter of the username
    }),
  body("email")
    .isEmail().withMessage("Invalid email address")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6, max: 15 }).withMessage("Password must be between 6 and 15 characters long")
    .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage("Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol"),
  body("age")
    .isNumeric().withMessage("Age must be a number")
    .isInt({ min: 18, max: 100 }).withMessage("Age must be between 18 and 100"),
  body("city")
    .isIn(["delhi", "mumbai", "lucknow", "bangalore"]).withMessage("City must be either Delhi, Mumbai, or Bangalore")
];


// Routes
app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.get("/form", (req, res) => {
  res.render("form", { errors: [] });
});

app.post("/saveform", formValidationRules, (req, res) => {
  // errors is an object that contains all the validation errors that occurred during the validation process. 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, we will send the errors back to the client as a response. 
    // return res.status(400).send(errors);
    // return res.send(errors.array());
    // return res.send(errors.errors);
    
    console.log(errors.array());
    return res.status(400).render("form", { errors: errors.array() });
  }
  res.send(req.body);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
