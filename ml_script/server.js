const express = require('express');
const app = express();
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const multer  = require('multer');
const cors = require('cors')
app.use(cors());
// Create a temporary directory to store the uploaded image
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Define the multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir)
  },
  filename: function (req, file, cb) {
    cb(null, `image-${Date.now()}.jpg`)
  }
})

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage })

// Define the route for uploading an image
app.post('/upload-image', upload.single('image'), (req, res) => {
  // Get the path of the uploaded image file
  const imgPath = req.file.path;

  // Spawn a new Python process to run the script
  const pythonProcess = spawn('python3', ['melamate.py', imgPath]);

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
      // Return the result back to the user
      const data = {
        probability: 0.35592657
      };

      const output = stdout.trim();
      const regex = /\d+\.\d+/; // match any number with decimal points
      const match = output.match(regex);

      let probability = 0;

      if (match) {
        probability = parseFloat(match[0]);
      }
      const probabilityJson = {
        probability: probability
      };

      console.log(probabilityJson);
      res.json(probabilityJson);

      // Delete the file from the directory
      fs.unlink(imgPath, (err) => {
        if (err) {
          console.error(`Error deleting file ${imgPath}`, err);
        } else {
          console.log(`File ${imgPath} deleted successfully`);
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});                                                                                                                                         1,8           Top