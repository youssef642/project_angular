import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ProductService } from "../../core/services/product.service";
import { Product } from "../../shared/models/product.model";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    LoadingSpinnerComponent,
  ],
})
export class HomeComponent implements OnInit {
  products: Observable<Product[]>;
  categories: string[] = [];
  selectedCategory: string = "";
  searchTerm: string = "";
  isLoading: boolean = true;

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.products = this.productService.getProducts();
    this.products.subscribe((products) => {
      this.categories = [...new Set(products.map((p) => p.category))];
      this.isLoading = false;
    });
  }

  filterByCategory(category: string): void {
    this.isLoading = true;
    this.selectedCategory = category;

    if (category) {
      this.products = this.productService.getProductsByCategory(category);
    } else {
      this.products = this.productService.getProducts();
    }

    this.products.subscribe(() => {
      this.isLoading = false;
    });
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.isLoading = true;
      this.products = this.productService.searchProducts(this.searchTerm);
      this.products.subscribe(() => {
        this.isLoading = false;
      });
    } else {
      this.loadProducts();
    }
  }
}
