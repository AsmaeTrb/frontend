import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  orders: any[] = [];
  products: any[] = [];
  activeTab: 'orders' | 'products' = 'orders';
  showModal = false;
  isEditing = false;
  currentProductId: string | null = null;
newProduct = {
  name: '',
  price: '' as any ,
  color: '',
  description: '',
  image1: '',
  image2: '',
  category: '',
  origin: '',
  sizes: [{ size: '', quantity:'' as any  }]
};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const userData = sessionStorage.getItem('user');
    if (!userData || JSON.parse(userData).role !== 'Admin') {
      alert("⛔ Accès réservé aux admins !");
      this.router.navigate(['/']);
      return;
    }

    this.loadOrders();
    this.loadProducts();
  }

  loadOrders(): void {
    this.http.get<any[]>('/api/orders').subscribe(data => {
      this.orders = data;
    });
  }

  loadProducts(): void {
    this.http.get<any[]>('/api/products').subscribe(data => {
      this.products = data;
    });
  }

  openAddModal(): void {
    this.isEditing = false;
    this.currentProductId = null;
    this.resetProductForm();
    this.showModal = true;
  }

  handleProductSubmit(): void {
    if (this.isEditing && this.currentProductId) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  addProduct(): void {
    this.http.post('/api/products', this.newProduct).subscribe({
      next: () => {
        alert('✅ Produit ajouté avec succès');
        this.loadProducts();
        this.closeModal();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout:', err);
        alert('❌ Erreur lors de l\'ajout du produit');
      }
    });
  }

  updateProduct(): void {
    if (!this.currentProductId) return;
    
    this.http.put(`/api/products/${this.currentProductId}`, this.newProduct).subscribe({
      next: () => {
        alert('✏️ Produit modifié avec succès');
        this.loadProducts();
        this.closeModal();
      },
      error: (err) => {
        console.error('Erreur lors de la modification:', err);
        alert('❌ Erreur lors de la modification du produit');
      }
    });
  }

  editProduct(id: string): void {
    const product = this.products.find(p => p.id === id);
    if (product) {
      this.newProduct = JSON.parse(JSON.stringify(product));
      this.isEditing = true;
      this.currentProductId = id;
      this.showModal = true;
    }
  }

  deleteProduct(id: string): void {
    if (confirm('🗑️ Voulez-vous vraiment supprimer ce produit ?')) {
      this.http.delete(`/api/products/${id}`).subscribe({
        next: () => {
          alert('✅ Produit supprimé');
          this.loadProducts();
        },
        error: () => {
          alert('❌ Erreur lors de la suppression');
        }
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.resetProductForm();
  }

  resetProductForm(): void {
    this.newProduct = {
        name: '',
  price: '' as any ,
  color: '',
  description: '',
  image1: '',
  image2: '',
  category: '',
  origin: '',
  sizes: [{ size: '', quantity:'' as any  }]
};
    this.isEditing = false;
    this.currentProductId = null;
  }

  validateOrder(orderId: number): void {
    const body = { status: 'Livré ✅' };

    this.http.put(`/api/orders/${orderId}`, body).subscribe({
      next: () => {
        alert(`✅ Commande #${orderId} validée comme livrée.`);
        this.loadOrders();
      },
      error: () => {
        alert(`❌ Erreur lors de la validation de la commande #${orderId}`);
      }
    });
  }
onFileSelected(event: any, field: 'image1' | 'image2'): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.newProduct[field] = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  addSize(): void {
  this.newProduct.sizes.push({ size: '', quantity: '' as any });
}

removeSize(index: number): void {
  if (this.newProduct.sizes.length > 1) {
    this.newProduct.sizes.splice(index, 1);
  }
}
hasOutOfStock(product: any): boolean {
  return product.sizes?.some((size: any) => size.quantity === 0);
}
isNew(product: any): boolean {
  if (!product.createdAt) return false;
  const addedDate = new Date(product.createdAt);
  const now = new Date();
  const diffInDays = (now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= 10;
}

isLastPiece(product: any): boolean {
  return product.sizes?.some((s: any) => s.quantity < 10);
}

}