const express = require('express');
const app = express();

// Multer setup
const multer = require('multer');
const path = require('path');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Multer configuration
const storage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // const newFileName = file.originalname + '-' + Date.now() + path.extname(file.originalname); // photo.jpg -> photo.jpg-1710000000000.jpg
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);
      const newFileName = baseName + '-' + Date.now() + ext;
      cb(null, newFileName);
    },
  }
);

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'profile') {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for profile!'), false);
    }
  } else if (file.fieldname === 'documents') {
      const allowedTypes = /pdf|doc|docx|txt/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new Error('Only document files are allowed for documents!'), false);
      }
  } else {
    cb(new Error('Unexpected field!'), false);
  }
};


// Initialize multer with the defined storage and file filter
const upload = multer(
  {
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 3 }, // 3MB limit
    fileFilter: fileFilter
  }
);

// Routes
app.get("/", (req, res) => {
  res.render("multi-file-upload-field-form");
});

// Handle file upload - with error handling using middleware -> add multiple keyword to the input field in the form and use upload.array() instead of upload.single() in the route handler
// app.post("/submitform", upload.array("userfile", 3), (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).send('No files uploaded. Please select files to upload.');
//   }
//   res.send(req.files);
// });

// Handle file upload with multiple fields
app.post("/submitform", upload.fields([{ name: "profile", maxCount: 1 }, { name: "documents", maxCount: 3 }]), (req, res) => {
  if (!req.files || ( !req.files['profile'] && !req.files['documents'] ) ) {
    return res.status(400).send('No files uploaded. Please select files to upload.');
  }
  res.send(req.files);
});

app.use((err, req, res, next) => {
  if(err instanceof multer.MulterError) {
    if(err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send('File size is too large. Maximum allowed size is 3MB.');
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).send('Too many files uploaded. Maximum allowed files are 3.');
    } 
    return res.status(400).send(`Multer error : ${err.message} - ${err.code}`);
  } else if (err) {
    return res.status(500).send(`Server error : ${err.message}`);
  }
  next();
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});