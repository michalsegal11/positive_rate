import {getTeacherss,getTeachersById,addTeachers,deleteTeachers,updateTeachers} from '../service/teacherss.js';
export class Teachers {
    getAll = async (req, res) => {

        try {
            const result = await getTeacherss();
            console.log('successfully ');
            res.send(result);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);

        }


    };
    search = async (req, res) => {
        try {
            const id = req.params.t_z;
            console.log(id);
            const result = await getTeachersById(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('Teachers not found');
            }
        } catch (error) {
            console.error('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    add = async (req, res) => {

        try {
            let newTeachers  = req.body; // Corrected variable name          
            let teacherss = await addTeachers(newTeachers); // Corrected variable name           
            res.send(teacherss);

        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message);

        }
    };
    delete=( async (req, res) => {
        try {
            const id = req.params.t_z;
            console.log(`Deleting teachers with id: ${id}`);
            const result = await deleteTeachers(id);
            if (result.rowsAffected[0] === 0) {
                res.status(404).send("Teachers not found");
            } else {
                res.send({ message: "Teachers deleted successfully" });
            }
    
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    });
    put = ( async (req, res) => {

        try {
            const id = req.params.t_z;
            let editteachers = req.body;
            const teacherss = result.recordset;
            let editteacherss = await updateTeachers(t_z, editteachers); 
            res.send(editteacherss);
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(404).send(error.message);
        }
    });
}