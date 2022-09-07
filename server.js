const express = require("express");
const { dbContact } = require("./utils/dbContact");
const app = express();
const PORT = process.env.PORT || 5000;
const profileRouter = require("./routes/profile.route");
const dashboardRoute = require("./routes/dashboard.route");

app.get("/", (req, res) => {
  res.send("<h1>Home Route for server</h1>");
});

app.use(express.json()); // req body data --> undefined

dbContact();

app.use("/profile", profileRouter);
app.use("/dashboard", dashboardRoute);
/* -----------------start------------------ */
// upload image----->
const multer = require("multer");
app.get("/form", (req, res) => {
  res.sendFile(`${__dirname}/views/upload.html`);
});

// Storage=========================>
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/uploadFile`)
  },
  filename: (req, file, cb) => {
    console.log(file);
    const fileExt = path.extname(file.originalname)    //--> .jpg 
    const  filename = file.originalname.replace(fileExt, "")
               .toLowerCase()
               .split(' ')
               .join('-') + '-' + Date.now() + fileExt 
               console.log(filename); 
      cb(null, filename) 
  }
})


const upload = multer({
  storage, 
 limits: {
   fileSize: 1000000,
 },
 fileFilter: (req, file, cb) => {
   if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype==='jpeg'){
     cb(null, true)
   }
   else{
     cb( new Error('File type is not accepted '))   //---> error
   }
 },
});

app.post('/handleForm', upload.single('profile-img'), (req, res) => {
  res.send('<h1> Uploaded images done </h1>')
})
/* ----------upload-end--------- */


app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
