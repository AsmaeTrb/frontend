import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/authservice';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage = '';
   phone: string = '';
  gender: string = '';
  selectedCountry: string = 'France';
  birthDate: string = '';  // ✅ Ajouté
  address: string = '';    // ✅ Ajouté
  city: string = '';       // ✅ Ajouté
country = [
  { name: 'France', code: '+33' },
  { name: 'Maroc', code: '+212' },
  { name: 'Espagne', code: '+34' },
  { name: 'Italie', code: '+39' },
  { name: 'Allemagne', code: '+49' },
  { name: 'États-Unis', code: '+1' },
  { name: 'Royaume-Uni', code: '+44' }
];
 

  constructor(private router: Router,private authService: AuthService) {
    const state = this.router.getCurrentNavigation()?.extras.state as { email?: string };
    this.email = state?.email || '';
  }

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    const newUser = {
       name: this.name,
       email: this.email,
      password: this.password,
      phone: this.phone,
      gender: this.gender,
      birthDate: this.birthDate,
       address: this.address,
     city: this.city,
     country: this.selectedCountry, 
      role: "Guest"
    };
  this.authService.registerUser(newUser).subscribe({
           next: (user) => {
          this.authService.setSession(user.email, user.name); // ✅ stocke la session
        this.router.navigate(['/account']);
      },
      error: () => {
        this.errorMessage = "Erreur lors de l'enregistrement.";
      }
    });
  }
  get selectedCountryCode(): string {
  const c = this.country.find(c => c.name === this.selectedCountry);
  return c ? c.code : '';
}

}