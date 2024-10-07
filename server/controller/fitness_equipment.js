import {getFitnessEquipment,getFitnessEquipmentByCode,addFitnessEquipment,deleteFitnessEquipment,updateFitnessEquipment} from '../service/fitness_equipment.js';
import {getFitnessEquipmentsImage,deleteFitnessEquipmentImage}from '../service/fitness_equipment_image.js';
export class FitnessEquipment {
    getAll = async (req,res) => {
        try {
            const result = await getFitnessEquipment();
            console.log('successfully ');
            console.log("GET request received");     
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
            const result = await getFitnessEquipmentByCode(id);
            if (result) {
                res.send(result);
            } else {
                res.status(404).send('FitnessEquipment not found');
            }
        } catch (error) {
            console.error('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    add = async (req, res) => {
        try {
            let newFitnessEquipment  = req.body; // Corrected variable name          
            let FitnessEquipment= await addFitnessEquipment(newFitnessEquipment); // Corrected variable name           
            res.send(FitnessEquipment);

        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };
    delete=( async (req, res) => {
        try {
            const id = req.body.code_fitness;
            console.log(`Deleting FitnessEquipment with id: ${id}`);
            //מחיקת הילדים קודם מחיקת האב
            let children;
            try {
                children=await getFitnessEquipmentsImage();
                console.log('successfully ');            
    
            } catch (error) {
                console.error('there was an error:', error.message);
                res.status(500).send(error.message);
            }
            console.log(children);
            let resultDel;
        
            
            if (children.recordset && children.recordset.length > 0) {
                for (const child of children.recordset) {
                    if (child.code_fitness == id) {
                        console.log("success");
                         resultDel = await deleteFitnessEquipmentImage(child.code_image);
                        
                        if (resultDel.rowsAffected[0] === 0) {
                            res.status(404).send("FitnessEquipmentImage not found");
                        } else {
                            console.log("Image deleted successfully");
                        }
                    }
                }
            }
            
            const result = await deleteFitnessEquipment(id);
           
            if (result.rowsAffected[0] === 0) {
                res.status(404).send("FitnessEquipment not found");
            } else {
                res.send({ message: "FitnessEquipment deleted successfully" });
            }
          
    
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(500).send(error.message);
        }
    });
    put = ( async (req, res) => {

        try {
            const id = req.params.code_fitness;
            let editFitnessEquipment = req.body;
            const FitnessEquipments = result.recordset;
            let editFitnessEquipments = await updateFitnessEquipment(code, editFitnessEquipment); 
            res.send(editFitnessEquipments);
        } catch (error) {
            console.log('There was an error:', error.message);
            res.status(404).send(error.message);
        }
    });
}