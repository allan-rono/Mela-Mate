const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
//const cors = require('cors');


const app = express();
const port = 3000;

//app.use(cors());
// configure multer storage
const upload = multer({ storage: multer.memoryStorage() });

// define endpoint for image upload
app.post('/upload-image', upload.single('image'), (req, res) => {
  const image = req.file.buffer;
  const pythonProcess = spawn('python', ['./ml_script/ClassifyImage.py', '--image', 'data:image/jpeg;base64,' + image.toString('base64'),'--function', 'ClassifyImage']);
  console.log(pythonProcess);
  pythonProcess.stdout.on('data', (data) => {
    const result = data.toString();
    console.log(result);
    res.send(result);
  });
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
