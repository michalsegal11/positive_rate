import express from "express";
import cors from 'cors'
import {userRouter} from './routes/users.js'
import { closeConnection } from './service/database.js';
const app = express();
const port = process.env.PORT | 3000
app.use(cors());
app.use(express.json());
app.get("/users",userRouter);
app.listen(port, () => {
    //  console.log( process.env)
    console.log(`Example app listening on port ${port}`)
})


// סגור את החיבור לבסיס הנתונים כשהשרת נסגר
process.on('SIGINT', async () => {
    await closeConnection();
    process.exit();
});

