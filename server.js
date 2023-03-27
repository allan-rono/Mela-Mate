const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');

const app = express();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Define server endpoints
app.post('/upload', upload.single('image'), (req, res) => {
  // Get file path of uploaded image
  const imagePath = req.file.path;

  // Run Python script to determine if image is melanoma
  const pythonProcess = spawn('python', ['melanoma_detection.py', imagePath]);
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    // Send response to client
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
