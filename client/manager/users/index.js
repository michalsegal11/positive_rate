


let usersArray = []; // אתחול המערך
fetchUsersData(); // קריאה ל-fetch

// מאזינים ללחיצה על כפתורים
document.getElementById('addUserBtn').addEventListener('click', showAddUserForm);
document.getElementById('getUsersBtn').addEventListener('click', displayUsers);
document.getElementById('updateUserBtn').addEventListener('click', displayUsersForEdit);
document.getElementById('deleteUserBtn').addEventListener('click', displayUsersForDelete);

function fetchUsersData() {
    fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        usersArray = data.recordset; // שמירת המידע למערך
    })
    .catch(error => console.error('Error fetching users data:', error));
}

function displayUsers() {
    const userTable = document.getElementById('user-table');
    userTable.innerHTML = ''; // ניקוי הטבלה
    userTable.style.display = 'block';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['בחר', 'שם', 'טלפון', 'אימייל', 'סיסמה', 'כתובת', 'תאריך לידה', 'סטטוס'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    usersArray.forEach(user => {
        const row = document.createElement('tr');
        const radioCell = document.createElement('td');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'user-radio';
        radio.value = user.t_z;
        radioCell.appendChild(radio);
        row.appendChild(radioCell);

        const cells = [user.name, user.phone, user.gmail, user.password, user.adress, user.birthday, user.status];
        cells.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    userTable.appendChild(table);
}

function showAddUserForm() {
    const addFormSection = document.getElementById('userForm');
    addFormSection.innerHTML = ''; // ניקוי הטופס
    addFormSection.style.display = 'block';

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'הוספת משתמש חדש';
    
    const fields = ['t_z','name', 'phone', 'gmail', 'password', 'adress', 'birthday', 'status'];
    fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = field;
        input.placeholder = field.charAt(0).toUpperCase() + field.slice(1);
        addFormSection.appendChild(input);
    });

    const addButton = document.createElement('button');
    addButton.textContent = 'הוסף משתמש';
    addButton.addEventListener('click', addUser);
    
    addFormSection.appendChild(formTitle);
    addFormSection.appendChild(addButton);
}

function addUser() {
    const newUser = {};
    ['t_z','name', 'phone', 'gmail', 'password', 'adress', 'birthday', 'status'].forEach(field => {
        newUser[field] = document.getElementById(field).value;
    });

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
    .then(response => response.json())
    .then(() => {
        alert('משתמש נוסף בהצלחה!');
        fetchUsersData();
    })
    .catch(error => console.error('Error adding user:', error));
}

function displayUsersForEdit() {
    const userTable = document.getElementById('user-table');
    userTable.innerHTML = ''; // ניקוי הטבלה
    userTable.style.display = 'block';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['בחר', 'שם', 'טלפון', 'אימייל', 'סיסמה', 'כתובת', 'תאריך לידה', 'סטטוס'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    usersArray.forEach(user => {
        const row = document.createElement('tr');
        const radioCell = document.createElement('td');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'user-radio';
        radio.value = user.t_z;
        radioCell.appendChild(radio);
        row.appendChild(radioCell);

        const cells = [user.name, user.phone, user.gmail, user.password, user.adress, user.birthday, user.status];
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
        const selectedUser = document.querySelector('input[name="user-radio"]:checked');
        if (!selectedUser) {
            alert('נא לבחור משתמש');
            return;
        }

        const userId = selectedUser.value;
        const user = usersArray.find(u => u.t_z === userId);
        showEditUserForm(user);
    });

    userTable.appendChild(table);
    userTable.appendChild(editButton);
}

function showEditUserForm(user) {
    const editUserSection = document.getElementById('edit-user');
    editUserSection.innerHTML = ''; // ניקוי הטופס
    editUserSection.style.display = 'block';

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'עריכת משתמש';
    
    const fields = ['name', 'phone', 'gmail', 'password', 'adress', 'birthday', 'status'];
    fields.forEach(field => {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = field;
        input.placeholder = field.charAt(0).toUpperCase() + field.slice(1);
        input.value = user[field]; // הצגת ערכים קיימים
        editUserSection.appendChild(input);
    });

    const updateButton = document.createElement('button');
    updateButton.textContent = 'לעדכון';
    updateButton.addEventListener('click', () => updateUser(user.t_z));
    
    editUserSection.appendChild(formTitle);
    editUserSection.appendChild(updateButton);
}

function updateUser(userId) {
        const updatedOneUser = {};
        
        ['name', 'phone', 'gmail', 'password', 'adress', 'birthday', 'status'].forEach(field => {
            updatedOneUser[field] = document.getElementById(field).textContent;
        });
        updatedOneUser['t_z']=userId;
        console.log(updatedOneUser);
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedOneUser),
        }).then(response=>{
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(() => {
            alert('פרטי המשתמש עודכנו בהצלחה!');
            fetchUsersData();
        }) .catch(error => console.error('Error updating user:', error))
   
}

function displayUsersForDelete() {
    const userTable = document.getElementById('user-table');
    userTable.innerHTML = ''; // ניקוי הטבלה
    userTable.style.display = 'block';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['בחר', 'שם', 'טלפון', 'אימייל', 'סיסמה', 'כתובת', 'תאריך לידה', 'סטטוס'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    
    table.appendChild(headerRow);

    usersArray.forEach(user => {
        const row = document.createElement('tr');
        const radioCell = document.createElement('td');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'user-radio';
        radio.value = user.t_z;
        radioCell.appendChild(radio);
        row.appendChild(radioCell);

        const cells = [user.name, user.phone, user.gmail, user.password, user.adress, user.birthday, user.status];
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
        const selectedUser = document.querySelector('input[name="user-radio"]:checked');
        if (!selectedUser) {
            alert('נא לבחור משתמש');
            return;
        }

       
        deleteUser(selectedUser);
    });

    userTable.appendChild(table);
    userTable.appendChild(deleteButton);
}

function deleteUser(selectedUser) {
    fetch(`http://localhost:3000/users/${selectedUser.t_z}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({t_z: selectedUser.t_z,
        name: selectedUser.name,
        phone: selectedUser.phone,
        gmail: selectedUser.gmail,
        password: selectedUser.password,
        adress: selectedUser.adress,
        birthday: selectedUser.birthday,
        status:selectedUser.status
            }),

    })
    .then(response => {
        if (response.ok) {
            alert('המשתמש נמחק בהצלחה!');
            fetchUsersData();
        } else {
            alert('שגיאה במחיקת המשתמש');
        }
    })
    .catch(error => console.error('Error deleting user:', error));
}

