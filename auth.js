
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"; 
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC9bYZno33reps-a0iorttht_OMjpsjy2o",
    authDomain: "login-test-4f7cd.firebaseapp.com",
    projectId: "login-test-4f7cd",
    storageBucket: "login-test-4f7cd.appspot.com",
    messagingSenderId: "767596281646",
    appId: "1:767596281646:web:5e1de8e8a80090021584bf"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)


   document.getElementById('signUp-form')
   .addEventListener('submit', (e) => {
      e.preventDefault();

      let fullName = document.getElementById('full_name').value
      let emailLogin = document.getElementById('email_login').value
      let passwordLogin = document.getElementById('password_login').value   
      

      // Form Authentication
      if(fullName.trim() === '' || emailLogin.trim() === '' || passwordLogin.trim() === ''){
         swal({
          text: 'All Inputs Field are required',
          icon: 'warning'
         })
      }
       else if(passwordLogin.length < 6)
      {
        // Popout this if the password length is less than six
        swal({
          text: 'Password must be atleast 6',
          icon: 'warning'
        })
      } 
      else 
      {
        createUserWithEmailAndPassword(auth, emailLogin, passwordLogin)
      .then((userCredential) => {

        if(userCredential){
          swal({
            title: 'Good Job',
            text: 'Account created successfully',
            icon: 'success'
          })
           .then(value => {
            if(value){
               window.location.replace('login.html')
            }
           })

           
          // Set the Display Name for the user if the User Credentials
          // Is true
            const user = userCredential.user

            if(user){
              updateProfile(user, {
                displayName: `${fullName}`
              })
        }
        }
        
        
      }).catch((err) => {
              if (err.code === 'auth/email-already-in-use') {
              swal({
                title: 'Error',
                text: 'The email address is already in use',
                icon: 'error'
              });
            } else if (err.code === 'auth/invalid-email') {
              swal({
                title: 'Error',
                text: 'Invalid email address',
                icon: 'error'
              });
            } else {
              swal({
                title: 'Error',
                text: `${err.message}`,
                icon: 'error'
              });
            }
      })
      }
     
   })