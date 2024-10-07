import { getQuery ,insertQuery,deleteQuery,updateQuery} from './query.js';

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
        console.log(users1);
        const user1 = users1.recordset.find(user1 => user1.t_z === t_z);
       
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
const adduser = async (newUser) => {
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
const updateUser = async (t_z, updatedUser) => {
    try {
        let updateU = "";
        for (const key in updatedUser) {
            if (typeof updatedUser[key] === "string") {
                updateU += `${key} = '${updatedUser[key]}', `;
            } else {
                updateU += `${key} = ${updatedUser[key]}, `;
            }
        }
        updateU = updateU.slice(0, -2); // הסרת הקוממה האחרונה
        console.log('Update Values:', updateU); // הדפס את ערכי העדכון

        // כאן יש לשנות את id ל-t_z
        let user = await updateQuery("users", updateU, "t_z", t_z);
        console.log('Updated User:', user); // הדפס את התוצאה
        return user;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" }; // החזרת שגיאה
    }
};
const deleteUser = async (id) => {
    console.log("deleteUser called with id:", id);
    try {
        const result = await deleteQuery("users", "t_z", id);
        
        if (result.rowsAffected && result.rowsAffected[0] === 0) {
            console.log(`No user found with ID ${id}`);
            return { error: 'User not found' }; // משתמש לא קיים
        }
        
        console.log('Delete successful:', result);
        return { success: true }; // אם ההסרה הצליחה
    } catch (err) {
        console.error('Query Error:', err);
        return { error: "err" };
    }
};
export {getusers,getUserById, adduser,deleteUser,updateUser}

