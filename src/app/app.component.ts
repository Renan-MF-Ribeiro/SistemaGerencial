import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Sistema Gerencial';

  ngOnInit(){
    
    var config = {
      apiKey: "AIzaSyDdGmsdK395L5P8EiBRa0MjWXkE6a-qL-0",
      authDomain: "sistema-gerencial-815ca.firebaseapp.com",
      databaseURL: "https://sistema-gerencial-815ca-default-rtdb.firebaseio.com",
      projectId: "sistema-gerencial-815ca",
      storageBucket: "sistema-gerencial-815ca.appspot.com",
      messagingSenderId: "756084260743",
      appId: "1:756084260743:web:70433335a31254bd351d22",
      measurementId: "G-QBBZ9TY7W2"
    };

    
    firebase.default.initializeApp(config)
  }
}