

document.getElementById('signInBtn').addEventListener('click', () => {
    document.getElementById('signInForm').style.display = 'block';
    document.getElementById('signUpForm').style.display = 'none';
});
document.getElementById('signUpBtn').addEventListener('click', () => {
    document.getElementById('signUpForm').style.display = 'block';
    document.getElementById('signInForm').style.display = 'none';
});
// פונקציה להצגת והסתרת הסיסמה
function togglePassword(id) {
    const passwordInput = document.getElementById(id);
    const icon = passwordInput.nextElementSibling.querySelector('i');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}
function addUser(event) {
    event.preventDefault();

    const newUser = {
        t_z: document.getElementById('t_z').value,
        name: document.getElementById('username').value,
        phone: document.getElementById('phone').value,
        gmail: document.getElementById('gmail').value,
        password: document.getElementById('passwordSignUp').value,
        adress: document.getElementById('adress').value,
        birthday: document.getElementById('birthday').value,
        status: document.getElementById('status').value
    };
	console.log(newUser);
    // בדיקת שדות - שינוי הלולאה למעבר על מפתחות האובייקט
    for (const field in newUser) {
        if (!newUser[field]) {
            alert('יש למלא את כל השדות!');
            return; // עצירה במקרה של שדה ריק
        }
    }

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
       
    })
    .catch(error => console.error('Error adding user:', error));
}

function findUser(event){
	event.preventDefault();
	fetch(`http://localhost:3000/users/${event.t_z}`, {
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









