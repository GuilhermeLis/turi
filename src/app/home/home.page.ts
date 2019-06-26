import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

import { OnDestroy } from "@angular/core";
import { BackendService } from '../services/backend.service';
import { AuthService } from '../services/auth.service';
import { Toast } from '@ionic-native/toast/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { Network } from '@ionic-native/network';



export interface Coordenada {
  latitude: number,
  longitude: number,
  name: string,
  historia: string;
  url: string;
  lerMais: string;
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
  url: string;


  private subscription: Subscription;

  constructor(
    public geo: Geolocation,
    private storage: AngularFireStorage,
    private backendSvc: BackendService,
    private authSvc: AuthService,
    private toastController: ToastController,
    private alertController: AlertController) { }

  /* Encontra o lugar mais proximo */
  async  NearPlace() {
    Network.onDisconnect().subscribe(()=>{
      this.presentToast('É necessário que a internet do dispositivo esteja ligada') 
    })
    this.locate();
    var distance: number = 10000000000000000000000000000000000000000000000000000000;
    var nDistance: number;
    var place: Coordenada;

    const array = []


    // ---------------- Metodo com async/await ---------------- 
    const snap = await this.backendSvc.readAllPromise('places');
    snap.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() });
    });



    // ---------------- Metodo com observables ---------------- 
     this.subscription = this.backendSvc.readAllWithoutOrder('places').subscribe((dados: any) => {
    //   console.log('entrou');
    //   console.log(dados);
       dados.forEach( element => {
    //     console.log(Math.sqrt((this.lat - dados[i].latitude) ** 2 + (this.lng - dados[i].longitude) ** 2));
         nDistance = Math.sqrt((this.lat - element.latitude) ** 2 + (this.lng - element.longitude) ** 2);
         if (distance > nDistance) {
           distance = nDistance;
           place = element;
         }
       })

       this.nameLugar = place.name;
       this.histo = place.historia;
       this.url = place.lerMais;
       const ref = this.storage.ref(place.url);
       this.img = ref.getDownloadURL();

     });


  }



  put() {
    this.todo$;

  }
  /* Função responsável por pega a tual localização do dispositivo */
  locate() {
    this.geo.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;

    }).catch(err =>{ 
      
    this.presentToast('É necessário que a localização do dispositivo esteja ligada') 
    });
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

  async presentToast(text:string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }


}
