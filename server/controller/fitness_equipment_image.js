import {getFitnessEquipmentsImage,getFitnessEquipmentImageByCode,addFitnessEquipmentImage,deleteFitnessEquipmentImage,updateFitnessEquipmentImage} from '../service/fitness_equipment_image.js';
export class FitnessEquipmentImage {
    getAll = async (req, res) => {

        try {
            const result = await getFitnessEquipmentsImage();
            console.log('successfully ');
            res.send(result);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    search = async (req, res) => {
        try {
            const id = req.params.code;
            console.log(id);
            const result = await getFitnessEquipmentImageByCode(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('FitnessEquipmentImage not found');
            }
        } catch (error) {
            console.error('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    add = async (req, res) => {

        try {
            let newFitnessEquipmentImage  = req.body; // Corrected variable name          
            let FitnessEquipmentImage= await addFitnessEquipmentImage(newFitnessEquipmentImage); // Corrected variable name           
            res.send(FitnessEquipmentImage);

        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message);

        }
    };
    delete=( async (req, res) => {
        try {
            const id = req.body.code_image;
            console.log(`Deleting FitnessEquipmentImage with id: ${id}`);
            const result = await deleteFitnessEquipmentImage(id);
            
            if (result.rowsAffected[0] === 0) {
                res.status(404).send("FitnessEquipmentImage not found");
            } else {
                res.send({ message: "FitnessEquipmentImage deleted successfully" });
            }
    
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    });
    put = ( async (req, res) => {

        try {
            const id = req.params.code;
            let editFitnessEquipmentImage = req.body;
            const FitnessEquipmentImages = result.recordset;
            let editFitnessEquipmentImages = await updateFitnessEquipmentImage(code, editFitnessEquipmentImage); 
            res.send(editFitnessEquipmentImages);
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(404).send(error.message);
        }
    });
}