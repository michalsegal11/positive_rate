import { getQuery ,insertQuery,deleteQuery} from './query.js';

const getcategory = async () => {
    try {
        const category = await getQuery("category");
        console.log(category);
        return category;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } 
};

const getcategoryByCode = async (t_z) => { 
    try {
        // נניח ש-t_z הוא מספר
        const category1 = await getQuery("category");
        console.log("sdfgh");
        // חיפוש המשתמש לפי תעודת זהות
        const categoy1 = category1.find(categoy1 => categoy1.t_z === t_z);
       
        if (categoy1) {
            return categoy1; // מחזירים את המשתמש אם נמצא
        } else {
            console.log(`categoy with ID ${t_z} does not exist.`);
            return null; // משתמש לא קיים
        }
    } catch (err) {
        console.error('Query failed! Error:', err);
        return null; // מחזירים null במקרה של שגיאה
    } 
};

const addcategory = async (newcategoy) => {
    console.log("addcategoy");
    const colums = {
        "t_z": "int",
        "name": "string",
        "phone": "string",
        "gmail": "string",
        "password": "string",
        "adress": "string",
        "birthday": "string",
        "status": "string"
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
            values += (colums[key] === "string") ? `'${newcategoy[key]}',` : `${newcategoy[key]},`;
        }

        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        
        console.log(nameValues);
        console.log(values);

        let category = await insertQuery("category", nameValues, values); // ודא שהשם של הטבלה הוא נכון
        console.log(category);
        return category;
    } catch (err) {
        console.error('Query failed!', err);
        return { error: err.message };
    } 
};

const updateCategory = async (code, updatedCategory) => {
    try {
        let updateU = "";
        for (const key in updatedCategory) {
            if (typeof updatedCategory[key] === "string") {
                updateU += `${key} = '${updatedCategory[key]}', `;
            } else {
                updateU += `${key} = ${updatedCategory[key]}, `;
            }
        }
        updateU = updateU.slice(0, -2); // הסרת הקוממה האחרונה
        console.log('Update Values:', updateU); // הדפס את ערכי העדכון

        // כאן יש לשנות את id ל-t_z
        let ctegories = await updateQuery("ctegory", updateU, "code", code);
        console.log('Updated ctegories:', ctegories); // הדפס את התוצאה
        return ctegories;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" }; // החזרת שגיאה
    }
};


const deleteCategory = async (id) => {
    console.log("deleteFitnessEquipment called with id:", id);
    try {
        const result = await deleteQuery("category", "code", id);
        
        if (result.rowsAffected && result.rowsAffected[0] === 0) {
            console.log(`No category found with ID ${id}`);
            return { error: 'category not found' }; // משתמש לא קיים
        }
        
        console.log('Delete successful:', result);
        return { success: true }; // אם ההסרה הצליחה
    } catch (err) {
        console.error('Query Error:', err);
        return { error: "err" };
    }
};
 export { getcategory,getcategoryByCode, addcategory,updateCategory,deleteCategory}
