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

    let zoom = 17;

    let latEmpresaPrac = 36.67874440726268;
    let lonEmpresaPrac = -5.450390155484502;
    this.map = L.map('mapId').setView([latEmpresaPrac, lonEmpresaPrac], zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map
    );

    //Definiimos la ubicación del marcador para la empresa
    let markerLocationEmpresaprac = L.latLng(latEmpresaPrac, lonEmpresaPrac);

    //Añadimos el marcador al mapa
    let marker1 = L.marker(markerLocationEmpresaprac, {
      alt: 'Ubicación de la empresa',
    }).addTo(this.map);

    let latitudIes = 36.6797047;
    let longitudIes = -5.4470656;
    
    // Definimos la ubicación del marcador
    let markerLocationIes = L.latLng(latitudIes, longitudIes);

    //Añadimos el marcador al mapa
    let marker2 = L.marker(markerLocationIes, {
      alt: 'Ubicación del instituto',
    }).addTo(this.map);

    //Hacemos un Popup para este marcador
    marker1
      .bindPopup(
        '<b>I.Piñavall SL</b><br>A lo mejor termino haciendo las prácticas aquí.'
      )
      .openPopup();

    //Hacemos un Popup para este marcador
    marker2
      .bindPopup('<b>I.E.S Los Remedios</b><br>Aquí he estudiado.')
      .openPopup();
  }
}
