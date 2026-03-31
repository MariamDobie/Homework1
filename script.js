// Shopping Cart Array - stores items with name, price, and quantity
let cart = [];

// Add item to cart (increases quantity if item already exists)
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  
  updateCart();
}

// Remove entire item from cart
function removeFromCart(name) {
  const removedItem = cart.find(item => item.name === name);
  cart = cart.filter(item => item.name !== name);
  updateCart();

}

// Clear all items from cart
function clearCart() {
  if (cart.length > 0) {
    cart = [];
    updateCart();
  }
}

// Update the cart display in the DOM
function updateCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalSpan = document.getElementById('cart-total');
  
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<div class="empty-cart">Cart is empty. Add some delicious Egyptian dishes!</div>';
    totalSpan.textContent = '0';
    return;
  }
  
  let total = 0;
  let cartHTML = '';
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    cartHTML += `
      <div class="cart-item">
        <div class="cart-item-info">
          <strong>${escapeHtml(item.name)}</strong> (${item.quantity})
        </div>
        <div class="cart-item-details">
          $${itemTotal}
        </div>
        <button onclick="removeFromCart('${escapeHtml(item.name).replace(/'/g, "\\'")}')">Remove</button>
      </div>
    `;
  });
  
  cartItemsDiv.innerHTML = cartHTML;
  totalSpan.textContent = total;
}

// Helper function to prevent XSS attacks
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Show temporary toast notification
function showToast(message) {
  const existingToast = document.querySelector('.cart-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'cart-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 2000);
}

// Mobile menu toggle function
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('show');
}

// Gallery slider functionality
let currentIndex = 0;
const slides = document.getElementById('slides');
let totalSlides = 0;

function updateSlider() {
  if (slides) {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
}

function nextSlide() {
  if (totalSlides > 0) {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }
}

function prevSlide() {
  if (totalSlides > 0) {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }
}

// Initialize gallery and set up auto-slide
function initGallery() {
  if (slides) {
    const slideImages = document.querySelectorAll('.slides img');
    totalSlides = slideImages.length;
    if (totalSlides > 0) {
      updateSlider();
      setInterval(nextSlide, 3500);
    }
  }
}

// Contact form handler
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  updateCart();
  
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for reaching out! We will get back to you soon.');
      contactForm.reset();
    });
  }
});