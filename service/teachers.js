import { getQuery ,insertQuery} from './query.js';

const getusers = async () => {
    try {
        const users = await getQuery("users");
        console.log(users);
        return users;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } 
};

const getUserById = async (t_z) => { 
    try {
        // נניח ש-t_z הוא מספר
        const users1 = await getQuery("users");
        console.log("sdfgh");
        // חיפוש המשתמש לפי תעודת זהות
        const user1 = users1.find(user1 => user1.t_z === t_z);
       
        if (user1) {
            return user1; // מחזירים את המשתמש אם נמצא
        } else {
            console.log(`User with ID ${t_z} does not exist.`);
            return null; // משתמש לא קיים
        }
    } catch (err) {
        console.error('Query failed! Error:', err);
        return null; // מחזירים null במקרה של שגיאה
    } 
};

const addUser = async (newUser) => {
    console.log("addUser");
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
            if (newUser[key] === undefined) {
                console.error(`Missing value for ${key}`);
                return { error: `Missing value for ${key}` };
            }

            nameValues += `${key},`;
            values += (colums[key] === "string") ? `'${newUser[key]}',` : `${newUser[key]},`;
        }

        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        
        console.log(nameValues);
        console.log(values);

        let users = await insertQuery("users", nameValues, values); // ודא שהשם של הטבלה הוא נכון
        console.log(users);
        return users;
    } catch (err) {
        console.error('Query failed!', err);
        return { error: err.message };
    } 
};


 export { getusers,getUserById, addUser}
