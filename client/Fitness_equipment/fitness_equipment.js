import express from 'express';
import sql from 'mssql';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import { User } from  "../controller/users.js";
const app = express();
const port = 3000;


//פונקציה להוספת תמונות מכשירי הכושר השמורים בטבלה ב sql
//מיד עם טעינת העמוד
function loadPage()
{
       // שלב 1: יצירת אלמנט div
    let myDivFather = document.createElement('div');
    myDivFather.className='gallery';
      //קריאה לתוכן הטבלה
    const userController = new User();
    const allusers=userController.getAll();
    for (const key in allusers) {
       add_fitness_equipment(key.name);
    }

    
}


//פונקציה להוספת מכשיר כושר לדף
function add_fitness_equipment(routing) {

    // שלב 2: יצירת אלמנטים כילדים

    const myDiv = document.createElement('div');
    myDiv.className='gallery-item';

    const a1 = document.createElement('a');
    a1.href='treadmill.html';

    const image1 = document.createElement('img');
    myDiv.className='image1';
    image1.src=`../public/images/${routing}`;
    image1.alt=routing;

    const p1 = document.createElement('p');
    p1.textContent=routing;

    // שלב 3: הוספת הכפתורים ל-div

    myDivFather.appendChild(myDiv);
    myDiv.appendChild(a1);
    a1.appendChild(image1);
    a1.appendChild(p1);

    // שלב 4: הוספת ה-div ל-body

    document.body.appendChild(myDivFather);
}

loadPage();























