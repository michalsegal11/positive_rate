import {getusers,getUserById,addUser,deleteUser,updateUser} from '../service/users.js';
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
    put = ( async (req, res) => {

        try {
            const id = req.params.t_z;
            let edituser = req.body;
            const users = result.recordset;
            let editusers = await updateUser(t_z, edituser); 
            res.send(editusers);
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(404).send(error.message);
        }
    });
}