import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SensorsDataComponent } from '../dashboard/sensors-data/sensors-data.component';
import { Sensorendata } from '../Sensorendata';
import { StoreService } from '../shared/store.service';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;

  listSensorendata!: Sensorendata[]
  //dataSource: DataTableDataSource;
  //dataSource: Sensorendata;
  dataSource: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'date', 'sensor', 'temperature'];

  constructor(private storeservice: StoreService) {
    //this.dataSource = new DataTableDataSource();
    //this.dataSource = Sensorendata();
    this.dataSource = storeservice.sensorenDaten;
  }

  /*
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.backendservice.getSensorenDaten().then(data=>{
      this.listSensorendata = data;
      this.
    }
       )
  }
  */




  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
