# 🛍️ Librairie & Boutique en Ligne

Un site e-commerce complet combinant une boutique de produits variés et une librairie avec livres scolaires, romans et livres professionnels. Développé avec HTML, CSS, JavaScript et Bootstrap.

## 📋 Fonctionnalités Implémentées

### ✅ Pages Principales
- **Page d'accueil** - Présentation, promotions, nouveautés et catégories populaires
- **Boutique** - Vêtements, accessoires et produits divers avec filtres et tri
- **Librairie** - Livres scolaires, romans, professionnels et e-books
- **Livraison** - Zones de livraison, tarifs et processus détaillé
- **Contact** - Formulaire de contact et informations de paiement
- **Checkout** - Processus complet de commande et paiement
- **Confirmation** - Page de confirmation avec suivi de commande

### ✅ Fonctionnalités Clés
- **Système de panier** complet avec gestion des quantités
- **Filtres avancés** par catégorie, prix, disponibilité
- **Recherche** de produits et livres
- **Paiement multiple** : Mobile Money, carte bancaire, espèces, virement
- **Livraison** avec zones tarifées et délais
- **Interface responsive** pour tous les appareils
- **Notifications** toast pour les actions utilisateur
- **Système de connexion** simplifié

### ✅ Gestion des Données
- **Tables de données** pour produits et commandes
- **API REST** pour les opérations CRUD
- **Stockage local** pour le panier
- **Schémas détaillés** avec validation des données

## 🛒 Structure du Site

```
Librairie & Boutique/
├── index.html              # Page d'accueil
├── boutique.html           # Boutique (vêtements, accessoires, divers)
├── librairie.html          # Librairie (scolaire, romans, pros)
├── livraison.html          # Informations livraison
├── contact.html            # Contact et paiement
├── checkout.html           # Commande et paiement
├── confirmation.html       # Confirmation commande
├── css/
│   └── style.css          # Styles principaux
├── js/
│   ├── main.js            # JavaScript principal
│   └── cart.js            # Système de panier
└── README.md               # Documentation
```

## 🚀 Démarrage Rapide

1. **Ouvrir le projet** : Lancez `index.html` dans votre navigateur
2. **Naviguer** : Utilisez le menu principal pour accéder aux différentes sections
3. **Acheter** : Ajoutez des produits au panier et passez commande
4. **Payer** : Choisissez votre mode de paiement préféré

## 📱 Navigation

### Accueil
- Présentation du concept
- Promotions du jour
- Nouveautés
- Catégories populaires
- Services proposés

### Boutique
- **Catégories** : Vêtements, Accessoires, Produits divers
- **Fonctionnalités** : Recherche, filtres, tri par prix
- **Affichage** : Grille de produits avec images et prix

### Librairie
- **Catégories** : Livres scolaires, Romans, Professionnels, E-books
- **Filtres** : Par auteur, niveau scolaire, format
- **Spécificités** : ISBN, nombre de pages, éditeur

### Livraison
- **Zones** : A, B, C avec tarifs différents
- **Délais** : 24h, 36h, 48h selon la zone
- **Modes** : Domicile, point retrait, express
- **FAQ** complète sur la livraison

### Contact & Paiement
- **Formulaire** de contact
- **Modes** : Mobile Money, carte, espèces, virement
- **Informations** détaillées sur chaque mode
- **FAQ** sur les paiements

## 🛍️ Système de Commande

### Processus Complet
1. **Ajouter au panier** depuis n'importe quelle page
2. **Voir le panier** avec modification des quantités
3. **Checkout** avec coordonnées et adresse
4. **Choisir** mode de livraison et paiement
5. **Valider** la commande
6. **Recevoir** confirmation avec code de suivi

### Modes de Paiement
- **Mobile Money** : MTN Money (07 07 07 07 07), Moov Money (05 05 05 05 05)
- **Carte Bancaire** : Visa, Mastercard (frais 2%)
- **Espèces** : Paiement à la livraison
- **Virement** : Pour commandes professionnelles

### Zones de Livraison
- **Zone A** (2 500 F CFA) : Plateau, Treichville, Koumassi, Marcory - 24h
- **Zone B** (3 000 F CFA) : Cocody, Bingerville, Port-Bouët - 36h  
- **Zone C** (3 500 F CFA) : Yopougon, Abobo, Attécoubé, Adjamé - 48h

## 📊 Structure des Données

### Table Produits
```javascript
{
  id: "string",              // Identifiant unique
  nom: "string",             // Nom du produit
  description: "rich_text",  // Description détaillée
  prix: "number",            // Prix en F CFA
  categorie: "string",       // Catégorie principale
  sous_categorie: "string",    // Sous-catégorie
  type: "string",            // boutique ou librairie
  image: "string",           // URL de l'image
  stock: "number",           // Quantité en stock
  disponible: "boolean",     // Disponible à la vente
  promotion: "boolean",    // En promotion
  prix_promotion: "number",  // Prix promotionnel
  nouveaute: "boolean",      // Nouveau produit
  auteur: "string",          // Auteur (livres)
  editeur: "string",         // Éditeur (livres)
  isbn: "string",            // ISBN (livres)
  niveau_scolaire: "string",  // Niveau scolaire
  format: "string",          // Format (e-books)
  pages: "number",           // Nombre de pages
  date_publication: "datetime" // Date de publication
}
```

### Table Commandes
```javascript
{
  id: "string",                    // Identifiant unique
  nom_client: "string",            // Nom complet
  email_client: "string",            // Email
  telephone_client: "string",      // Téléphone
  adresse_livraison: "rich_text",    // Adresse
  complement_adresse: "text",      // Complément
  ville: "string",                 // Ville
  commune: "string",                 // Commune
  mode_livraison: "string",        // domicile, point_relais, retrait_magasin
  mode_paiement: "string",         // mobile_money, carte_bancaire, espece, virement
  statut: "string",                // en_attente, confirmee, en_preparation, expediee, livree, annulee
  total_commande: "number",        // Total
  frais_livraison: "number",       // Frais de livraison
  reduction: "number",             // Réduction appliquée
  montant_final: "number",         // Montant final
  articles: "rich_text",             // Articles (JSON)
  nombre_articles: "number",       // Nombre d'articles
  date_livraison_souhaitee: "datetime", // Date souhaitée
  instructions_livraison: "rich_text", // Instructions
  statut_paiement: "string",       // en_attente, paye, echoue, rembourse
  reference_paiement: "string",    // Référence paiement
  date_paiement: "datetime",       // Date paiement
  client_id: "text",               // ID client si connecté
  code_suivi: "text",              // Code de suivi
  remarques: "rich_text"          // Remarques admin
}
```

## 🎯 Fonctionnalités Avancées

### Système de Panier
- **Stockage local** dans le navigateur
- **Mise à jour en temps réel** du nombre d'articles
- **Gestion des quantités** avec boutons +/-
- **Suppression** d'articles individuels
- **Vidage complet** du panier

### Filtres et Recherche
- **Recherche textuelle** dans les noms et descriptions
- **Filtres par catégorie** avec cases à cocher
- **Filtre par prix** avec curseur
- **Tri par** : nom, prix croissant/décroissant, nouveauté

### Notifications
- **Toasts** pour les actions utilisateur
- **Messages de succès** et d'erreur
- **Animations** fluides
- **Disparition automatique** après 3 secondes

### Responsive Design
- **Mobile first** approche
- **Breakpoints** Bootstrap
- **Adaptation automatique** aux tailles d'écran
- **Touch friendly** pour les appareils tactiles

## 🔧 Configuration

### Paramètres de Base
```javascript
// Configuration des zones de livraison
const deliveryZones = {
  A: { communes: ['plateau', 'treichville', 'koumassi', 'marcory'], fee: 2500, delay: '24h' },
  B: { communes: ['cocody', 'bingerville', 'port-bouet'], fee: 3000, delay: '36h' },
  C: { communes: ['yopougon', 'abobo', 'attecoube', 'adjame'], fee: 3500, delay: '48h' }
};

// Configuration des paiements
const paymentMethods = {
  mobile_money: { numbers: { mtn: '07 07 07 07 07', moov: '05 05 05 05 05' }, fee: 0 },
  carte_bancaire: { types: ['visa', 'mastercard'], fee: 0.02 },
  espece: { description: 'Paiement à la livraison', fee: 0 },
  virement: { description: 'Pour professionnels', fee: 0 }
};
```

### Codes Promo
```javascript
const promoCodes = {
  'BIENVENUE': { discount: 2000, type: 'fixed' },
  'LIVRAISON': { discount: deliveryFee, type: 'delivery' },
  '10POURCENT': { discount: 0.1, type: 'percentage' }
};
```

## 📞 Support et Contact

### Informations de Contact
- **Téléphone**: +225 07 07 07 07 07
- **WhatsApp**: +225 07 07 07 07 07
- **Email**: contact@librairie-boutique.ci
- **Support**: support@librairie-boutique.ci

### Horaires
- **Lundi - Vendredi**: 8h00 - 18h00
- **Samedi**: 8h00 - 14h00
- **Dimanche**: Fermé

### Support Client
- **Disponible 7j/7** via WhatsApp
- **Réponse rapide** sous 24h
- **Assistance** pour toutes les questions

## 🔄 Prochaines Étapes de Développement

### Fonctionnalités à Ajouter
1. **Système d'authentification** complet avec inscription
2. **Espace client** avec historique des commandes
3. **Avis clients** sur les produits
4. **Programme de fidélité** avec points
5. **Newsletter** et notifications email
6. **Multilingue** (français, anglais)
7. **Mode sombre** pour le thème
8. **PWA** (Progressive Web App)

### Optimisations
1. **Images optimisées** avec lazy loading
2. **Caching** des données fréquentes
3. **Compression** des fichiers CSS/JS
4. **Analytics** pour suivre les performances
5. **SEO** optimisé pour les moteurs de recherche

### Sécurité
1. **HTTPS** obligatoire
2. **Protection CSRF** pour les formulaires
3. **Validation** renforcée des données
4. **Logs** d'activité pour la sécurité
5. **Backup** automatique des données

## 📄 Licence

Ce projet est développé pour un usage éducatif et commercial. Tous droits réservés © 2024 Librairie & Boutique en Ligne.

## 🤝 Contribution

Pour contribuer au projet :
1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité
3. Commitez vos changements
4. Poussez vers la branche
5. Créez une Pull Request

---

**Développé avec ❤️ en Côte d'Ivoire**