import express from "express";
import cors from 'cors'
import multer from 'multer';
import {userRouter} from './server/routes/users.js'
import {FitnessEquipmentRouter} from './server/routes/fitness_equipment.js'
import {FitnessEquipmentImageRouter} from './server/routes/fitness_equipment_image.js';
import {medial_lessonsRouter} from './server/routes/medial_lessons.js';
import {teachersRouter} from './server/routes/teachers.js';
import {categoryRouter} from './server/routes/category.js';
import { closeConnection } from './server/service/database.js';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';



const app = express();
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/fitness_equipment', FitnessEquipmentRouter); 
app.use('/medial_lessonsRouter', medial_lessonsRouter); 
app.use('./client/public/images',express.static('uploads'))
app.use('/static', express.static('./client/manager'));

// app.use('.public/images', express.static(path.join(__dirname, 'images')));






//from the routes
//users---
app.get("/users",userRouter);
app.get("/users/:id",userRouter);
app.post("/users",userRouter);
app.put("/users/:id",userRouter);
app.delete("/users/:id",userRouter);

//teachers---
app.get("/teachers",teachersRouter);
app.get("/teachers/:id",teachersRouter);
app.post("/teachers",teachersRouter);
app.put("/teachers/:id",teachersRouter);
app.delete("/teachers/:id",teachersRouter);

//media_lessons---
app.get('/medial_lessons', medial_lessonsRouter); 
app.get('/medial_lessons/:t_z', medial_lessonsRouter); 
app.post('/medial_lessons',medial_lessonsRouter)
app.delete('/medial_lessons/:t_z', medial_lessonsRouter); 

//fitness_equipment--
app.get('/fitness_equipment', FitnessEquipmentRouter); 
app.get('/fitness_equipment/:t_z', FitnessEquipmentRouter); 
app.post('/fitness_equipment',FitnessEquipmentRouter)
app.delete('/fitness_equipment/:t_z', FitnessEquipmentRouter); 


//fitness_equipment_image--
app.get('/fitness_equipment_image', FitnessEquipmentImageRouter); 
app.get('/fitness_equipment_image/:t_z', FitnessEquipmentImageRouter); 
app.delete('/fitness_equipment_image/:t_z', FitnessEquipmentImageRouter); 


//category--
app.get("/category",categoryRouter);
app.get("/category/:id",categoryRouter);
app.post("/category",categoryRouter);
app.put("/category/:id",categoryRouter);
app.delete("/category/:id",categoryRouter);

// הגדר את מיקום ההעלאה
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/public/images'); // הנתיב שבו תישמר התמונה
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // שמירה על שם הקובץ המקורי
    }
});

const upload = multer({ storage: storage });

// route להעלאת תמונה
app.post('/upload-image', upload.single('image'), async (req, res) => {
    console.log(req.file);
    if (req.file) {
        const newName = decodeURIComponent(req.body.newName) || req.file.originalname;

        const newFilePath = `client/public/images/${newName}`;
        console.log("******************************")
        console.log(newName);

        try {
            await fs.promises.rename(`./client/public/images/${req.file.filename}`, newFilePath);
            res.status(200).send('Image uploaded successfully');
        } catch (err) {
            res.status(500).send('Error renaming file');
        }
    } else {
        res.status(400).send('Error uploading image');
    }
});


// route להעלאת סרטון
app.post('/upload-video', upload.single('video'), async (req, res) => {
    console.log(req.file);
    if (req.file) {  
    const newName = decodeURIComponent(req.body.newName) || req.file.originalname;  
    const newFilePath = `client/public/videos/${newName}`;
    try {
        await fs.promises.rename(`./client/public/videos/${req.file.filename}`, newFilePath);
        res.status(200).send('Video uploaded successfully');
        } catch (err) {
            res.status(500).send('Error renaming file');
        }
    } else {
        res.status(400).send('Error uploading image');
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// סגור את החיבור לבסיס הנתונים כשהשרת נסגר
process.on('SIGINT', async () => {
    await closeConnection();
    process.exit();
});

