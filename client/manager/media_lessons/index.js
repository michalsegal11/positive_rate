let file;
let formData;
let isCloseButtonListenerAdded = false; // משתנה למעקב אחרי פונקציה לכפתור הסגירה
let equipmentArrayIn = []; // אתחול המערך
let imageContainerIn; // משתנה לאחסון אלמנט תמונות
fetchEquipmentData();
// מאזינים ללחיצה על כפתורים
document.getElementById('add-device').addEventListener('click', Post);
document.getElementById('fetchDataBtn').addEventListener('click', Get);
function Get() {
    const gallerySection = document.getElementById('gallery');
    let closeButton = document.getElementById('close-gallery-btn');

    // שליחת בקשה לשרת לקבלת הנתונים
    fetch('http://localhost:3000/medial_lessons', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        equipmentArrayIn = data.recordset; // שמירת המידע למשתנה

        if (!Array.isArray(equipmentArrayIn)) {
            throw new Error('Data is not an array');
        }

        // מנקים את הגלריה
        gallerySection.innerHTML = '';

        // מציגים את התמונות ב-layout
        equipmentArrayIn.forEach(device => {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            const img = document.createElement('img');
            img.src = `../public/images/${device.name}.png`;
            img.alt = device.about;

            const imageName = document.createElement('div');
            imageName.classList.add('image-name');
            imageName.textContent = device.name;

            imageContainer.appendChild(img);
            imageContainer.appendChild(imageName);
            gallerySection.appendChild(imageContainer);

            // מאזין לאירוע לחיצה להצגת פרטי המכשיר
            imageContainer.addEventListener('click', () => showDeviceDetails(device));
        });

        gallerySection.style.display = 'flex'; // עיצוב Flexbox
        gallerySection.style.flexWrap = 'wrap'; // שורות מרובות

        if (!closeButton) {
            closeButton = document.createElement('button');
            closeButton.id = 'close-gallery-btn';
            closeButton.className = 'close-button1';
            closeButton.textContent = 'סגור גלריה';
            gallerySection.after(closeButton);
        }

        if (!isCloseButtonListenerAdded) {
            closeButton.addEventListener('click', () => {
                gallerySection.style.display = 'none';
                closeButton.style.display = 'none';
            });
            isCloseButtonListenerAdded = true;
        }

        closeButton.style.display = 'block';
    })
    .catch(error => {
        console.error('Error fetching equipment data:', error);
    });
}
function Post() {
    let addFormSection = document.getElementById('add-form');
    const gallerySection = document.getElementById('gallery');
    let closeButton = document.getElementById('close-gallery-btn');
    if (closeButton)
        closeButton.style.display = 'none';
    gallerySection.innerHTML = '';

    if (!addFormSection) {
        const div = document.querySelector('main');
        addFormSection = document.createElement('section');
        addFormSection.id = 'add-form';
        addFormSection.style.display = 'block';

        const formTitle = document.createElement('h2');
        formTitle.textContent = 'הוספת מכשיר כושר';

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = 'device-image';
        fileInput.accept = 'image/*';
        fileInput.required = true;

        const imageNameInput = document.createElement('input');
        imageNameInput.type = 'text';
        imageNameInput.id = 'image-name';
        imageNameInput.placeholder = 'Enter new image name';

        const deviceInfoInput = document.createElement('input');
        deviceInfoInput.type = 'text';
        deviceInfoInput.id = 'device-info';
        deviceInfoInput.placeholder = 'מידע אודות המכשיר';
        deviceInfoInput.required = true;

        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.textContent = 'סגור';
        closeButton.onclick = () => addFormSection.style.display = 'none';

        const addButton = document.createElement('button');
        addButton.className = 'device-button';
        addButton.id = 'add-device-button';
        addButton.textContent = 'הוסף מכשיר';

        addFormSection.appendChild(formTitle);
        addFormSection.appendChild(fileInput);
        addFormSection.appendChild(imageNameInput);
        addFormSection.appendChild(deviceInfoInput);
        addFormSection.appendChild(addButton);
        addFormSection.appendChild(closeButton);

        div.appendChild(addFormSection);

        addAll(); // מאזין להוספת מכשיר
        addImage(); // מאזין לטעינת תמונה
    } else {
        addFormSection.style.display = 'block';
    }
}
function fetchEquipmentData() {
    fetch('http://localhost:3000/medial_lessons', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        equipmentArrayIn = data.recordset;
    document.getElementById('delete').addEventListener('click', DELETE);
    document.getElementById('put').addEventListener('click', displayEquipment);
    })
    .catch(error => {
        console.error('Error fetching equipment data:', error);
    });
}
function displayEquipment() {
    const gallerySection = document.getElementById('gallery');
    gallerySection.innerHTML = ''; // ניקוי גלריה
    gallerySection.style.display='flex';
    equipmentArrayIn.forEach(device => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = `../public/images/${device.name}.png`;
        img.alt = device.about;

        const imageName = document.createElement('div');
        imageName.classList.add('image-name');
        imageName.textContent = device.name;

        imageContainer.appendChild(img);
        imageContainer.appendChild(imageName);
        gallerySection.appendChild(imageContainer);

        imageContainer.addEventListener('click', () => showDeviceDetails(device));
    });
}
function showDeviceDetails(device) {
    const detailsSection = document.getElementById('device-details');
    detailsSection.innerHTML = ''; // מנקים פרטים קודמים

    const closeButton = document.createElement('button');
    closeButton.id = 'close-button2';
    closeButton.innerHTML = '←';
    closeButton.addEventListener('click', () => {
        detailsSection.classList.add('hidden');
        detailsSection.style.display = 'none';
    });

    const deviceName = document.createElement('h2');
    deviceName.id = 'device-name';
    deviceName.textContent = device.name;

    const deviceInfo = document.createElement('p');
    deviceInfo.id = 'device-info';
    deviceInfo.textContent = device.about;

    const input = document.createElement('input');
    input.id = 'device-input';
    input.type = 'text';
    input.value = device.about;

    const saveButton = document.createElement('button');
    saveButton.id = 'save-button';
    saveButton.textContent = 'שמור';
    saveButton.addEventListener('click', () => {
        device.about = input.value;
        alert('פרטי מכשיר שונו!');
    });

    detailsSection.appendChild(closeButton);
    detailsSection.appendChild(deviceName);
    detailsSection.appendChild(deviceInfo);
    detailsSection.appendChild(input);
    detailsSection.appendChild(saveButton);

    detailsSection.classList.remove('hidden');
    detailsSection.style.display = 'block';
}
function addAll() {
    document.getElementById('add-device-button').addEventListener('click', async () => {
        const name = document.getElementById('image-name').value;
        const info = document.getElementById('device-info').value;
        if (!name || !info || !file) {
            alert('נא למלא את כל השדות');
            return;
        }
        try {
            await fetch('http://localhost:3000/upload-videos', {
                method: 'POST',
                body: formData,
            });

            const response = await fetch('http://localhost:3000/medial_lessons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, about: info }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert('Device added successfully!');
        } catch (error) {
            console.error('Error adding device:', error);
            alert('Failed to add device.');
        }
    });
}
function addImage() {
    document.getElementById('device-image').addEventListener('change', async (event) => {
        file = event.target.files[0];
        if (file) {
            const newName = encodeURIComponent(document.getElementById('image-name').value) || file.name;
            const blob = new Blob([file], { type: file.type });
            const newFile = new File([blob], newName, { type: file.type });
            const formData = new FormData();
            formData.append('image', newFile);
            formData.append('newName', newName);
        }
    });
}
function DELETE() {
    const gallerySection = document.getElementById('gallery');
    gallerySection.innerHTML = ''; // ניקוי גלריה
    gallerySection.style.display='flex';
    equipmentArrayIn.forEach(device => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = `../public/images/${device.name}.png`;
        img.alt = device.about;

        const imageName = document.createElement('div');
        imageName.classList.add('image-name');
        imageName.textContent = device.name;

        imageContainer.appendChild(img);
        imageContainer.appendChild(imageName);
        gallerySection.appendChild(imageContainer);

        imageContainer.addEventListener('click', () => confirmDelete(device));
    });

}
function confirmDelete(device) {
    const confirmationModal = document.createElement('div');
    confirmationModal.classList.add('confirmation-modal');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const message = document.createElement('p');
    message.textContent = 'האם אתה בטוח שאתה רוצה למחוק?';

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'אשר';
    confirmButton.addEventListener('click', async () => {
        try {
            await fetch(`http://localhost:3000/medial_lessons/${device.code}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({code_fitness:device.code_fitness, name:device.name, about: device.about }),
            });
    
            // בודקים שהבקשה הצליחה
            if (response.ok) {
                alert('מכשיר נמחק בהצלחה!');
                confirmationModal.remove();
                Get(); // מרענן את הגלריה
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error deleting device:', error);
            alert('Failed to delete device.');
        }
        });
    
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'בטל';
        cancelButton.addEventListener('click', () => {
            confirmationModal.remove();
        });
    
        modalContent.appendChild(message);
        modalContent.appendChild(confirmButton);
        modalContent.appendChild(cancelButton);
        confirmationModal.appendChild(modalContent);
        document.body.appendChild(confirmationModal);
}

    
   