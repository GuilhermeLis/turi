import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import {AngularFireStorage} from '@angular/fire/storage'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

import { OnDestroy } from "@angular/core";


export interface Coordenada { 
  latitude : number,
  longitude: number,
  name: string,
  historia: string;
  url: string;
  }
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoCollectionRef: AngularFirestoreCollection<Coordenada>;
  todo$: Observable<Coordenada[]>;
  img: Observable<string>;
  des : boolean = true;
  tela : boolean = false;
  lat: any;
  lng: any;
  nameLugar:string;
  showCard: boolean = false;
  showDiv: boolean = false;
  histo : string;
  name : string;


  private subscription : Subscription ;
    
  constructor(
    public geo: Geolocation,
    private store: AngularFirestore,
    private storage: AngularFireStorage) {

    this.todoCollectionRef = this.store.collection('places');
    this.todo$ = this.todoCollectionRef.valueChanges();
  
    
    //this.store.upload('casarão','../assets/casarao_tech.jpg');

  }
  
 read(collectionName:string) {
    return this.store.collection(collectionName)
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log('reads');
          return { id, ...data }
        }))
      )
  }

  /* Encontra o lugar mais proximo */
  NearPlace(){
    this.locate();
    var distance: number = 10000000000000000000000000000000000000000000000000000000;
    var nDistance: number;
    var place: Coordenada;
//     var sub = this.todoCollectionRef.valueChanges()
    
    this.subscription = this.read('places').subscribe((dados)=>{
      console.log('entrou');
      console.log(dados);
      for(var i: number = 0; i < dados.length;i++){
        nDistance = Math.sqrt((this.lat - dados[i].latitude)**2 + (this.lng - dados[i].longitude)**2);
        if(distance > nDistance){
          distance = nDistance;
          place = dados[i];
        }
      }
      
    this.nameLugar = place.name;
    this.histo = place.historia;
    const ref = this.storage.ref(place.url);
    this.img = ref.getDownloadURL();

    });

    
  }

/* Função responsável por adivionar o dado ao firebase Cloud */
  addCoor(){
    this.todoCollectionRef.add({latitude: this.lat, longitude: this.lng, name: this.name, historia: '',url:''})
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

  start(){
    this.des = false;
    this.tela = true;
    this.NearPlace();
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
