// Système de gestion du panier
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.updateCartDisplay();
    }

    // Charger le panier depuis le localStorage
    loadCart() {
        const savedCart = localStorage.getItem('shoppingCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Sauvegarder le panier dans le localStorage
    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
    }

    // Ajouter un produit au panier
    addToCart(productId, quantity = 1, options = {}) {
        // Vérifier si le produit existe déjà dans le panier
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            // Augmenter la quantité
            existingItem.quantity += quantity;
        } else {
            // Ajouter un nouvel article
            const newItem = {
                id: productId,
                quantity: quantity,
                addedAt: new Date().toISOString(),
                ...options
            };
            this.cart.push(newItem);
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Produit ajouté au panier !');
    }

    // Retirer un produit du panier
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Produit retiré du panier');
    }

    // Mettre à jour la quantité d'un produit
    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.updateCartDisplay();
        }
    }

    // Obtenir le nombre total d'articles
    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Obtenir le total du panier
    getCartTotal() {
        return this.cart.reduce((total, item) => {
            const itemPrice = item.price || 0;
            return total + (itemPrice * item.quantity);
        }, 0);
    }

    // Vider le panier
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Panier vidé');
    }

    // Mettre à jour l'affichage du panier
    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
        }
        
        if (cartItems) {
            this.displayCartItems(cartItems);
        }
        
        if (cartTotal) {
            cartTotal.textContent = `${this.getCartTotal().toLocaleString()} F CFA`;
        }
    }

    // Afficher les articles du panier
    displayCartItems(container) {
        if (!container) return;
        
        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Votre panier est vide</p>
                    <a href="boutique.html" class="btn btn-primary">
                        <i class="fas fa-shopping-bag me-2"></i>Commencer vos achats
                    </a>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        
        this.cart.forEach(async (item) => {
            // Récupérer les détails du produit
            let productDetails = null;
            try {
                const response = await fetch(`tables/produits/${item.id}`);
                if (response.ok) {
                    productDetails = await response.json();
                }
            } catch (error) {
                console.error('Erreur lors du chargement des détails du produit:', error);
            }
            
            const productName = productDetails ? productDetails.nom : `Produit ${item.id}`;
            const productPrice = productDetails ? productDetails.prix : (item.price || 0);
            const productImage = productDetails ? productDetails.image : 'images/default-product.jpg';
            
            const itemTotal = productPrice * item.quantity;
            
            const cartItemHTML = `
                <div class="cart-item border-bottom pb-3 mb-3" data-product-id="${item.id}">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${productImage}" alt="${productName}" class="img-fluid rounded">
                        </div>
                        <div class="col-md-4">
                            <h6 class="mb-1">${productName}</h6>
                            <p class="text-muted mb-1">${productPrice.toLocaleString()} F CFA</p>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group input-group-sm">
                                <button class="btn btn-outline-secondary" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" class="form-control text-center" value="${item.quantity}" 
                                       min="1" onchange="cartManager.updateQuantity(${item.id}, this.value)">
                                <button class="btn btn-outline-secondary" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <p class="fw-bold mb-0">${itemTotal.toLocaleString()} F CFA</p>
                        </div>
                        <div class="col-md-1">
                            <button class="btn btn-outline-danger btn-sm" onclick="cartManager.removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            container.innerHTML += cartItemHTML;
        });
        
        // Ajouter un bouton pour vider le panier
        const clearButton = `
            <div class="text-end mt-3">
                <button class="btn btn-outline-danger" onclick="cartManager.clearCart()">
                    <i class="fas fa-trash me-2"></i>Vider le panier
                </button>
            </div>
        `;
        container.innerHTML += clearButton;
    }

    // Afficher une notification
    showNotification(message, type = 'success') {
        // Créer une notification toast
        const toastHTML = `
            <div class="toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        // Ajouter la notification au body
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.innerHTML = toastHTML;
        document.body.appendChild(toastContainer);
        
        // Afficher la notification
        const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
        toast.show();
        
        // Supprimer la notification après 3 secondes
        setTimeout(() => {
            if (toastContainer.parentNode) {
                toastContainer.parentNode.removeChild(toastContainer);
            }
        }, 3000);
    }

    // Passer à la caisse
    proceedToCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('Votre panier est vide !', 'error');
            return;
        }
        
        // Rediriger vers la page de checkout
        window.location.href = 'checkout.html';
    }
}

// Fonction globale pour ajouter au panier
async function addToCart(productId) {
    try {
        // Récupérer les détails du produit
        const response = await fetch(`tables/produits/${productId}`);
        let product = null;
        
        if (response.ok) {
            product = await response.json();
        } else {
            // Utiliser des données par défaut si l'API n'est pas disponible
            product = {
                id: productId,
                nom: `Produit ${productId}`,
                prix: 10000,
                image: 'images/default-product.jpg'
            };
        }
        
        // Créer l'article du panier
        const cartItem = {
            id: product.id,
            name: product.nom,
            price: product.prix,
            image: product.image
        };
        
        // Ajouter au panier
        cartManager.addToCart(productId, 1, cartItem);
        
    } catch (error) {
        console.error('Erreur lors de l\'ajout au panier:', error);
        cartManager.showNotification('Erreur lors de l\'ajout au panier', 'error');
    }
}

// Fonction globale pour passer à la caisse
function proceedToCheckout() {
    cartManager.proceedToCheckout();
}

// Initialiser le gestionnaire de panier
const cartManager = new CartManager();

// Exporter pour une utilisation globale
window.cartManager = cartManager;