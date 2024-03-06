import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  constructor(private callNumber: CallNumber) {}

  ngOnInit() {}
  hacerLlamada(): void {
    const phoneNumber = '+34646566660';
    this.callNumber
      .callNumber(phoneNumber, true)
      .then(() => console.log('Llamada iniciada'))
      .catch((error) => console.log('Error al iniciar la llamada', error));
  }
}
