import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatSort) sort!: MatSort;
  @ViewChild('empTBSort') empTBSort = new MatSort();

  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  @ViewChild('paginator') paginator : MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize : MatPaginator;

  //dataSource: DataTableDataSource;
  //dataSource: any;
  //dataSource: MatTableDataSource<any>;
  dataSource = new MatTableDataSource(this.storeservice.sensorenDaten);
  dataSourceWithPageSize = new MatTableDataSource(this.storeservice.sensorenDaten);

  private storeServiceSubscription?: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'date', 'sensor', 'temperature', 'humidity'];

  //constructor() {}
  
  constructor(private storeservice: StoreService) {
    //this.dataSource = new DataTableDataSource();
    //this.dataSource = Sensorendata();
    //this.dataSource = storeservice.sensorenDaten;
    this.dataSource = new MatTableDataSource(this.storeservice.sensorenDaten);
  }
  pageSizes = [5, 10, 20];

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.storeservice.sensorenDaten);
    //this.dataSource.sort = this.sort;
    this.dataSource.sort = this.empTBSort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.storeservice.sensorenDaten;
    this.storeServiceSubscription = this.storeservice.dataHasUpdated.subscribe(() => {
      this.table.dataSource = this.storeservice.sensorenDaten;
    })
  }

  ngOnDestroy(): void {
    this.storeServiceSubscription?.unsubscribe();
  }
}
