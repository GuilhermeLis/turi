import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {path:'',redirectTo:'inicio',pathMatch:'full'},
      { path: 'inicio', loadChildren: '../inicio/inicio.module#InicioPageModule' },
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'about', loadChildren: '../about/about.module#AboutPageModule' }
  ] 
  },  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
