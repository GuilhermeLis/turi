import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app'
import { environment } from 'src/environments/environment';

export interface Login { email: string; password: string; }

var confi : {
  apiKey: "AIzaSyBF-CdHNq_Ff8AepEJZ19ytSsAoWq3QH9A",
  authDomain: "turi-df39d.firebaseapp.com",
  databaseURL: "https://turi-df39d.firebaseio.com",
  projectId: "turi-df39d",
  storageBucket: "turi-df39d.appspot.com",
  messagingSenderId: "711506747450",
  appId: "1:711506747450:web:0db27583b3f98bc6"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticatedUser: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) { 
      //firebase.initializeApp(confi)
    }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  googleLogin(){}

  loginWithEmail(user: Login) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((result) => {

          this.authenticatedUser = true;
          this.showMenuEmitter.emit(true);
          this.router.navigate(['']);

        }).catch(err => {

          this.authenticatedUser = false;
          this.showMenuEmitter.emit(false);

          switch (err.code) {
            case 'auth/invalid-email': reject('E-mail inválido!');
            case 'auth/user-not-found': reject('Usuário não cadastrado!');
            case 'auth/wrong-password': reject('E-mail ou senha incorreta!');
            case 'auth/network-request-failed': reject('Sem conexão com a internet, por favor, verifique.');
            default: reject('Não conseguimos efetuar seu login, por favor, tente novamente!');
          }

        });
    });
  }


  userIsAuthenticated() {
    return this.authenticatedUser;
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.authenticatedUser = false;
      this.showMenuEmitter.emit(false);
      this.router.navigate(['/login']);
    });
  }
}
