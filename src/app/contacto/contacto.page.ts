import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import * as L from 'leaflet';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  map: any;

  constructor(private callNumber: CallNumber) {}

  ngOnInit() {}
  hacerLlamada(): void {
    const phoneNumber = '+34646566660';
    this.callNumber
      .callNumber(phoneNumber, true)
      .then(() => console.log('Llamada iniciada'))
      .catch((error) => console.log('Error al iniciar la llamada', error));
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    console.log('Cargando el mapa...');

    let latitud = 36.6797047;
    let longitud = -5.4470656;
    let zoom = 17;
    this.map = L.map('mapId').setView([latitud, longitud], zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map
    );
  }
}
