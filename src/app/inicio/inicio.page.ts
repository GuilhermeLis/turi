import { Component, OnInit,ViewChild  } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(
    public router: Router
  ) { 
    
  }

  

  change(){
    this.router.navigate(['home'])
  }

  ngOnInit() {
  }

}
