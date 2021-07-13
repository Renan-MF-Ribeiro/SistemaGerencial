import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
    providedIn: 'root'
  })
export class Auth {
   

    auth(email: string, password: string){


        firebase.default.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed 
          var user = userCredential.user;
          console.log('teste')
          console.log(user)
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
}