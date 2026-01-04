import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cartservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, FormsModule,RouterLink], // Ajout de FormsModule pour ngModel
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Tableau des articles du panier
  isGift: boolean = false; // Option d'emballage cadeau
  hasApplePay: boolean = false; // Disponibilité Apple Pay

  constructor(private cartService: CartService,private router: Router,private location: Location) {}

  ngOnInit(): void {
    this.loadCart();
  }
  goBack() {
  this.location.back();
}
clearCart(): void {
  sessionStorage.removeItem('cartItems');
  sessionStorage.removeItem('subtotal');
}

  // Charge les articles du panier depuis le service
  loadCart(): void {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items.map(item => ({
          ...item,
                  image: item.image || item.image1 || '',  // ✅ ajoute image pour commande

          // Initialise la quantité à 1 si non définie
          quantity: item.quantity || 1,
          // Stock par défaut à 10 si non défini
          availableQuantity: item.availableQuantity || 10
        }));
      },
      error: (err) => console.error('Erreur lors du chargement du panier', err)
    });
  }

  // Augmente la quantité d'un article
  increaseQty(item: any): void {
    if (item.quantity < item.availableQuantity) {
      item.quantity++;
      this.updateCart(item);
    }
  }

  // Diminue la quantité d'un article
  decreaseQty(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart(item);
    }
  }

  // Supprime un article du panier
  removeItem(item: any): void {
    this.cartService.removeItem(item.id, item.size).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Erreur lors de la suppression', err)
    });
  }

  // Calcule le total du panier
  getTotal(): number {
    return this.cartItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0);
  }

  // Formate le prix selon la locale française
  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(price);
  }

  // Met à jour le panier côté serveur
  updateCart(item: any): void {
    // Implémentez la logique de mise à jour si nécessaire
    // this.cartService.updateItem(item).subscribe();
  }

  // Passe la commande
checkout(): void {
  const order = {
    items: this.cartItems,
    isGift: this.isGift,
    total: this.getTotal()
  };

  sessionStorage.setItem('subtotal', order.total.toString());
  sessionStorage.setItem('cartItems', JSON.stringify(order.items)); // ✅ ajoute ça

  this.router.navigate(['/checkout']);
}



  // Calcule le sous-total (peut être utile pour affichage détaillé)
  getSubtotal(): number {
    return this.getTotal(); // À adapter si vous avez des frais supplémentaires
  }
}