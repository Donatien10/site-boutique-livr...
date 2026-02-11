// JavaScript principal pour le site Librairie & Boutique

// Variables globales
let currentUser = null;
let products = [];
let books = [];

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Fonction d'initialisation principale
async function initializeApp() {
    try {
        // Vérifier si l'utilisateur est connecté
        checkUserSession();
        
        // Charger les données initiales
        await loadInitialData();
        
        // Configurer les écouteurs d'événements
        setupEventListeners();
        
        // Afficher les notifications si nécessaire
        displayInitialNotifications();
        
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
}

// Vérifier la session utilisateur
function checkUserSession() {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
        try {
            currentUser = JSON.parse(userSession);
            updateUIForLoggedInUser();
        } catch (error) {
            console.error('Erreur lors du chargement de la session utilisateur:', error);
            localStorage.removeItem('userSession');
        }
    }
}

// Charger les données initiales
async function loadInitialData() {
    // Cette fonction peut être étendue pour charger des données spécifiques à la page
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'index.html':
        case '':
            await loadHomePageData();
            break;
        case 'boutique.html':
            await loadBoutiqueData();
            break;
        case 'librairie.html':
            await loadLibrairieData();
            break;
        default:
            // Pas de données spécifiques à charger
            break;
    }
}

// Charger les données de la page d'accueil
async function loadHomePageData() {
    try {
        // Charger les promotions
        await loadPromotions();
        
        // Charger les nouveautés
        await loadNouveautes();
        
    } catch (error) {
        console.error('Erreur lors du chargement des données de la page d\'accueil:', error);
    }
}

// Charger les promotions
async function loadPromotions() {
    try {
        const response = await fetch('tables/produits?promotion=true&limit=4');
        if (response.ok) {
            const data = await response.json();
            displayPromotions(data.data);
        } else {
            // Utiliser des données par défaut
            displayPromotions(getDefaultPromotions());
        }
    } catch (error) {
        console.error('Erreur lors du chargement des promotions:', error);
        displayPromotions(getDefaultPromotions());
    }
}

// Charger les nouveautés
async function loadNouveautes() {
    try {
        const response = await fetch('tables/produits?nouveaute=true&limit=4');
        if (response.ok) {
            const data = await response.json();
            displayNouveautes(data.data);
        } else {
            // Utiliser des données par défaut
            displayNouveautes(getDefaultNouveautes());
        }
    } catch (error) {
        console.error('Erreur lors du chargement des nouveautés:', error);
        displayNouveautes(getDefaultNouveautes());
    }
}

// Afficher les promotions
function displayPromotions(promotions) {
    const container = document.getElementById('promotions-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    promotions.forEach(promo => {
        const promoCard = `
            <div class="col-md-3 mb-4">
                <div class="card promotion-card bg-danger text-white h-100">
                    <div class="card-body text-center">
                        <div class="mb-3">
                            <i class="fas fa-fire fa-3x"></i>
                        </div>
                        <h5 class="card-title">${promo.nom}</h5>
                        <p class="card-text">${promo.description}</p>
                        <div class="mb-3">
                            <span class="badge bg-light text-dark fs-6">
                                <del>${promo.prix_original} F CFA</del>
                            </span>
                            <span class="badge bg-warning text-dark fs-6">
                                ${promo.prix_promotion} F CFA
                            </span>
                        </div>
                        <button class="btn btn-light" onclick="addToCart(${promo.id})">
                            <i class="fas fa-cart-plus me-2"></i>Ajouter
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += promoCard;
    });
}

// Afficher les nouveautés
function displayNouveautes(nouveautes) {
    const container = document.getElementById('nouveautes-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    nouveautes.forEach(item => {
        const nouveauteCard = `
            <div class="col-md-3 mb-4">
                <div class="card nouveaute-card h-100">
                    <img src="${item.image || 'images/default-product.jpg'}" class="card-img-top" alt="${item.nom}">
                    <div class="card-body">
                        <div class="mb-2">
                            <span class="badge bg-warning text-dark">
                                <i class="fas fa-star me-1"></i>Nouveau
                            </span>
                        </div>
                        <h5 class="card-title">${item.nom}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="fw-bold text-primary">${item.prix} F CFA</p>
                        <button class="btn btn-primary w-100" onclick="addToCart(${item.id})">
                            <i class="fas fa-cart-plus me-2"></i>Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += nouveauteCard;
    });
}

// Obtenir des promotions par défaut
function getDefaultPromotions() {
    return [
        {
            id: 201,
            nom: "T-shirt Sport",
            description: "Réduction spéciale sur les t-shirts sport",
            prix_original: 15000,
            prix_promotion: 12000,
            image: "images/tshirt-promo.jpg"
        },
        {
            id: 202,
            nom: "Roman Policier",
            description: "20% de réduction sur les romans policiers",
            prix_original: 8000,
            prix_promotion: 6400,
            image: "images/roman-policier.jpg"
        },
        {
            id: 203,
            nom: "Montre Connectée",
            description: "Offre limitée sur les montres connectées",
            prix_original: 45000,
            prix_promotion: 35000,
            image: "images/montre-connectee.jpg"
        },
        {
            id: 204,
            nom: "Livre Scolaire",
            description: "Préparez la rentrée avec nos réductions",
            prix_original: 12000,
            prix_promotion: 9000,
            image: "images/livre-scolaire-promo.jpg"
        }
    ];
}

// Obtenir des nouveautés par défaut
function getDefaultNouveautes() {
    return [
        {
            id: 301,
            nom: "Chemise Moderne",
            description: "Nouvelle collection de chemises élégantes",
            prix: 22000,
            image: "images/chemise-nouveau.jpg"
        },
        {
            id: 302,
            nom: "Roman Fantasy",
            description: "Dernier tome de la saga fantasy",
            prix: 9000,
            image: "images/roman-fantasy.jpg"
        },
        {
            id: 303,
            nom: "Casquette Urbaine",
            description: "Tendance urbaine du moment",
            prix: 10000,
            image: "images/casquette-nouveau.jpg"
        },
        {
            id: 304,
            nom: "Guide Professionnel",
            description: "Nouveau guide pour entrepreneurs",
            prix: 25000,
            image: "images/guide-pro.jpg"
        }
    ];
}

// Charger les données de la boutique
async function loadBoutiqueData() {
    try {
        const response = await fetch('tables/produits?type=boutique&limit=20');
        if (response.ok) {
            const data = await response.json();
            products = data.data;
        } else {
            products = getDefaultProducts();
        }
    } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        products = getDefaultProducts();
    }
}

// Charger les données de la librairie
async function loadLibrairieData() {
    try {
        const response = await fetch('tables/produits?type=librairie&limit=20');
        if (response.ok) {
            const data = await response.json();
            books = data.data;
        } else {
            books = getDefaultBooks();
        }
    } catch (error) {
        console.error('Erreur lors du chargement des livres:', error);
        books = getDefaultBooks();
    }
}

// Obtenir des produits par défaut
function getDefaultProducts() {
    return [
        {
            id: 1,
            nom: "T-shirt Classique",
            description: "T-shirt en coton de haute qualité",
            prix: 15000,
            categorie: "vetements",
            image: "images/tshirt.jpg"
        },
        {
            id: 2,
            nom: "Casquette Sport",
            description: "Casquette tendance pour le sport",
            prix: 8000,
            categorie: "accessoires",
            image: "images/casquette.jpg"
        },
        {
            id: 3,
            nom: "Montre Élégante",
            description: "Montre-bracelet pour homme",
            prix: 35000,
            categorie: "accessoires",
            image: "images/montre.jpg"
        }
    ];
}

// Obtenir des livres par défaut
function getDefaultBooks() {
    return [
        {
            id: 101,
            nom: "Mathématiques Terminale S",
            description: "Manuel complet pour la terminale scientifique",
            prix: 12000,
            categorie: "scolaire",
            auteur: "Collectif",
            image: "images/math-ts.jpg"
        },
        {
            id: 102,
            nom: "Le Petit Prince",
            description: "Célèbre conte philosophique",
            prix: 5000,
            categorie: "romans",
            auteur: "Antoine de Saint-Exupéry",
            image: "images/petit-prince.jpg"
        }
    ];
}

// Configurer les écouteurs d'événements
function setupEventListeners() {
    // Formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Recherche
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Bouton de recherche
    const searchButton = document.querySelector('button[onclick="searchProducts()"]');
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
}

// Gérer la connexion
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // Ici, vous intégreriez normalement votre API d'authentification
        // Pour la démo, nous utilisons une authentification factice
        const user = {
            id: 1,
            email: email,
            name: email.split('@')[0],
            role: 'customer'
        };
        
        // Sauvegarder la session
        localStorage.setItem('userSession', JSON.stringify(user));
        currentUser = user;
        
        // Mettre à jour l'UI
        updateUIForLoggedInUser();
        
        // Fermer le modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        
        showNotification('Connexion réussie !', 'success');
        
    } catch (error) {
        console.error('Erreur de connexion:', error);
        showNotification('Erreur de connexion. Veuillez réessayer.', 'error');
    }
}

// Mettre à jour l'UI pour un utilisateur connecté
function updateUIForLoggedInUser() {
    if (!currentUser) return;
    
    // Mettre à jour le bouton de connexion
    const loginButton = document.querySelector('[data-bs-target="#loginModal"]');
    if (loginButton) {
        loginButton.innerHTML = `
            <i class="fas fa-user-check me-1"></i>${currentUser.name}
        `;
        loginButton.removeAttribute('data-bs-target');
        loginButton.onclick = () => showUserMenu();
    }
}

// Afficher le menu utilisateur
function showUserMenu() {
    // Créer un menu déroulant simple
    const menu = `
        <div class="dropdown-menu show" style="position: absolute; right: 0; top: 100%;">
            <a class="dropdown-item" href="#" onclick="viewProfile()">
                <i class="fas fa-user me-2"></i>Mon profil
            </a>
            <a class="dropdown-item" href="#" onclick="viewOrders()">
                <i class="fas fa-history me-2"></i>Mes commandes
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item text-danger" href="#" onclick="logout()">
                <i class="fas fa-sign-out-alt me-2"></i>Déconnexion
            </a>
        </div>
    `;
    
    // Afficher le menu
    const loginButton = document.querySelector('[onclick="showUserMenu()"]');
    if (loginButton) {
        loginButton.insertAdjacentHTML('afterend', menu);
        
        // Fermer le menu en cliquant ailleurs
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!e.target.closest('.dropdown-menu') && !e.target.closest('[onclick="showUserMenu()"]')) {
                    const dropdown = document.querySelector('.dropdown-menu');
                    if (dropdown) dropdown.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    }
}

// Déconnexion
function logout() {
    localStorage.removeItem('userSession');
    currentUser = null;
    
    // Recharger la page
    location.reload();
}

// Effectuer une recherche
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (!searchTerm) return;
    
    // Rediriger vers la page de résultats de recherche
    window.location.href = `recherche.html?q=${encodeURIComponent(searchTerm)}`;
}

// Afficher une notification
function showNotification(message, type = 'success') {
    // Cette fonction est définie dans cart.js, mais nous la redéfinissons ici pour une utilisation générale
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
    
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);
    
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();
    
    setTimeout(() => {
        if (toastContainer.parentNode) {
            toastContainer.parentNode.removeChild(toastContainer);
        }
    }, 3000);
}

// Afficher les notifications initiales
function displayInitialNotifications() {
    // Vérifier si c'est la première visite
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
        setTimeout(() => {
            showNotification('Bienvenue sur notre Librairie & Boutique en ligne !', 'success');
            localStorage.setItem('firstVisit', 'true');
        }, 2000);
    }
}

// Fonctions utilitaires
debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonctions pour les pages de profil et commandes (à implémenter)
function viewProfile() {
    window.location.href = 'profil.html';
}

function viewOrders() {
    window.location.href = 'commandes.html';
}

// Exporter les fonctions nécessaires pour une utilisation globale
window.showNotification = showNotification;
window.addToCart = addToCart;
window.proceedToCheckout = proceedToCheckout;