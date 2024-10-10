let categoriesArray = []; // אתחול המערך
fetchCategoriesData(); // קריאה ל-fetch

// מאזינים ללחיצה על כפתורים
document.getElementById('addCategoryBtn').addEventListener('click', showAddCategoryForm);
document.getElementById('getCategoriesBtn').addEventListener('click', displayCategories);
document.getElementById('updateCategoryBtn').addEventListener('click', displayCategoriesForEdit);
document.getElementById('deleteCategoryBtn').addEventListener('click', displayCategoriesForDelete);

function fetchCategoriesData() {
    fetch('http://localhost:3000/category', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        categoriesArray = data.recordset; // שמירת המידע למערך
    })
    .catch(error => console.error('Error fetching categories data:', error));
}

function displayCategories() {
    const categoryTable = document.getElementById('category-table');
    categoryTable.innerHTML = ''; // ניקוי הטבלה
    categoryTable.style.display = 'block';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['בחר', 'מזהה', 'שם', 'טלפון', 'גימייל', 'סיסמה', 'כתובת', 'תאריך לידה'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    categoriesArray.forEach(category => {
        const row = document.createElement('tr');
        const radioCell = document.createElement('td');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'category-radio';
        radio.value = category.t_z;
        radioCell.appendChild(radio);
        row.appendChild(radioCell);

        const cells = [category.t_z, category.name, category.phone, category.gmail, category.password, category.adress, category.birthday];
        cells.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    categoryTable.appendChild(table);
}

function showAddCategoryForm() {
    const addFormSection = document.getElementById('categoryForm');
    addFormSection.style.display = 'block';
}

function addCategory() {
    const newCategory = {};
    ['t_z', 'name', 'phone', 'gmail', 'password', 'adress', 'birthday'].forEach(field => {
        newCategory[field] = document.getElementById(field).value;
    });

    fetch('http://localhost:3000/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
    })
    .then(response => response.json())
    .then(() => {
        alert('קטגוריה נוספה בהצלחה!');
        fetchCategoriesData();
    })
    .catch(error => console.error('Error adding category:', error));
}


function displayCategoriesForEdit() {
    const categoryTable = document.getElementById('category-table');
    categoryTable.innerHTML = ''; // ניקוי הטבלה
    categoryTable.style.display = 'block';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['בחר', 'שם קטגוריה'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    categoriesArray.forEach(category => {
        const row = document.createElement('tr');
        const radioCell = document.createElement('td');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'category-radio';
        radio.value = category.category_id;
        radioCell.appendChild(radio);
        row.appendChild(radioCell);

        const categoryNameCell = document.createElement('td');
        categoryNameCell.textContent = category.category_name;
        row.appendChild(categoryNameCell);

        table.appendChild(row);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'עדכן';
    editButton.addEventListener('click', () => {
        const selectedCategory = document.querySelector('input[name="category-radio"]:checked');
        if (!selectedCategory) {
            alert('נא לבחור קטגוריה');
            return;
        }

        const categoryId = selectedCategory.value;
        const category = categoriesArray.find(c => c.category_id === categoryId);
        showEditCategoryForm(category);
    });

    categoryTable.appendChild(table);
    categoryTable.appendChild(editButton);
}

function showEditCategoryForm(category) {
    const editCategorySection = document.getElementById('edit-category');
    editCategorySection.innerHTML = ''; // ניקוי הטופס
    editCategorySection.style.display = 'block';

    const formTitle = document.createElement('h2');
    formTitle.textContent = 'עריכת קטגוריה';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'category_name';
    input.value = category.category_name;
    editCategorySection.appendChild(input);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'עדכן';
    updateButton.addEventListener('click', () => updateCategory(category.category_id));
    
    editCategorySection.appendChild(formTitle);
    editCategorySection.appendChild(updateButton);
}

function updateCategory(categoryId) {
    const updatedCategory = {
        category_name: document.getElementById('category_name').value
    };

    fetch(`http://localhost:3000/category/${categoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
    })
    .then(response => response.json())
    .then(() => {
        alert('הקטגוריה עודכנה בהצלחה!');
        fetchCategoriesData();
    })
    .catch(error => console.error('Error updating category:', error));
}

function displayCategoriesForDelete() {
    const categoryTable = document.getElementById('category-table');
    categoryTable.innerHTML = ''; // ניקוי הטבלה
    categoryTable.style.display = 'block';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['בחר', 'שם קטגוריה'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    
    table.appendChild(headerRow);

    categoriesArray.forEach(category => {
        const row = document.createElement('tr');
        const radioCell = document.createElement('td');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'category-radio';
        radio.value = category.category_id;
        radioCell.appendChild(radio);
        row.appendChild(radioCell);

        const categoryNameCell = document.createElement('td');
        categoryNameCell.textContent = category.category_name;
        row.appendChild(categoryNameCell);

        table.appendChild(row);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'מחק';
    deleteButton.addEventListener('click', deleteCategory);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'בטל';
    cancelButton.addEventListener('click', () => {
        categoryTable.innerHTML = ''; // ניקוי הטבלה
        categoryTable.style.display = 'none';
    });

    categoryTable.appendChild(table);
    categoryTable.appendChild(deleteButton);
    categoryTable.appendChild(cancelButton);
}

function deleteCategory() {
    const selectedCategory = document.querySelector('input[name="category-radio"]:checked');
    if (!selectedCategory) {
        alert('נא לבחור קטגוריה למחיקה');
        return;
    }

    fetch(`http://localhost:3000/category/${selectedCategory.value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(() => {
        alert('הקטגוריה נמחקה בהצלחה!');
        fetchCategoriesData();
    })
    .catch(error => console.error('Error deleting category:', error));
}
