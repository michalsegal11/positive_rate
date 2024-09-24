import { getQuery ,insertQuery} from './query.js';

const getmedia_lessons = async () => {
    try {
        const media_lessons = await getQuery("media_lessons");
        console.log(media_lessons);
        return media_lessons;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } 
};

const getmedia_lessonById = async (t_z) => { 
    try {
        // נניח ש-t_z הוא מספר
        const media_lessons1 = await getQuery("media_lessons");
        console.log("sdfgh");
        // חיפוש המשתמש לפי תעודת זהות
        const media_lesson1 = media_lessons1.find(media_lesson1 => media_lesson1.t_z === t_z);
       
        if (media_lesson1) {
            return media_lesson1; // מחזירים את המשתמש אם נמצא
        } else {
            console.log(`media_lesson with ID ${t_z} does not exist.`);
            return null; // משתמש לא קיים
        }
    } catch (err) {
        console.error('Query failed! Error:', err);
        return null; // מחזירים null במקרה של שגיאה
    } 
};

const addmedia_lesson = async (newmedia_lesson) => {
    console.log("addmedia_lesson");
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
            if (newmedia_lesson[key] === undefined) {
                console.error(`Missing value for ${key}`);
                return { error: `Missing value for ${key}` };
            }

            nameValues += `${key},`;
            values += (colums[key] === "string") ? `'${newmedia_lesson[key]}',` : `${newmedia_lesson[key]},`;
        }

        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        
        console.log(nameValues);
        console.log(values);

        let media_lessons = await insertQuery("media_lessons", nameValues, values); // ודא שהשם של הטבלה הוא נכון
        console.log(media_lessons);
        return media_lessons;
    } catch (err) {
        console.error('Query failed!', err);
        return { error: err.message };
    } 
};


 export { getmedia_lessons,getmedia_lessonById, addmedia_lesson}
