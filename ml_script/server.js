const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

// configure multer storage
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// define endpoint for image upload
app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    // No file was uploaded
    return res.status(400).send('No file was uploaded');
  }
  
  const imgFile = req.file.path;

  // Run the Python script using spawn
  const pythonProcess = spawn('python', ['melamate.py', imgFile]); // pass file path as string

  // Collect the stdout from the Python script
  let stdout = '';
  pythonProcess.stdout.on('data', (data) => {
    stdout += data.toString();
  });

  // Collect the stderr from the Python script
  let stderr = '';
  pythonProcess.stderr.on('data', (data) => {
    stderr += data.toString();
  });

  // Handle the exit code of the Python script
  pythonProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      console.error(stderr);
      res.status(500).send('An error occurred');
    } else {

      console.log("------------------------------------------------");

      // Return the result back to the user
      const output = stdout.trim();
      const lines = output.split('\n');
      const probabilityLine = lines[lines.length - 4];
      const melanomaProbability = parseFloat(probabilityLine);
      //const melanomaProbability = parseFloat(stdout.trim());
      console.log(`Melanoma probability: ${melanomaProbability}`);
      res.send({ melanomaProbability });
      
      // Delete the file from the directory
      fs.unlink(imgFile, (err) => {
        if (err) {
          console.error(`Error deleting file ${imgFile}`, err);
        } else {
          console.log(`File ${imgFile} deleted successfully`);
        }
      });
    }
  });
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
