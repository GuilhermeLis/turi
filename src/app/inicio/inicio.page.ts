import { Component, OnInit,ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonTabs, IonTabBar } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { AboutPage } from '../about/about.page';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = InicioPage;

  @ViewChild('myTabs') tabRef: IonTabs;

  constructor(
    public router: Router,
    private alertController: AlertController
  ) { 
    

    
  }

  ngOnInit() {
  }

}
