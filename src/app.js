// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need

import {
    getFirestore,
    addDoc,
    collection,
    getDocs,
    doc,
    deleteDoc,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBw3J6LSTRgaDUM8vyiE0vw1UHm-3NGj1c",
    authDomain: "blogapp-7cc2a.firebaseapp.com",
    projectId: "blogapp-7cc2a",
    storageBucket: "blogapp-7cc2a.appspot.com",
    messagingSenderId: "451207321182",
    appId: "1:451207321182:web:28b08465301fb09c2ac6cf",
    measurementId: "G-Z5T1JJMZTF"
};

// Initialize Firebase
initializeApp(firebaseConfig);


// Now you can use Firebase services like authentication and Firestore
const auth = getAuth();
const db = getFirestore();

// ------------- Signup ----------

let signup = document.querySelector('.signup')
if (signup) {
    signup.addEventListener('submit', async (e) => {
        e.preventDefault()
        let name = e.target.fullname.value
        let email = e.target.email.value
        let password = e.target.password.value


        if (!name || !email || !password) {
            alert('Please fill the fields first')
        }
        else {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    let userData = {
                        name,
                        email,
                        CreatedAt: Timestamp.fromDate(new Date())
                    }

                    await setDoc(doc(db, "users", user.uid), userData).then(()=>{
                        window.location.href = 'http://127.0.0.1:5500/dist/login.html'
                    });

               
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    if (errorCode) {
                        alert('Email already in use')
                    }

                });
        }
    })

}



// ---------- signup end ------------



// -------------Login Start------------

if (localStorage.token && localStorage.id) {
    window.location.href = 'http://127.0.0.1:5500/dist/index.html'
}

let loginform = document.querySelector('.login')
if (loginform) {
    loginform.addEventListener('submit', async (e) => {
        e.preventDefault()
        let email = e.target.email.value
        let password = e.target.password.value
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Logged in', user)
                localStorage.setItem('token', user.accessToken
                )
                localStorage.setItem('id', user.uid
                )

                if (localStorage.token && localStorage.id) {
                    window.location.href = 'http://127.0.0.1:5500/dist/index.html'
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('Cant find an account')
            });
    })
}
