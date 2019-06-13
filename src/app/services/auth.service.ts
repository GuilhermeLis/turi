import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app'

export interface Login { email: string; password: string; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticatedUser: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) { }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

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
