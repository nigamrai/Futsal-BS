import multer from 'multer';

const upload = multer({
    dest: 'uploads/',
    limits:{fileSize:50*1024*1024},
    storage:multer.diskStorage({
        destination:'uploads/',
        filename:(req_,file,cb)=>{
            cb(null,file.originalname);
        }
    })
})

export default upload;