import {getmedial_lessons,getMedial_lessonsById,addMedial_lessons,deleteMedial_lessons,updateMedial_lessons} from '../service/medial_lessons.js';
export class Medial_lessons {
    getAll = async (req, res) => {

        try {
            const result = await getmedial_lessons();
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
            const result = await getMedial_lessonsById(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('Medial_lessons not found');
            }
        } catch (error) {
            console.error('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    add = async (req, res) => {

        try {
            let newMedial_lessons  = req.body; // Corrected variable name          
            let medial_lessons = await addMedial_lessons(newMedial_lessons); // Corrected variable name           
            res.send(medial_lessons);

        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message);

        }
    };
    delete=( async (req, res) => {
        try {
            const id = req.params.t_z;
            console.log(`Deleting medial_lessons with id: ${id}`);
            const result = await deleteMedial_lessons(id);
            if (result.rowsAffected[0] === 0) {
                res.status(404).send("Medial_lessons not found");
            } else {
                res.send({ message: "Medial_lessons deleted successfully" });
            }
    
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    });
    put = ( async (req, res) => {

        try {
            const id = req.params.t_z;
            let editmedial_lessons = req.body;
            const medial_lessons = result.recordset;
            let editmedial_lesson = await updateMedial_lessons(t_z, editmedial_lessons); 
            res.send(editmedial_lesson);
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(404).send(error.message);
        }
    });
}