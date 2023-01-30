import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../shared/services/http.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PRODUCT_CONDITION_LIST, PRODUCT_FIELDS } from '../mock/products.mock';
import { ProductInterface } from '../shared/types/product.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form!: FormGroup;
  productConditionList: string[] = PRODUCT_CONDITION_LIST;
  actionBtn = "Сохранить";

  constructor(private fb: FormBuilder, private http: HttpService, 
    private dialogRef: MatDialogRef<DialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editData: ProductInterface) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  addProduct(): void {
    if (this.form.invalid) return;
    
    this.http.createData(this.form.value).subscribe({
      next: (res: any) => {
        console.log("Product has been added", res);
        this.form.reset();
        this.dialogRef.close("created");
      },
      error: (err: string) => {
        console.error(err);
      }
    });
  }

  updateProduct(): void {
    if (this.form.invalid) return;
    if (!this.editData?.key) return;

    this.http.updateData(this.form.value, this.editData.key).subscribe({
      next: (res: any) => {
        console.log("Product has been updated", res);
        this.form.reset();
        this.dialogRef.close("updated");
      },
      error: (err: string) => {
        console.error(err);
      }
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      category: ["", [Validators.required]],
      date: ["", [Validators.required]],
      productCondition: ["", [Validators.required]],
      price: ["", [Validators.required]],
      comment: ["", [Validators.required]],
    });
    
    this.initializeEditData();
  }

  private initializeEditData(): void {
    if (this.editData) {
      this.actionBtn = "Изменить";

      PRODUCT_FIELDS.forEach(name => this.form.controls[name].setValue(this.editData[name as keyof ProductInterface]));
    }
  }

}
