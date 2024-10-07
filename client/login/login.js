import mysql from 'mysql';
import express from 'express';
import session  from 'express-session';
import path from 'path';




// const connection = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	password : '',
// 	database : 'nodelogin'
// });



let file;
let formData;




// script.js


function Delete() {
    alert("DELETE button clicked!");
}
function Get() {
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

            // // הצגת הנתונים ב-HTML
            // const equipmentList = document.getElementById('equipmentList');
            // equipmentList.innerHTML = ''; // לנקות את הרשימה לפני הוספה
            gallery.innerHTML = '';

            // const container = document.getElementById('devices-container');
            equipmentArray.forEach(device => {
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
                gallery.appendChild(imageContainer);
            });

        } catch (error) {
            console.error('Error fetching equipment data:', error);
        }
    });
}




    // הוספת  משתמש
	function Post() {   
		document.getElementById('fetchDataBtn').addEventListener('click', async () => {
		let newUser={};
		
		["t_z","name","phone","gmail","password","adress","birthday", "status"].forEach(fields=>{
			newUser[fields]=`request.body.${fields}`;
		})

		try {

			const response = await fetch('http://localhost:3000/fitness_equipment', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: newUser
				});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}


				// קבלת התגובה מהשרת
			const result = await response.json();
			console.log('Added device:', result);

		} catch (error) {
			console.error('Error adding device:', error);
			alert('Failed to add user.'); // הצגת הודעת שגיאה למשתמש
		}

	
}





document.getElementById('device-image').addEventListener('change', async (event) => {
    file = event.target.files[0];

    if (file) {
        
        const newName = encodeURIComponent(document.getElementById('image-name').value) || file.name;
        const blob = new Blob([file], { type: file.type });
        const newFile = new File([blob], newName, { type: file.type }); 
        console.log(newName);
        const formData = new FormData();
        formData.append('image', newFile);
        formData.append('newName', newName);

        

        
    }
});



document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/fitness_equipment')
        .then(response => response.json())
        .then(devices => {
           
        })
        .catch(error => console.error('Error fetching devices:', error));
});

//------------------------------------------------------------

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	let adress =request.body.adress;
	let birthday=request.body.birthday;
	let status=request.body.status;
	let
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);