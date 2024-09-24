import express from "express";
import cors from 'cors'
import {userRouter} from './routes/users.js'
import { closeConnection } from './service/database.js';
const app = express();
const port = process.env.PORT || 3000
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/images',express.static('uploads'))
app.get("/users",userRouter);
app.get("/users/:id",userRouter);
app.post("/users",userRouter);

app.listen(port, () => {
    //  console.log( process.env)
    console.log(`Example app listening on port ${port}`)
})


// סגור את החיבור לבסיס הנתונים כשהשרת נסגר
process.on('SIGINT', async () => {
    await closeConnection();
    process.exit();
});

