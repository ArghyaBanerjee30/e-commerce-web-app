import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cartService.getCartList().subscribe(
      data => {
        this.cartItems = data;
        this.totalPrice = this.getTotalPrice();
    });
  }

  getTotalPrice(): number {
    let total = 0;
    for(let item of this.cartItems) {
      total += item.price;
    }

    return total;
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.snackbar.open("Cart is clear", "", {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    });
  }
}
