
// for delete
// const path = "server/uploads/" + fileName;
//         fs.unlinkSync(path);
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,__dirname +'../../public/uploads/images')
    },
    filename: (req, file, cb) => {
        cb(null,  'profile-' + Date.now()+'-' + file.originalname)
    }
});
 
var upload = multer({ storage: storage });
module.exports = upload;