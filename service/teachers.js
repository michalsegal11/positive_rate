import { getQuery ,insertQuery} from './query.js';

const getteachers = async () => {
    try {
        const teachers = await getQuery("teachers");
        console.log(teachers);
        return teachers;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } 
};

const getteacherById = async (t_z) => { 
    try {
        // נניח ש-t_z הוא מספר
        const teachers1 = await getQuery("teachers");
        console.log("sdfgh");
        // חיפוש המשתמש לפי תעודת זהות
        const teacher1 = teachers1.find(teacher1 => teacher1.t_z === t_z);
       
        if (teacher1) {
            return teacher1; // מחזירים את המשתמש אם נמצא
        } else {
            console.log(`teacher with ID ${t_z} does not exist.`);
            return null; // משתמש לא קיים
        }
    } catch (err) {
        console.error('Query failed! Error:', err);
        return null; // מחזירים null במקרה של שגיאה
    } 
};

const addteacher = async (newteacher) => {
    console.log("addteacher");
    const colums = {
        "t_z": "int",
        "name": "string",
        "phone": "string",
        "gmail": "string",
        "adress": "string",
        "birthday": "string"
       
    };
    try {
        let nameValues = "";
        let values = "";

        for (const key in colums) {
            if (newteacher[key] === undefined) {
                console.error(`Missing value for ${key}`);
                return { error: `Missing value for ${key}` };
            }

            nameValues += `${key},`;
            values += (colums[key] === "string") ? `'${newteacher[key]}',` : `${newteacher[key]},`;
        }

        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        
        console.log(nameValues);
        console.log(values);

        let teachers = await insertQuery("teachers", nameValues, values); // ודא שהשם של הטבלה הוא נכון
        console.log(teachers);
        return teachers;
    } catch (err) {
        console.error('Query failed!', err);
        return { error: err.message };
    } 
};


 export { getteachers,getteacherById, addteacher}
