import { Component, OnInit,ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonTabs, IonTabBar } from '@ionic/angular';




@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild('myTabs') tabRef: IonTabs;

  constructor(
    public router: Router,
    private alertController: AlertController
  ) { 
    

    
  }


  change(name:string){
    this.router.navigate([name])
  }

  ngOnInit() {
  }

}
