import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SensorsDataComponent } from '../dashboard/sensors-data/sensors-data.component';
import { Sensorendata } from '../Sensorendata';
import { StoreService } from '../shared/store.service';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { BackendService } from '../shared/backend.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;

  //dataSource: DataTableDataSource;
  dataSource: any;
  subscription!: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'date', 'sensor', 'temperature', 'humidity'];

  constructor(private storeservice: StoreService) {
    //this.dataSource = new DataTableDataSource();
    //this.dataSource = Sensorendata();
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.subscription = this.storeservice.sensorenDaten.subscribe(data => {
      this.table.dataSource = data;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
