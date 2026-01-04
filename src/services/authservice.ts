import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
   id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  birthDate: string; // ou séparé en day/month/year si nécessaire
  address: string;
  city: string;
  country: string;
  role: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/api/users';

  isConnectedSubject: BehaviorSubject<boolean>;
  nameSubject: BehaviorSubject<string | null>;
  roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  constructor(private http: HttpClient) {
    // ✅ Initialisation dans le constructeur, maintenant c’est sûr que le navigateur est prêt
    const email = typeof window !== 'undefined' ? sessionStorage.getItem('email') : null;
    const name = typeof window !== 'undefined' ? sessionStorage.getItem('name') : null;

    this.isConnectedSubject = new BehaviorSubject<boolean>(!!email);
    this.nameSubject = new BehaviorSubject<string | null>(name);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}`);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, { email, password });
  }

 setSession(email: string, name: string, role: string = 'Guest'): void {
  const user = { email, name, role };
  sessionStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('email', email);
  sessionStorage.setItem('name', name);

  this.isConnectedSubject.next(true);
  this.nameSubject.next(name);
  this.roleSubject.next(role); // ✅ Diffuse le rôle
}


  logout(): void {
    sessionStorage.clear();
    this.isConnectedSubject.next(false);
    this.nameSubject.next(null);
      this.roleSubject.next(null); // ✅ Indique que le rôle est vide

  }
  registerUser(user: User): Observable<User> {
  return this.http.post<User>('/api/users', user);
}
}
