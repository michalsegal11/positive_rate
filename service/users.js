import { getQuery } from './query.js';

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
        const users = await getQuery("users");
        
        // חיפוש המשתמש לפי תעודת זהות
        const user = users.find(user => user.t_z === t_z);
        
        if (user) {
            return user; // מחזירים את המשתמש אם נמצא
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
    console.log("adduser")
    try {
let nameValues = "";
let values="";
for (const key in colums) {
    nameValues+=  key+',';
    if(colums[key] == "string")
    values+=  `'${newUser[key]}',`;
    else
    values+=  newUser[key]+',';
}
nameValues = nameValues.slice(0, -1);
values = values.slice(0, -1);
console.log(nameValues);
console.log(values);
        let users = await insertQuery("user",nameValues,values);
        console.log(users)
       return users;
    } catch (err) {
        console.error('Query ');
        return {"error":"err"};
    } 
};

 export { getusers,getUserById, adduser}
