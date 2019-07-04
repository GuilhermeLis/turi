import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreloadAllModules,Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  
  {
    
    path: '',
    component: InicioPage
  }
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    //RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
