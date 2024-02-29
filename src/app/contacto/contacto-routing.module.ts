import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactoPage } from './contacto.page';

const routes: Routes = [
  {
    path: '',
    component: ContactoPage,
  },
  {
    path: 'home',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactoPageRoutingModule {}
