import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

import { OnDestroy } from "@angular/core";
import { BackendService } from '../services/backend.service';
import { AuthService } from '../services/auth.service';
import { ToastController, NavController, LoadingController } from '@ionic/angular';''
import { AlertController } from '@ionic/angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';


import { AndroidPermissions } from '@ionic-native/android-permissions';

import { Network } from '@ionic-native/network';

import { Diagnostic } from '@ionic-native/diagnostic';
import { Router } from '@angular/router';
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

//import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';






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
  tela: boolean = false;
  lat: any;
  lng: any;
  nameLugar: string;
  showCard: boolean = false;
  showDiv: boolean = false;
  histo: string;
  name: string;
  url: string;
  private interval: any;


  private subscription: Subscription;

  constructor(
    public router: Router,
    private geo: Geolocation,
    private storage: AngularFireStorage,
    private backendSvc: BackendService,
    private authSvc: AuthService,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    ) {
      this.NearPlace()
      const interval =  setInterval(()=>{
        this.NearPlace()
      },60000)
    }

  //------------------------Encontra o lugar mais proximo-----------------------------------------
  async  NearPlace() {
    this.Loading()
    this.locate();
    const maxDistance =  0.04
    var distance: number = 10000000000000000000000000000000000000000000000000000000;
    var nDistance: number;
    var distancePlace: number;
    var place: Coordenada;

    const array = []


    // ---------------- Pucha todos os itens do banco ---------------- 
    const snap = await this.backendSvc.readAllPromise('places');
    snap.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() });
    });



    // ---------------- Encontra o lugar mais próximo ---------------- 
     this.subscription = this.backendSvc.readAllWithoutOrder('places').subscribe((dados: any) => {

       dados.forEach( element => {
         //------------------------ Essa é a Fórmula de Haversine ----------------------------
         nDistance =6371 * Math.acos(
           Math.cos((Math.PI * (90-element.latitude))/180) * 
           Math.cos((Math.PI * (90-this.lat))/180)+
           Math.sin((Math.PI * (90-element.latitude))/180)*
           Math.sin((Math.PI * (90-this.lat))/180) *
           Math.cos((Math.PI * (this.lng - element.longitude))/180)
           );

         if (distance > nDistance) {
           distance = nDistance;
           place = element;
           distancePlace = nDistance;
         }
       })
       console.log(this.lat,this.lng)
       console.log(distancePlace,maxDistance)
       if (distancePlace < maxDistance){

        this.tela = true;
        this.nameLugar = place.name;
        this.histo = place.historia;
        this.url = place.lerMais;
        const ref = this.storage.ref(place.url);
        this.img = ref.getDownloadURL();

       }else{
        this.DHNP()
      }
     });


  }
  // -----------------Verifica se a o GPS está ligado--------------------
  veriLocation(){
    var is2 =   Diagnostic.locationMode.LOCATION_OFF

    Diagnostic.getLocationMode().then((state)=>{
      if (state == is2){
        this.caixaDialogo()        
      }
      
    }).catch(err =>{
    })

  }
  //-------------------------- Captura a atual localização do usuário-------------------------
   locate() {
     this.veriLocation()
   var promise = this.geo.getCurrentPosition().then(pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;

    }).catch(err => {
      this.alerta()
    });
  } 

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

//  async presentToast(text:string) {
//    const toast = await this.toastController.create({
//      message: text,
//      duration: 2000
//    });
//    toast.present();
//  }

//----------------------Notifica o usuário que o GPS não está ligado--------------------------------
 async caixaDialogo(){
    const confirm = await this.alertController.create({
       header: 'O GPS não está ligado',
       message: 'Para eu funcionar corretamente preciso que seu GPS esteja ligado',
       
       buttons: [

        {
          text:  'Sair ',
          handler:() => {
            clearInterval(this.interval)
           confirm.dismiss();
           this.router.navigate(['inicio'])
          }
        },

         {
           text: 'Ligar o GPS',
           handler: () => {
             LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
             //this.NearPlace()


           }
         }

         
       ],
       backdropDismiss: false
     });
     confirm.present();
  }

//--------Notifica que o aplicativo não tem permissão de pegar a localização do usuario-------------
async alerta(){
    const confirm = await this.alertController.create({
       header: 'Não consigo consultar sua localização',
       message: 'Para eu funcionar preciso da permissão para usar a sua Geolocalização',
       buttons: [

        {
          text:  'Sair ',
          handler:() => {
            clearInterval(this.interval)
           confirm.dismiss();
           this.router.navigate(['inicio'])
          }
        },

         {
           text: 'Conseder permissão',
           handler: () => {
             AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
             //this.NearPlace()


           }
         }

         
       ],
       backdropDismiss: false
     });
     confirm.present();
  }

//-------------- Caixa de dialogo que avisa o usuário que não há casarões próximos --------------------
async DHNP(){
    const confirm = await this.alertController.create({
       header: 'Nâo tem casarões próximos',
       message: 'Infelizmente não há um casarão no raio de 10 metros',
       buttons: [

        {
          text:  'Sair ',
          handler:() => {
            clearInterval(this.interval)
           confirm.dismiss();
           this.router.navigate(['inicio'])
          }
        },

         {
           text: 'Buscar novamente',
           handler: () => {
             this.NearPlace()


           }
         }

         
       ],
       backdropDismiss: false
     });
     confirm.present();
}

//------------------Faz a animação de loading-----------------------------
  async Loading (){
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Carregando...',
      duration: 3000
    });

    await loading.present()
  }



}
