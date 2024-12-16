
import {APIResponceModel, Category, ProductList} from '../../Model/product';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {


  // productList: ProductList [] = [];

  productList = signal<ProductList []>([]);

  categeoryList$: Observable<Category[]> = new Observable<Category[]>();
  subscriptionList: Subscription[]= [];


  masterService =  inject(MasterService);



  constructor() {

  }

  ngOnInit(): void {
    this.loadAllProducts();
    this.categeoryList$ =  this.masterService.getAllCategory().pipe(
      map(item=> item.data)
    )
  }



  loadAllProducts() {
    this.subscriptionList.push(this.masterService.getAllProducts().subscribe((res:APIResponceModel)=>{
      this.productList.set(res.data);
    }))
  }



  ngOnDestroy(): void {
    this.subscriptionList.forEach(element => {
      element.unsubscribe();
    });
  }

}
