import sql from 'mssql';

const config = {
    user: 'michal',// הכניסי כאן את שם המשתמש שלך
    password: '123', // הכניסי כאן את הסיסמה שלך
    server: 'DESKTOP-SSNMLFD', // הכניסי כאן את שם השרת שלך (למשל 'localhost' אם מדובר בשרת מקומי)
    database: 'positive_rate', // הכניסי כאן את שם המאגר שתרצי להתחבר אליו
    options: {
        encrypt: true, // השתמשי ב-encryption אם את מתחברת ל-Azure
        trustServerCertificate: true // השתמשי בזה רק בסביבות פיתוח
    }
};

async function connectToDatabase() {
    try {
        let pool = await sql.connect(config);
        console.log('Connected to SQL Server!');
        // כאן אפשר להוסיף שאילתות או לוגיקה נוספת
    } catch (err) {
        console.error('Connection failed:', err);
    }
}

connectToDatabase();