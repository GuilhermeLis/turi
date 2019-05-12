import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Todo { latitude : any,
                        longetude: any;}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoCollectionRef: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;

  item : any;

  name:string;
  lat: any;
  lng: any;
  constructor(public geo: Geolocation, public storage: AngularFirestore) {
    this.todoCollectionRef = this.storage.collection('places');
    this.todo$ = this.todoCollectionRef.valueChanges();
  }

  addCoor(){
    this.todoCollectionRef.doc(this.name).set({latitude: this.lat, longitude: this.lng});
  }

  pegar(){


  }

  locate(){
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      //this.uploadfile(pos);
    }).catch( err => console.log(err));
  }

}
