import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/authservice';
import { CartService } from '../../services/cartservice';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isConnected = false;
  currentUserName: string | null = null;
  isAdmin = false;


  constructor(private router: Router, private authService: AuthService,  private cartService: CartService) {}

ngOnInit(): void {
  this.authService.isConnectedSubject.subscribe(value => {
    this.isConnected = value;
  });

  this.authService.nameSubject.subscribe(name => {
    this.currentUserName = this.formatDisplayName(name);
  });

  // ✅ met à jour en direct quand le rôle change
  this.authService.roleSubject.subscribe(role => {
    this.isAdmin = role === 'Admin';
  });

  // (optionnel mais utile au démarrage)
  const userData = sessionStorage.getItem('user');
  if (userData) {
    const role = JSON.parse(userData).role;
    this.isAdmin = role === 'Admin';
    this.authService.roleSubject.next(role); // 🔁 met à jour immédiatement
  }
}
formatDisplayName(name: string | null): string | null {
  if (!name) return null;

  if (name.toLowerCase() === 'guest') return null;

  if (name.includes('@')) {
    const username = name.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
}


logout(): void {
  this.authService.logout();

  // Supprimer session locale
  sessionStorage.removeItem('cartItems');
  sessionStorage.removeItem('subtotal');
  sessionStorage.removeItem('email');

  // Supprimer panier côté serveur
  this.cartService.clearCart().subscribe({
    next: () => {
      this.router.navigate(['/']);
    },
    error: (err) => {
      console.error('Erreur lors du vidage du panier :', err);
      this.router.navigate(['/']);
    }
  });
}


onAccountClick(): void {
  const userData = sessionStorage.getItem('user');
  if (userData) {
    const role = JSON.parse(userData).role;
    if (role === 'Admin') {
      this.router.navigate(['/admin']);
      return;
    }
  }

  // Redirection normale
  if (this.isConnected) {
    this.router.navigate(['/account']);
  } else {
    this.router.navigate(['/login']);
  }
}

  reloadPage(): void {
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }
}