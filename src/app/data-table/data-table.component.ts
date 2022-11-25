import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { StoreService } from '../shared/store.service';
import { DataTableItem } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSort) empTBSort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  dataSource: MatTableDataSource<any>;

  private storeServiceSubscription?: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'date', 'sensor', 'temperature', 'humidity'];

  pageSizes = [5, 10, 20];

  constructor(private storeservice: StoreService) {
  }

  ngAfterViewInit(): void {
    this.storeServiceSubscription = this.storeservice.dataHasUpdated.subscribe(() => {
      this.dataSource = new MatTableDataSource(this.storeservice.sensorenDaten);
      this.dataSource.sort = this.empTBSort;
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnDestroy(): void {
    this.storeServiceSubscription?.unsubscribe();
  }
}
