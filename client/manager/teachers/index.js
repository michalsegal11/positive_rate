
let teachersArray = []; // אתחול המערך
fetchteachersData(); // קריאה ל-fetch

// מאזינים ללחיצה על כפתורים
document.getElementById('addteacherBtn').addEventListener('click', showAddteacherForm);
document.getElementById('getteachersBtn').addEventListener('click', displayteachers);
document.getElementById('updateteacherBtn').addEventListener('click', displayteachersForEdit);
document.getElementById('deleteteacherBtn').addEventListener('click', displayteachersForDelete);

function fetchteachersData() {
    fetch('http://localhost:3000/teachers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        teachersArray = data.recordset; // שמירת המידע למערך
    })
    .catch(error => console.error('Error fetching teachers data:', error));
}

function displayteachers() {
    const teacherTable = document.getElementById('teacher-table');
    teacherTable.innerHTML = ''; // ניקוי הטבלה
    teacherTable.style.display = 'block';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['בחר', 'שם', 'טלפון', 'אימייל', 'סיסמה', 'כתובת', 'תאריך לידה'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    teachersArray.forEach(teacher => {
        const row = document.createElement('tr');
        const radioCell = document.createElement('td');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'teacher-radio';
        radio.value = teacher.t_z;
        radioCell.appendChild(radio);
        row.appendChild(radioCell);

        const cells = [teacher.name, teacher.phone, teacher.gmail, teacher.password, teacher.adress, teacher.birthday];
        cells.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    teacherTable.appendChild(table);
}

function showAddteacherForm() {
    const addFormSection = document.getElementById('teacherForm');
    addFormSection.innerHTML = ''; // ניקוי הטופס
    addFormSection.style.display = 'block';

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'הוספת משתמש חדש';
    
    const fields = ['t_z','name', 'phone', 'gmail', 'password', 'adress', 'birthday'];
    fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = field;
        input.placeholder = field.charAt(0).toUpperCase() + field.slice(1);
        addFormSection.appendChild(input);
    });

    const addButton = document.createElement('button');
    addButton.textContent = 'הוסף משתמש';
    addButton.addEventListener('click', addteacher);
    
    addFormSection.appendChild(formTitle);
    addFormSection.appendChild(addButton);
}

function addteacher() {
    const newteacher = {};
    ['t_z','name', 'phone', 'gmail', 'password', 'adress', 'birthday'].forEach(field => {
        newteacher[field] = document.getElementById(field).value;
    });

    fetch('http://localhost:3000/teachers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newteacher),
    })
    .then(response => response.json())
    .then(() => {
        alert('משתמש נוסף בהצלחה!');
        fetchteachersData();
    })
    .catch(error => console.error('Error adding teacher:', error));
}

function displayteachersForEdit() {
    const teacherTable = document.getElementById('teacher-table');
    teacherTable.innerHTML = ''; // ניקוי הטבלה
    teacherTable.style.display = 'block';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['בחר', 'שם', 'טלפון', 'אימייל', 'סיסמה', 'כתובת', 'תאריך לידה'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    teachersArray.forEach(teacher => {
        const row = document.createElement('tr');
        const radioCell = document.createElement('td');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'teacher-radio';
        radio.value = teacher.t_z;
        radioCell.appendChild(radio);
        row.appendChild(radioCell);

        const cells = [teacher.name, teacher.phone, teacher.gmail, teacher.password, teacher.adress, teacher.birthday];
        cells.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'עדכן';
    editButton.addEventListener('click', () => {
        const selectedteacher = document.querySelector('input[name="teacher-radio"]:checked');
        if (!selectedteacher) {
            alert('נא לבחור משתמש');
            return;
        }

        const teacherId = selectedteacher.value;
        const teacher = teachersArray.find(u => u.t_z === teacherId);
        showEditteacherForm(teacher);
    });

    teacherTable.appendChild(table);
    teacherTable.appendChild(editButton);
}

function showEditteacherForm(teacher) {
    const editteacherSection = document.getElementById('edit-teacher');
    editteacherSection.innerHTML = ''; // ניקוי הטופס
    editteacherSection.style.display = 'block';

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'עריכת משתמש';
    
    const fields = ['name', 'phone', 'gmail', 'password', 'adress', 'birthday'];
    fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = field;
        input.placeholder = field.charAt(0).toUpperCase() + field.slice(1);
        input.value = teacher[field]; // הצגת ערכים קיימים
        editteacherSection.appendChild(input);
    });

    const updateButton = document.createElement('button');
    updateButton.textContent = 'לעדכון';
    updateButton.addEventListener('click', () => updateteacher(teacher.t_z));
    
    editteacherSection.appendChild(formTitle);
    editteacherSection.appendChild(updateButton);
}

function updateteacher(teacherId) {
        const updatedOneteacher = {};
        
        ['name', 'phone', 'gmail', 'password', 'adress', 'birthday'].forEach(field => {
            updatedOneteacher[field] = document.getElementById(field).textContent;
        });
        updatedOneteacher['t_z']=teacherId;
        console.log(updatedOneteacher);
        fetch(`http://localhost:3000/teachers/${teacherId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedOneteacher),
        }).then(response=>{
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(() => {
            alert('פרטי המשתמש עודכנו בהצלחה!');
            fetchteachersData();
        }) .catch(error => console.error('Error updating teacher:', error))
   
}

function displayteachersForDelete() {
    const teacherTable = document.getElementById('teacher-table');
    teacherTable.innerHTML = ''; // ניקוי הטבלה
    teacherTable.style.display = 'block';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['בחר', 'שם', 'טלפון', 'אימייל', 'סיסמה', 'כתובת', 'תאריך לידה'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    
    table.appendChild(headerRow);

    teachersArray.forEach(teacher => {
        const row = document.createElement('tr');
        const radioCell = document.createElement('td');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'teacher-radio';
        radio.value = teacher.t_z;
        radioCell.appendChild(radio);
        row.appendChild(radioCell);

        const cells = [teacher.name, teacher.phone, teacher.gmail, teacher.password, teacher.adress, teacher.birthday];
        cells.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'מחק';
    deleteButton.addEventListener('click', () => {
        const selectedteacher = document.querySelector('input[name="teacher-radio"]:checked');
        if (!selectedteacher) {
            alert('נא לבחור משתמש');
            return;
        }

       
        deleteteacher(selectedteacher);
    });

    teacherTable.appendChild(table);
    teacherTable.appendChild(deleteButton);
}

function deleteteacher(selectedteacher) {
    fetch(`http://localhost:3000/teachers/${selectedteacher.t_z}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({t_z: selectedteacher.t_z,
        name: selectedteacher.name,
        phone: selectedteacher.phone,
        gmail: selectedteacher.gmail,
        password: selectedteacher.password,
        adress: selectedteacher.adress,
        birthday: selectedteacher.birthday,
       
            }),

    })
    .then(response => {
        if (response.ok) {
            alert('המשתמש נמחק בהצלחה!');
            fetchteachersData();
        } else {
            alert('שגיאה במחיקת המשתמש');
        }
    })
    .catch(error => console.error('Error deleting teacher:', error));
}

