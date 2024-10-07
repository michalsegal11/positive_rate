import sql from 'mssql';

const config = {
    user: 'm3',
    password: '12345',
    server: 'DESKTOP-SSNMLFD', // או שם השרת המתאים
    database: 'positive_rate2',
    options: {
        encrypt: false, // או true, תלוי בצורך שלך
        trustServerCertificate: true // זה המפתח להימנע מהשגיאה
    }
};

let pool;

const connectToDatabase = async () => {
    if (!pool) {
        try {
            pool = await sql.connect(config);
            console.log('Connected to the database!');
        } catch (err) {
            console.error('Database connection failed! Error:', err);
            throw err; // זרוק את השגיאה אם החיבור נכשל
        }
    }
    return pool;
};

const closeConnection = async () => {
    console.log(pool)
    if (pool) {
        await pool.close();
        pool = null; // איפוס ה-pool
        console.log('Database connection closed.');
    }
};
connectToDatabase();

export { connectToDatabase, closeConnection };

