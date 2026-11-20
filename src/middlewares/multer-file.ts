import multer from "multer";
const storage = multer.memoryStorage();

const uploadFile = multer({
  storage,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE || 12582912),
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG and WEBP images are allowed."));
    }

    cb(null, true);
  },
});

export default uploadFile;
