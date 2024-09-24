import {getusers,getUserById,addUser} from '../service/users.js';
export class User {
    getAll = async (req, res) => {

        try {
            const result = await getusers();
            console.log('successfully ');
            res.send(result);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);

        }


    };
    

   

    search = async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id);
            const result = await getUserById(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            console.error('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    add = async (req, res) => {

        try {
            let newUser  = req.body; // Corrected variable name          
            let users = await addUser(newUser); // Corrected variable name           
            res.send(users);

        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message);

        }
    };

    
    delete=( async (req, res) => {
        try {
            const id = req.params.t_z;
    
            // כאן תוכל להוסיף ולידציה אם צריך
    
            // חיבור למסד נתונים
            const pool = await sql.connect({
                user: 'yourUsername',
                password: 'yourPassword',
                server: 'yourServer',
                database: 'yourDatabase'
            });
    
            // ביצוע השאילתא למחיקת המשתמש
            const result = await pool.request()
                .input('t_z', sql.Int, id)
                .query('DELETE FROM users WHERE t_z = @t_z');
    
            if (result.rowsAffected[0] === 0) {
                res.status(404).send("User not found");
            } else {
                res.send({ message: "User deleted successfully" });
            }
    
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    });


    put = ( async (req, res) => {

        try {
            let edituser = req.body;
            //  add validate
            const result = await pool.request()
                .query('SELECT * FROM users');
            // קבלת תוכן הטבלה
            const users = result.recordset;
            
            let sexist = false;
            for (let index = 0; index < users.length; index++) {
                if (users[index].t_z== edituser.t_z) {
                    sexist = true;
                    for (const key in edituser) {
                        
                        users[index][key]  = edituser[key];
                            
                    }
                    break;
                }
    
            }
            if (!sexist) {
                res.status(500).send("user not  exist");
            }
           // שאילתא לעדכון המשתמש
           const result1 = await pool.request()
           .input('t_z', sql.Int, t_z)
           .input('name', sql.NVarChar, edituser.name) // דוגמה לעדכון שם
           .input('gmail', sql.NVarChar, edituser.gmail) // דוגמה לעדכון דוא"ל
           .input('password', sql.Int, edituser.password)
           .input('adress', sql.NVarChar, edituser.adress) // דוגמה לעדכון שם
           .input('birthday', sql.NVarChar, edituser.birthday)
           .input('status', sql.NVarChar, edituser.status)
    
           .query('UPDATE users SET name = @name, gmail = @gmail, password = @password,adress = @adress, birthday = @birthday, status = @status WHERE t_z = @t_z');
    
       if (result.rowsAffected[0] === 0) {
           res.status(404).send("User not found");
       } else {
           console.log('User updated successfully');
           res.send({ message: "User updated successfully" });
       } 
    } catch (error) {
        console.log('there was an error:', error.message);
        res.status(500).send(error.message);

    }
    
    });
    



}
