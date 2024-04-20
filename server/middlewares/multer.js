import multer from "multer";

export const multerUploads = multer({
  //   storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  // fileFilter: (req, file, cb) => {
  //   if (
  //     file.mimetype === "image/jpeg" ||
  //     file.mimetype === "image/jpg" ||
  //     file.mimetype === "image/png"
  //   ) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("File type not supported"));
  //   }
  // },
});

export const singleAvatar = multerUploads.single("avatar");

export const attachmentsMulter = multerUploads.array("files", 5);
