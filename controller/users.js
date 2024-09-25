import {getusers,getUserById,adduser,deleteUser,updateUser} from '../service/users.js';
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
            let users = await adduser(newUser); // Corrected variable name           
            res.send(users);

        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message);

        }
    };
    delete=( async (req, res) => {
        try {
            const id = req.params.t_z;
            console.log(`Deleting user with id: ${id}`);
            const result = await deleteUser(id);
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

    
    put = async (req, res) => {
        try {
            const id = req.params.t_z; // קבלת מזהה המשתמש
            const edituser = req.body;  // נתוני המשתמש לעדכון
            
            // בדיקת קיום המשתמש (אם זה הכרחי)
            const existingUser = await getUserById(id); // יש להגדיר את הפונקציה הזו
            if (!existingUser) {
                return res.status(404).send('User not found'); // אם המשתמש לא קיים
            }
    
            // עדכון המשתמש
            const updatedUser = await updateUser(id, edituser);
            
            // החזרת המשתמש המעודכן
            res.status(200).send(updatedUser); // החזרת המשתמש המעודכן עם קוד 200
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(500).send(error.message); // שגיאה פנימית אם משהו משתבש
        }
    };
    
}