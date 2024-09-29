import express from "express";
import cors from 'cors'
import multer from 'multer';
import {userRouter} from './routes/users.js'
import {FitnessEquipmentRouter} from './routes/fitness_equipment.js'
import {FitnessEquipmentImageRouter} from './routes/fitness_equipment_image.js'
import { closeConnection } from './service/database.js';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';



const app = express();
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('.public/images',express.static('uploads'))
app.use(express.static('./manager'));
// app.use('.public/images', express.static(path.join(__dirname, 'images')));






//from the routes
app.get("/users",userRouter);
app.get("/users/:id",userRouter);
app.post("/users",userRouter);
app.put("/users/:id",userRouter);
app.delete("/users/:id",userRouter);
app.get('/fitness_equipment', FitnessEquipmentRouter); 
app.post('/fitness_equipment',FitnessEquipmentRouter)
app.get('/fitness_equipment_image', FitnessEquipmentImageRouter); 




// הגדר את מיקום ההעלאה
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images'); // הנתיב שבו תישמר התמונה
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // שמירה על שם הקובץ המקורי
    }
});

const upload = multer({ storage: storage });

// route להעלאת תמונה
app.post('/upload-image', upload.single('image'), async (req, res) => {
    if (req.file) {
        const newName = decodeURIComponent(req.body.newName) || req.file.originalname;

        const newFilePath = `./public/images/${newName}`;
        console.log("******************************")
        console.log(newName);

        try {
            await fs.promises.rename(`./public/images/${req.file.filename}`, newFilePath);
            res.status(200).send('Image uploaded successfully');
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


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // תיקיית העלאה
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname); // שם הקובץ
//     }
// });

// const upload = multer({ storage });

// // API להעלאת תמונות
// app.post('/api/images', upload.single('image'), async (req, res) => {
//     const { deviceId } = req.body; // מכשיר לשייך לתמונה
//     const imageUrl = req.file.path; // נתיב הקובץ המועלה

//     try {
//         await pool.request()
//             .input('deviceId', sql.Int, deviceId)
//             .input('imageUrl', sql.NVarChar, imageUrl)
//             .query('INSERT INTO תמונות_מכשירי_כושר (מכשיר_כושר, שם_תמונה) VALUES (@deviceId, @imageUrl)');
//         res.sendStatus(201);
//     } catch (err) {
//         console.error('Error inserting image:', err);
//         res.status(500).send('Error inserting image');
//     }
// });
