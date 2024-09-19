import express from 'express';
import sql from 'mssql';
import bodyParser from 'body-parser';
import crypto from 'crypto';

const app = express();
const port = 3000;

// הגדרת חיבור למסד נתונים של SQL Server
const config = {
    user: 'your_username',
    password: 'your_password',
    server: 'localhost', // או ה-IP של השרת
    database: 'your_database_name',
    options: {
        encrypt: true, // עבור Azure, צריך להגדיר true
        trustServerCertificate: true // לשימוש מקומי
    }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// פונקציה להצפנת פרטי האשראי
function encrypt(text) {
    const cipher = crypto.createCipher('aes-256-cbc', 'your_secret_key');
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Endpoint לקבלת פרטי האשראי
app.post('/save-card', async (req, res) => {
    const { cardNumber, cardHolder, expiryDate, cvv } = req.body;

    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
        return res.status(400).send('All fields are required!');
    }

    // הצפנת פרטי האשראי
    const encryptedCardNumber = encrypt(cardNumber);
    const encryptedCVV = encrypt(cvv);

    try {
        // חיבור למסד הנתונים
        await sql.connect(config);
        
        // שמירת פרטי האשראי במסד נתונים
        const result = await sql.query`INSERT INTO credit_cards (card_number, card_holder, expiry_date, cvv) VALUES (${encryptedCardNumber}, ${cardHolder}, ${expiryDate}, ${encryptedCVV})`;
        
        res.status(200).send('Card details saved successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving card details.');
    } finally {
        // ניתוק מהמסד נתונים
        await sql.close();
    }
});

// הפעלת השרת
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

