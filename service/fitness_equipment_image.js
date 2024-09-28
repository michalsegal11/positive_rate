

import { getQuery ,insertQuery} from './query.js';

const getFitnessEquipmentsImage = async () => {
    try {
        const FitnessEquipmentImage = await getQuery("fitness_equipment_image");
        console.log(FitnessEquipmentImage);
        return FitnessEquipmentImage;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } 
};

const getFitnessEquipmentImageByCode = async (code) => { 
    try {
        // נניח ש-t_z הוא מספר
        const FitnessEquipmentImage1 = await getQuery("fitness_equipment_image");
        console.log("sdfgh");
        // חיפוש המשתמש לפי תעודת זהות
        const FitnessEquipmentImage = FitnessEquipmentImage1.find(FitnessEquipmentImage => FitnessEquipmentImage.code === code);
       
        if (FitnessEquipmentImage) {
            return FitnessEquipmentImage; // מחזירים את המשתמש אם נמצא
        } else {
            console.log(`FitnessEquipmentImage with ID ${code} does not exist.`);
            return null; // משתמש לא קיים
        }
    } catch (err) {
        console.error('Query failed! Error:', err);
        return null; // מחזירים null במקרה של שגיאה
    } 
};

const addFitnessEquipmentImage = async (newFitnessEquipmentImage) => {
    console.log("addFitnessEquipmentImage");
    const colums = {
        "code_fitness": "int",
        "name": "string",
        "about": "string",
    };
    try {
        let nameValues = "";
        let values = "";

        for (const key in colums) {
            if (newcategoy[key] === undefined) {
                console.error(`Missing value for ${key}`);
                return { error: `Missing value for ${key}` };
            }

            nameValues += `${key},`;
            values += (colums[key] === "string") ? `'${newFitnessEquipmentImage[key]}',` : `${newFitnessEquipmentImage[key]},`;
        }

        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        
        console.log(nameValues);
        console.log(values);

        let FitnessEquipmentImage = await insertQuery("fitness_equipment_image", nameValues, values); // ודא שהשם של הטבלה הוא נכון
        console.log(FitnessEquipmentImage);
        return FitnessEquipmentImage;
    } catch (err) {
        console.error('Query failed!', err);
        return { error: err.message };
    } 
};
const updateFitnessEquipmentImage = async (t_z, updatedFitnessEquipmentImage) => {
    try {
        let updateU = "";
        for (const key in updatedFitnessEquipmentImage) {
            if (typeof updatedFitnessEquipmentImage[key] === "string") {
                updateU += `${key} = '${updatedFitnessEquipmentImage[key]}', `;
            } else {
                updateU += `${key} = ${updatedFitnessEquipmentImage[key]}, `;
            }
        }
        updateU = updateU.slice(0, -2); // הסרת הקוממה האחרונה
        console.log('Update Values:', updateU); // הדפס את ערכי העדכון

        // כאן יש לשנות את id ל-t_z
        let FitnessEquipmentImage = await updateQuery("FitnessEquipmentImages", updateU, "t_z", t_z);
        console.log('Updated FitnessEquipmentImage:', FitnessEquipmentImage); // הדפס את התוצאה
        return FitnessEquipmentImage;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" }; // החזרת שגיאה
    }
};


const deleteFitnessEquipmentImage = async (id) => {
    console.log("deleteFitnessEquipmentImage called with id:", id);
    try {
        const result = await deleteQuery("FitnessEquipmentImages", "t_z", id);
        
        if (result.rowsAffected && result.rowsAffected[0] === 0) {
            console.log(`No FitnessEquipmentImage found with ID ${id}`);
            return { error: 'FitnessEquipmentImage not found' }; // משתמש לא קיים
        }
        
        console.log('Delete successful:', result);
        return { success: true }; // אם ההסרה הצליחה
    } catch (err) {
        console.error('Query Error:', err);
        return { error: "err" };
    }
};



 export { getFitnessEquipmentsImage,getFitnessEquipmentImageByCode, addFitnessEquipmentImage,deleteFitnessEquipmentImage,updateFitnessEquipmentImage}
