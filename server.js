const express = require('express');
const multer = require('multer');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());
// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split('.').pop();
    const filename = `${file.fieldname}-${Date.now()}.${fileExt}`;
    cb(null, filename);
  }
});

// configure multer
const upload = multer({ storage: storage });

// define endpoint for image upload
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('File uploaded successfully!');
  res.status(200).send('File uploaded successfully!');
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
