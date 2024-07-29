import multer, { diskStorage } from "multer";

const storage = diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//dev pulse studio
const upload = multer({ storage: storage });

export default upload;
