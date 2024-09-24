import { getQuery ,insertQuery} from './query.js';

const getcreditCard = async () => {
    try {
        const creditCard = await getQuery("credit_card");
        console.log(creditCard);
        return creditCard;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } 
};

const getcreditCardById = async (t_z) => { 
    try {
        // נניח ש-t_z הוא מספר
        const AllcreditCard = await getQuery("credit_card");
        console.log("sdfgh");
        // חיפוש המשתמש לפי תעודת זהות
        const creditCard1 = AllcreditCard.find(creditCard1 => creditCard1.t_z === t_z);
       
        if (creditCard1) {
            return creditCard1; // מחזירים את המשתמש אם נמצא
        } else {
            console.log(`creditCard with ID ${t_z} does not exist.`);
            return null; // משתמש לא קיים
        }
    } catch (err) {
        console.error('Query failed! Error:', err);
        return null; // מחזירים null במקרה של שגיאה
    } 
};

const addcreditCard = async (newcreditCard) => {
    console.log("addcreditCard");
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
            if (newcreditCard[key] === undefined) {
                console.error(`Missing value for ${key}`);
                return { error: `Missing value for ${key}` };
            }

            nameValues += `${key},`;
            values += (colums[key] === "string") ? `'${newcreditCard[key]}',` : `${newcreditCard[key]},`;
        }

        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        
        console.log(nameValues);
        console.log(values);

        let creditCard = await insertQuery("credit_card", nameValues, values); // ודא שהשם של הטבלה הוא נכון
        console.log(creditCard);
        return creditCard;
    } catch (err) {
        console.error('Query failed!', err);
        return { error: err.message };
    } 
};


 export { getcreditCard,getcreditCardById, addcreditCard}
