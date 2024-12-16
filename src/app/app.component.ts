import { Component } from '@angular/core';

import {FormsModule} from '@angular/forms';

import {ProductsComponent} from './Page/products/products.component';


@Component({
  selector: 'app-root',
  imports: [

    FormsModule,

    ProductsComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebProject';
}
