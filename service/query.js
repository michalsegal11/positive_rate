import {connectToDatabase} from '../service/database.js';
import sql from 'mssql';



const executeQuery = async (query) => {
    try {
        const dbPool = await connectToDatabase();
        const result = await dbPool.request().query(query);
        return result; // החזר את התוצאה המלאה כולל rowsAffected
    } catch (err) {
        console.error('Query failed! Error:', err);
        return { rowsAffected: [] }; // החזר אובייקט עם rowsAffected ריק
    }
};


const getQuery = async (table_name) => {
    const query = `SELECT * FROM ${table_name}`;
    const result = await executeQuery(query);
    return result;
};






const  insertQuery = async (table_name,valuesName,values) =>{
    const query = `INSERT INTO [dbo].${table_name}(${valuesName}) VALUES (${values})`
    console.log(query);
     const   result =await executeQuery(query)
    return result;
}
const updateQuery = async (tableName, updateValues, namefield, valueField) => {
    try {
        const query = `UPDATE ${tableName} SET ${updateValues} WHERE ${namefield} = '${valueField}'`; // הוספת גרשיים למשתנה
        console.log('Update Query:', query); // הדפס את השאילתא
        const result = await executeQuery(query);
        return { success: true };
    } catch (error) {
        console.error('Error executing update query:', error);
        throw error; // דחוף את השגיאה הלאה
    }
};


const deleteQuery = async (tableName, nameFiled, valueFiled) => {
    try {
        const query = `DELETE FROM ${tableName} WHERE ${nameFiled} = '${valueFiled}'`;
        console.log('Delete Query:', query);
        const result = await executeQuery(query);
        
        // אם הפונקציה executeQuery מחזירה את התוצאה, תוודא שהיא כוללת את מספר השורות שהוסרו
        console.log('Delete result:', result); // הוסף זה כדי לבדוק את התוצאה
        return result; // תוודא שאתה מחזיר את התוצאה הנכונה
    } catch (error) {
        console.error('Error executing delete query:', error);
        throw error;
    }
};


export{
    getQuery ,insertQuery,executeQuery,deleteQuery,updateQuery
}