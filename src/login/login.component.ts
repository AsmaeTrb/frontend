import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:true,
    imports: [CommonModule,FormsModule],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isEmailVerified = false;
  isLoading = false;
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Étape 1 : vérifier si l'email existe
 verifyEmail() {
  this.isLoading = true;
  this.errorMessage = '';

  this.authService.getUserByEmail(this.email).subscribe(
    (users) => {
      this.isLoading = false;
      if (users.length > 0) {
        this.isEmailVerified = true;
      } else {
        this.router.navigate(['/register'], { state: { email: this.email } });
      }
    },
    () => {
      this.isLoading = false;
      this.errorMessage = "Erreur de connexion.";
    }
  );
}


submitPassword() {
  this.isLoading = true;
  this.errorMessage = '';

  this.authService.login(this.email, this.password).subscribe(
    (user) => {
      this.isLoading = false;

      // ✅ Enregistre email, nom et rôle
      this.authService.setSession(user.email, user.name, user.role);

      // ✅ Redirection selon le rôle
      if (user.role === 'Admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/account']);
      }
    },
    () => {
      this.isLoading = false;
      this.errorMessage = "Mot de passe incorrect.";
    }
  );
}

  backToEmail() {
    this.isEmailVerified = false;
    this.password = '';
    this.errorMessage = '';
  }
}