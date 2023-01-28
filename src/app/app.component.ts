import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog"
import { DialogComponent } from './dialog/dialog.component';
import { HttpService } from './shared/services/http.service';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilsService } from './shared/services/utils.service';
import { PRODUCT_COLUMS } from './mock/products.mock';
import { ProductInterface } from './shared/types/product.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dialog: MatDialog, private http: HttpService, private utils: UtilsService) {}

  displayedColumns: string[] = PRODUCT_COLUMS;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllData();
  }

  createProduct() {
    this.dialog.open(DialogComponent, {
      width: "40%"
    }).afterClosed()
      .subscribe({
        next: (res) => {
          if (res === "created") {
            this.getAllData();
          }
        },
        error: this.utils.errorHandler
      });
  }

  updateProduct(data: ProductInterface) {
    this.dialog.open(DialogComponent, {
      width: "40%",
      data
    }).afterClosed().subscribe({
      next: (res) => {
        if (res === "updated") {
          this.getAllData();
        }
      },
      error: this.utils.errorHandler
    });
  }

  deleteProduct(id: number) {
    this.http.deleteData(id).subscribe({
      next: (_) => {
        console.log("deleted successfuly");
        this.getAllData();
      },
      error: this.utils.errorHandler
    });
  }

  private getAllData(): void {
    this.http.readData().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: this.utils.errorHandler
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
