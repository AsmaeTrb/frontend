# 🛍️ Trismae — Boutique en ligne Angular + Node.js
Trismae est une boutique en ligne inspirée du style Hermès, développée dans le cadre d’un projet universitaire. L'application combine un **frontend Angular** moderne avec un **backend Node.js/Express**, sans base de données : toutes les données sont stockées localement dans des fichiers `.json`.



---

## 🚀 Lancer le projet

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

---

## ⚙️ Étapes d'installation 

1. Installez les dépendances Angular du projet :
   ```bash
   npm install
   npm install bootstrap
   npm install express cors nodemailer body-parser
---
## 🌟 Fonctionnalités

### 👤 Utilisateurs

- Navigation par catégorie
- Fiche produit détaillée avec tailles, images, stock
- Panier dynamique (stocké dans sessionStorage)
- Commande en plusieurs étapes
- Vérification e-mail avec code (via une API Express)

### 👨‍💼 Administrateurs

- Gestion CRUD des produits
- Suivi des commandes
- Mise à jour des statuts de commande

---

## 📦 Stockage des données

- **Frontend** : `sessionStorage` (panier, utilisateur invité)
- **Backend** : fichiers `.json` (dans `/data`) :
  - `products.json`
  - `users.json`
  - `orders.json`
  - `cart.json`

---

## 🧠 Services Angular

- `CartService` : gestion du panier
- `AuthService` : utilisateur, rôle et état connecté
- `GetDataService` : appels génériques à l’API

---

## 🧪 API REST - Backend Express

| Méthode | URL                     | Description                        |
|--------:|--------------------------|------------------------------------|
| `GET`   | `/api/products`         | Obtenir tous les produits          |
| `GET`   | `/api/products/:id`     | Obtenir un produit par ID          |
| `POST`  | `/api/products`         | Ajouter un nouveau produit         |
| `PUT`   | `/api/products/:id`     | Modifier un produit existant       |
| `DELETE`| `/api/products/:id`     | Supprimer un produit               |
| `GET`   | `/api/cart`             | Obtenir le panier                  |
| `POST`  | `/api/cart`             | Ajouter un article au panier       |
| `DELETE`| `/api/cart`             | Vider le panier                    |
| `POST`  | `/api/orders`           | Créer une commande                 |
| `GET`   | `/api/orders`           | Voir toutes les commandes          |

---

## 👩‍💻 Auteur

Ce projet a été réalisé par **Asmae Tribak** dans le cadre du module *Développement Front-End et Frameworks*.
