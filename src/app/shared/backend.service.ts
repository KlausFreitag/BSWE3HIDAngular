import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { Sensor } from '../Sensor';
import { Sensorendata } from '../Sensorendata';
import { SensorendataResponse } from '../SensorendataResponse';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private storeService: StoreService, private http: HttpClient) { }

  public getSensoren() {
    this.http.get<Sensor[]>('http://localhost:5000/sensors').subscribe(data => this.storeService.sensoren.next(data));
  }

  public getSensorenDaten() {
    forkJoin(
      this.http.get<SensorendataResponse[]>(`http://localhost:5000/sensorsData`),
      this.http.get<Sensor[]>('http://localhost:5000/sensors')
    ).subscribe(([sensorenDataResponse, sensoren]) => {
      const sensorenData: Sensorendata[]= sensorenDataResponse.map(data => {
        const sensor: Sensor = sensoren.filter(sensor => sensor.id == data.sensorId)[0];
        return { ...data, sensor }
      });
      this.storeService.sensorenDaten.next(sensorenData);
    })
  }

  public async addSensorsData(sensorenData: Sensorendata[]) {
    await firstValueFrom(this.http.post('http://localhost:5000/sensorsData', sensorenData));
    this.getSensorenDaten();
  }

  public async deleteSensorsDaten(sensorId: number) {
    await firstValueFrom(this.http.delete(`http://localhost:5000/sensorsData/${sensorId}`));
    this.getSensorenDaten();
  }
}
