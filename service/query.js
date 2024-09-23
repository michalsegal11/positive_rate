import {connectToDatabase} from '../service/database.js';
import sql from 'mssql';



const executeQuery = async (query) => {
    try {
        const dbPool = await connectToDatabase();
        const result = await dbPool.request().query(query);
        return result.recordset; // החזר את התוצאה הנכונה
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
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
export{
    getQuery ,insertQuery,executeQuery
}
