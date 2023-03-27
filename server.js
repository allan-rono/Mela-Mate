const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');

const app = express();
const port = 3000;