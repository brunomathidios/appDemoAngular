import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = 'Products';
  products$: Observable<Product[]>;
  productsNumber$: Observable<number>;
  selectedProduct: Product;
  errorMessage: string;

  //paginatioin
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id)
  }

  constructor(private productService: ProductService,
              private router: Router) { 
    
  }

  ngOnInit(): void {
    this.products$ = this
                        .productService
                        .products$
                        .pipe(
                          catchError(
                            error => {
                              this.errorMessage = error;
                              return EMPTY;
                            }
                          )
                        );

    this.productsNumber$ = this
                            .products$
                            .pipe(
                              map(products => products.length)
                            );
    
  }

}