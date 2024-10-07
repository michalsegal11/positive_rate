import { getQuery ,insertQuery,deleteQuery} from './query.js';

const getFitnessEquipment = async () => {
    try {
        const FitnessEquipment = await getQuery("fitness_equipment");
        console.log(FitnessEquipment);
        return FitnessEquipment;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } 
};
const getFitnessEquipmentByCode = async (code) => { 
    try {
        // נניח ש-t_z הוא מספר
        const FitnessEquipment1 = await getQuery("fitness_equipment");
        console.log("sdfgh");
        // חיפוש המשתמש לפי תעודת זהות
        const FitnessEquipment = FitnessEquipment1.find(FitnessEquipment => FitnessEquipment.code === code);
       
        if (FitnessEquipment) {
            return FitnessEquipment; // מחזירים את המשתמש אם נמצא
        } else {
            console.log(`FitnessEquipment with ID ${code} does not exist.`);
            return null; // משתמש לא קיים
        }
    } catch (err) {
        console.error('Query failed! Error:', err);
        return null; // מחזירים null במקרה של שגיאה
    } 
};
const addFitnessEquipment = async (newFitnessEquipment) => {
    console.log("addFitnessEquipment");
    const colums = {
        "name": "string",
        "about": "string",
    };
    try {
        let nameValues = "";
        let values = "";

        for (const key in colums) {
            if (newFitnessEquipment[key] === undefined) {
                console.error(`Missing value for ${key}`);
                return { error: `Missing value for ${key}` };
            }

            nameValues += `${key},`;
            values += (colums[key] === "string") ? `'${newFitnessEquipment[key]}',` : `${newFitnessEquipment[key]},`;
        }

        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        
        console.log(nameValues);
        console.log(values);

        let FitnessEquipment = await insertQuery("fitness_equipment", nameValues, values); // ודא שהשם של הטבלה הוא נכון
        console.log(FitnessEquipment);
        return FitnessEquipment;
    } catch (err) {
        console.error('Query failed!', err);
        return { error: err.message };
    } 
};
const updateFitnessEquipment = async (t_z, updatedFitnessEquipment) => {
    try {
        let updateU = "";
        for (const key in updatedFitnessEquipment) {
            if (typeof updatedFitnessEquipment[key] === "string") {
                updateU += `${key} = '${updatedFitnessEquipment[key]}', `;
            } else {
                updateU += `${key} = ${updatedFitnessEquipment[key]}, `;
            }
        }
        updateU = updateU.slice(0, -2); // הסרת הקוממה האחרונה
        console.log('Update Values:', updateU); // הדפס את ערכי העדכון

        // כאן יש לשנות את id ל-t_z
        let FitnessEquipment = await updateQuery("FitnessEquipments", updateU, "t_z", t_z);
        console.log('Updated FitnessEquipment:', FitnessEquipment); // הדפס את התוצאה
        return FitnessEquipment;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" }; // החזרת שגיאה
    }
};
const deleteFitnessEquipment = async (id) => {
    console.log("deleteFitnessEquipment called with id:", id);
    try {
        const result = await deleteQuery("fitness_equipment", "code_fitness", id);
        
        if (result.rowsAffected && result.rowsAffected[0] === 0) {
            console.log(`No FitnessEquipment found with ID ${id}`);
            return { error: 'FitnessEquipment not found' }; // משתמש לא קיים
        }
        
        console.log('Delete successful:', result);
        return { success: true }; // אם ההסרה הצליחה
    } catch (err) {
        console.error('Query Error:', err);
        return { error: "err" };
    }
};

 export { getFitnessEquipment,getFitnessEquipmentByCode, addFitnessEquipment,deleteFitnessEquipment,updateFitnessEquipment}
