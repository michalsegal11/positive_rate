



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





