


document.addEventListener('DOMContentLoaded', function () {
    // הוספת תמונה
    document.getElementById('upload-image-button').addEventListener('click', () => {
        const fileInput = document.getElementById('image-input');
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('image', file);

        fetch('../public/images', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // עדכן את רשימת התמונות אם ההעלאה הצליחה
                fetchImages();
            } else {
                console.error('Error uploading image:', response.statusText);
            }
        });
    });

    // פונקציה לשליפת תמונות
    function fetchImages() {
        fetch('../public/images')
            .then(response => response.json())
            .then(images => {
                const imagesList = document.getElementById('images-list');
                imagesList.innerHTML = '';
                images.forEach(image => {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>תמונה:</strong> ${image.שם_תמונה}`;
                    imagesList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching images:', error));
    }

    // קריאת הפונקציה לשליפת התמונות
    fetchImages();
});

