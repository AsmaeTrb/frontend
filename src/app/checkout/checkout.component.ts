// ✅ checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/authservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  email: string = '';
  showError: boolean = false;
  isLoading: boolean = false;
  subtotal: number = 0;
  cartItems: any[] = [];
  isSummaryOpen: boolean = false;
  shippingCost: number = 0;

  step: 'email' | 'verify' | 'form' = 'email'; // valeur temporaire

code: string = '';
serverCode: string = ''; 

  countries = [
    { name: 'United States', code: '+1' },
    { name: 'France', code: '+33' },
    { name: 'Morocco', code: '+212' },
    { name: 'Germany', code: '+49' },
    { name: 'Italy', code: '+39' },
    { name: 'Spain', code: '+34' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Canada', code: '+1' },
    { name: 'Belgium', code: '+32' }
  ];
  selectedCountry: string = '';
  selectedCountryCode: string = '+1';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

ngOnInit(): void {
  const items = sessionStorage.getItem('cartItems');
  this.cartItems = items ? JSON.parse(items) : [];
  this.subtotal = Number(sessionStorage.getItem('subtotal')) || 0;

  if (this.isGuest()) {
    this.step = 'email';
  } else {
    this.email = sessionStorage.getItem('email') || '';
    this.step = 'form';
  }
    const savedCountry = sessionStorage.getItem('selectedCountry');
  if (savedCountry) {
    this.selectedCountry = savedCountry;
    this.updateShippingCost(); // 👈 Très important ici
  }
}



  isGuest(): boolean {
    return !this.authService.isConnectedSubject.value;
  }

  onCountryChange(event: any): void {
  const selected = this.countries.find(c => c.name === this.selectedCountry);
    this.selectedCountry = selected?.name || '';
    this.selectedCountryCode = selected?.code || '';
      this.updateShippingCost(); // 🆕
        sessionStorage.setItem('selectedCountry', this.selectedCountry);


  }
onContinue(): void {
  if (!this.validateEmail(this.email)) {
    this.showError = true;
    return;
  }

  this.isLoading = true;
  this.http.post<{ code: string }>('/api/send-email', { email: this.email }).subscribe({
    next: (res) => {
      this.serverCode = res.code; // ⚠️ Seulement si backend renvoie le code pour test
      this.step = 'verify';
      this.isLoading = false;
    },
    error: () => {
      this.isLoading = false;
      alert('Erreur : email non envoyé ❌');
    }
  });
}
verifyCode(): void {
  this.http.post<{ verified: boolean }>('/api/verify-code', {
    email: this.email,
    code: this.code
  }).subscribe({
    next: (res) => {
      if (res.verified) {
        // ✅ Extraire un nom à partir de l’e-mail
        const name = this.email.split('@')[0];
        const displayName = name.charAt(0).toUpperCase() + name.slice(1);

        // ✅ Enregistrer la session
        this.authService.setSession(this.email, displayName);

        // ✅ Passer à l'étape suivante
        this.step = 'form';
      } else {
        alert('❌ Code incorrect');
      }
    },
    error: () => alert('❌ Vérification impossible')
  });
}


  validateEmail(email: string): boolean {
    return /^\S+@\S+\.\S+$/.test(email);
  }
submitShipping(): void {
  this.isLoading = true;

   const order = {
    email: this.email,
    items: this.cartItems.map(item => ({
      id: item.id,
      size: item.size,
      quantity: item.quantity
    })),
    total: this.subtotal,
    isGift: false
  };

  this.http.post('/api/orders', order).subscribe({
    next: () => {
      sessionStorage.removeItem('cartItems');
      sessionStorage.removeItem('subtotal');
      this.isLoading = false;
      this.router.navigate(['/checkout/confirmation']);
    },
    error: () => {
      this.isLoading = false;
      alert('Erreur lors de l’enregistrement de la commande ❌');
    }
  });
  this.http.delete('/api/cart').subscribe({
  next: () => console.log('Panier vidé côté serveur ✅'),
  error: () => console.warn('Erreur lors du vidage serveur ❌')
});
}


  increaseQty(item: any): void {
    if (item.quantity < item.availableQuantity) {
      item.quantity++;
      this.updateSubtotal();
    }
  }

  decreaseQty(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateSubtotal();
    }
  }

  updateSubtotal(): void {
    this.subtotal = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    sessionStorage.setItem('subtotal', this.subtotal.toString());
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
 
updateShippingCost(): void {
  if (this.selectedCountry === 'Morocco') {
    this.shippingCost = 0; // Livraison gratuite
  } else {
    this.shippingCost = 250; // Livraison internationale
  }
}

}
