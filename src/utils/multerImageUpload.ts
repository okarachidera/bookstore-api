import multer from 'multer';
import path from 'path';

// const storage = multer.diskStorage({});

// let upload = multer({
//     storage
// })

const imageMulter = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: any, file: any, cb: any) => {
    let extn = path.extname(file.originalname);

    if (extn !== '.jpg' && extn !== '.jpeg' && extn !== '.png') {
      cb(new Error('File type is not supported...'), false);
      return;
    }
    cb(null, true);
  },
});

export default imageMulter;
