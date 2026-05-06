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
  // if (file.mimetype.startsWith('image/')) {
  //   cb(null, true);
  // } else {
  //   cb(new Error('Only image files are allowed!'), false);
  // }

  // if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/gif") {
  //   cb(null, true);
  // } else {
  //   cb(new Error('Only image files are allowed!'), false);
  // }

  // const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  // if (allowedTypes.includes(file.mimetype)) {
  //   cb(null, true);
  // } else {
  //   cb(new Error('Only image files are allowed!'), false);
  // }

  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype); // checking only extname is risky, because someone can change the extension of a non-image file to .jpg and upload it example malicious.exe -> malicious.exe.jpg ,So we also check mimetype.
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }


}


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
  res.render("single-file-form");
});

// Handle file upload - without error handling
// app.post("/submitform", upload.single("userfile"), (req, res) => {
//   res.send(req.file);
// });

// Handle file upload - with error handling
// app.post("/submitform", upload.single("userfile"), (req, res) => {
//   if (!req.file || req.file.length === 0) {
//     return res.status(400).send('No file uploaded. Please select a file to upload.');
//   }
//   res.send(req.file);
// }, (err, req, res, next) => {
//   if(err instanceof multer.MulterError) {
//     return res.status(400).send(`Multer error : ${err.message}`);
//   } else if (err) {
//     return res.status(500).send(`Server error : ${err.message}`);
//   }
//   next();
// });

// Handle file upload - with error handling using middleware
app.post("/submitform", upload.single("userfile"), (req, res) => {
  if (!req.file || req.file.length === 0) {
    return res.status(400).send('No file uploaded. Please select a file to upload.');
  }
  res.send(req.file);
});
app.use((err, req, res, next) => {
  if(err instanceof multer.MulterError) {
    return res.status(400).send(`Multer error : ${err.message}`);
  } else if (err) {
    return res.status(500).send(`Server error : ${err.message}`);
  }
  next();
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});