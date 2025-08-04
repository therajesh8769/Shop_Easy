// test-upload.js
require('dotenv').config();
const cloudinary = require('../utils/cloudinary');
const path = require('path');

cloudinary.uploader.upload(
  path.join(__dirname, 'beauty.jpeg'),
  { folder: 'test-uploads' }
).then(res => console.log(res))
  .catch(err => console.error("Cloudinary Upload Error:", err));
