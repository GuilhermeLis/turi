import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Coordenada { latitude : number,
  longitude: number, name: string;}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoCollectionRef: AngularFirestoreCollection<Coordenada>;
  todo$: Observable<Coordenada[]>;

  lat: any;
  lng: any;
  name:string;
  showCard: boolean = false;
  showDiv: boolean = false;
  private place: Coordenada;
    
  constructor(public geo: Geolocation,public storage: AngularFirestore) {

    this.todoCollectionRef = this.storage.collection('places');
    this.todo$ = this.todoCollectionRef.valueChanges();

  }

  /* Encontra o lugar mais proximo */
  NearPlace(){
    this.locate();
    let distance: number = 10000000000000000000000000000000000000000000000000000000;
    let nDistance: number;
    this.todoCollectionRef.valueChanges().subscribe( dados=>{
      for(let i: number = 0; i < dados.length;i++){
        nDistance = Math.sqrt((this.lat - dados[i].latitude)**2 + (this.lng - dados[i].longitude)**2);
        if(distance > nDistance){
          distance = nDistance;
          this.place = dados[i];
        }
      }
    this.name = this.place.name;
    });
    //console.log(this.place);
    
  }

/* Função responsável por adivionar o dado ao firebase Cloud */
  addCoor(){
    this.todoCollectionRef.add({latitude: this.lat, longitude: this.lng, name: this.name})
    /*doc(this.name).set({latitude: this.lat, longitude: this.lng});*/
  }

  put (){
    this.todo$;
    
  }
/* Função responsável por pega a tual localização do dispositivo */
  locate(){
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
    }).catch( err => console.log(err));
  }
/* função responsável por mudar a tela*/
  changeShow(){
    if (this.showCard == true){
      this.showCard =false;
      this.showDiv = true;
    }else{
      this.showCard =true;
      this.showDiv = false;
    }
    
  }
}
