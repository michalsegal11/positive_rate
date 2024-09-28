
let file;
let formData;


document.getElementById('fetchDataBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/fitness_equipment', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // המרת התשובה לפורמט JSON
        const data = await response.json();

        // הדפס את הנתונים לקונסול לבדיקה
        console.log('Fetched data:', data);

        // גישה למערך של מכשירי הכושר
        const equipmentArray = data.recordset; // גישה למערך דרך recordset

        // בדוק אם הנתונים הם מערך
        if (!Array.isArray(equipmentArray)) {
            throw new Error('Data is not an array');
        }

        // הצגת הנתונים ב-HTML
        const equipmentList = document.getElementById('equipmentList');
        equipmentList.innerHTML = ''; // לנקות את הרשימה לפני הוספה

        equipmentArray.forEach(equipment => {
            const listItem = document.createElement('li');
            listItem.textContent = `${equipment.name} - ${equipment.about}`;
            equipmentList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error fetching equipment data:', error);
    }
});



 // הוספת מכשיר כושר
document.getElementById('add-device-button').addEventListener('click', async () => {
    
    


    const name = document.getElementById('image-name').value;
    const info = document.getElementById('device-info').value;


    try {
        // שלח את התמונה לשרת להעתקה
        await fetch('http://localhost:3000/upload-image', {
            method: 'POST',
            body: formData
        });

        const response = await fetch('http://localhost:3000/fitness_equipment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, about: info }) // שים לב שהשדה "about" הוא השם הנכון של המידע
            });
         if (!response.ok) {
             throw new Error('Network response was not ok');
         }


             // קבלת התגובה מהשרת
        const result = await response.json();
        console.log('Added device:', result);

        // הצגת הודעה למשתמש
        alert('Device added successfully!');
        console.log('Image uploaded successfully!');

        // אם תרצה לנקות את השדות לאחר ההוספה, תוכל לעשות זאת כאן
        document.getElementById('image-name').value = '';
        document.getElementById('device-info').value = '';
        document.getElementById('device-image').value = '';

        // console.log('Added device:', result); // הצגת התוצאה בקונסול אם תרצה לבדוק

    } catch (error) {
        console.error('Error adding device:', error);
        alert('Failed to add device.'); // הצגת הודעת שגיאה למשתמש
    }
});


document.getElementById('device-image').addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (file) {
        const newName = document.getElementById('image-name').value || file.name; // כאן נשאר כמו שהיה
        formData = new FormData();
        formData.append('image', file);
        formData.append('newName', newName); // הוספת השם החדש ל-FormData

        
    }
});














// document.addEventListener('DOMContentLoaded', function () {
//     // פונקציה לשליפת מכשירי כושר
//     function fetchDevices() {
//         fetch('/fitness-equipment')
//             .then(response => response.json())
//             .then(devices => {
//                 const devicesList = document.getElementById('devices-list');
//                 devicesList.innerHTML = ''; // ניקוי רשימה קודמת
//                 devices.forEach(device => {
//                     const li = document.createElement('li');
//                     li.innerHTML = `
//                         <strong>שם מכשיר:</strong> ${device.שם_מכשיר}<br>
//                         <strong>מידע אודותיו:</strong> ${device.מידע_אודותיו}
//                     `;
//                     devicesList.appendChild(li);
//                 });
//             })
//             .catch(error => console.error('Error fetching devices:', error));
//     }

// } 