import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

import { OnDestroy } from "@angular/core";
import { BackendService } from '../services/backend.service';
import { AuthService } from '../services/auth.service';


export interface Coordenada {
  latitude: number,
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
  des: boolean = true;
  tela: boolean = false;
  lat: any;
  lng: any;
  nameLugar: string;
  showCard: boolean = false;
  showDiv: boolean = false;
  histo: string;
  name: string;


  private subscription: Subscription;

  constructor(
    public geo: Geolocation,
    // private store: AngularFirestore,
    private storage: AngularFireStorage,
    private backendSvc: BackendService,
    private authSvc: AuthService) {

    // this.todoCollectionRef = this.store.collection('places');
    // this.todo$ = this.todoCollectionRef.valueChanges();


    //this.store.upload('casarão','../assets/casarao_tech.jpg');

  }

  /* Encontra o lugar mais proximo */
  async  NearPlace() {
    this.locate();
    var distance: number = 10000000000000000000000000000000000000000000000000000000;
    var nDistance: number;
    var place: Coordenada;
    //     var sub = this.todoCollectionRef.valueChanges()

    const array = []


    // ---------------- Metodo com async/await ---------------- 
    const snap = await this.backendSvc.readAllPromise('places');
    snap.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      array.push({ id: doc.id, ...doc.data() });
    });

    console.log(array);

    // ---------------- Metodo com then ---------------- 
    // this.backendSvc.readAllPromise('places').then((snapshot: any) => {
    //   console.log('entrou')
    //   snapshot.forEach((doc) => {
    //     console.log(doc.id, '=>', doc.data());
    //   });
    // });


    // ---------------- Metodo com observables ---------------- 
    // this.subscription = this.backendSvc.readAllWithoutOrder('places').subscribe((dados: any) => {
    //   console.log('entrou');
    //   console.log(dados);
    //   for (var i: number = 0; i < dados.length; i++) {
    //     console.log(Math.sqrt((this.lat - dados[i].latitude) ** 2 + (this.lng - dados[i].longitude) ** 2));
    //     nDistance = Math.sqrt((this.lat - dados[i].latitude) ** 2 + (this.lng - dados[i].longitude) ** 2);
    //     if (distance > nDistance) {
    //       distance = nDistance;
    //       place = dados[i];
    //     }
    //   }

    //   console.log(distance);
    //   console.log(place);
    //   // this.nameLugar = place.name;
    //   // this.histo = place.historia;
    //   // const ref = this.storage.ref(place.url);
    //   // this.img = ref.getDownloadURL();

    // });


  }

  /* Função responsável por adivionar o dado ao firebase Cloud */
  async addCoor() {

    // workarround -> this.name is undefined
    this.name = 'Teste';

    const data = { latitude: this.lat, longitude: this.lng, name: this.name, historia: '', url: '' };
    console.log(data);

    // const user = await this.authSvc.getCurrentUser();
    // if (user && user.uid)
    //   console.log('Pode enviar os dados com o uid de quem está logado');

    return this.backendSvc.add('places', data, 'um-uid-qualquer')
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));

    /*doc(this.name).set({latitude: this.lat, longitude: this.lng});*/
  }

  put() {
    this.todo$;

  }
  /* Função responsável por pega a tual localização do dispositivo */
  locate() {
    this.geo.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;

      console.log(this.lat);
      console.log(this.lng);

    }).catch(err => console.log(err));
  }
  /* função responsável por mudar a tela*/
  changeShow() {
    if (this.showCard == true) {
      this.showCard = false;
      this.showDiv = true;
    } else {
      this.showCard = true;
      this.showDiv = false;
    }

  }

  start() {
    this.des = false;
    this.tela = true;
    this.NearPlace();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
