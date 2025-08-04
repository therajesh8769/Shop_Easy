const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/multer');


router.get('/data',isAdmin, (req, res) => {    
    res.status(200).json({ message: 'Welcome to the admin dashboard!' });
}
);

router.post('/upload', upload.array('images', 5), async (req, res) => {
    try {
      const uploadedFiles = req.files.map(file => ({
        url: file.path,
        public_id: file.filename,
      }));
  
      res.json({ images: uploadedFiles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
  

  //status update route
  // PUT /api/orders/:id/update-status

  


module.exports = router;
