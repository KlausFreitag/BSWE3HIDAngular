import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sensor } from '../Sensor';
import { Sensorendata } from '../Sensorendata';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public sensorenDaten = new BehaviorSubject<Sensorendata[]>([]);
  public sensoren = new BehaviorSubject<Sensor[]>([]);;

  constructor() { }
}
