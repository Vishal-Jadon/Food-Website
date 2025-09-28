

// ================= LOGIN & SIGNUP =================

  // Handle Signup and save data in localStorage
  function handleSignup(event) {
    event.preventDefault();

    var Username = document.getElementById("Username").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();

    if (Username === "" || email === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }

    // Save user details in localStorage
    localStorage.setItem("username", Username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Registration successful! Now login.");
    // Optionally redirect
    // window.location.href = "hii.html";
  }

  // Handle Login and check with localStorage
  function handleLogin(event) {
    event.preventDefault();

    var email1 = document.getElementById("email1").value.trim();
    var pass = document.getElementById("pass").value.trim();

    // Get stored user data from localStorage
    var storedEmail = localStorage.getItem("email");
    var storedPass = localStorage.getItem("password");

    if (email1 === "" || pass === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (email1 === storedEmail && pass === storedPass) {
      alert("Welcome " + localStorage.getItem("username") + "!");
      window.location.href = "index.html"; // Redirect after login
    } else {
      alert("Wrong details. Please try again.");
    }
  }


//function signup() {
//   let user = document.getElementById("signupUser").value;
//   let pass = document.getElementById("signupPass").value;
//   if(user && pass) {
//     localStorage.setItem("user", JSON.stringify({ user, pass }));
//     alert("Signup successful! Please login.");
//     window.location.href = "login.html";
//   } else {
//     alert("Please fill all fields!");
//   }
// }

// function login() {
//   let user = document.getElementById("loginUser").value;
//   let pass = document.getElementById("loginPass").value;
//   let savedUser = JSON.parse(localStorage.getItem("user"));

//   if(savedUser && user === savedUser.user && pass === savedUser.pass) {
//     localStorage.setItem("loggedIn", "true");
//     alert("Login successful!");
//     window.location.href = "index.html";
//   } else {
//     alert("Invalid username or password!");
//   }
// }
// ----------add cart--------------
// Load cart from localStorage or initialize
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add item to cart
function addToCart(itemName, itemPrice) {
  const item = { name: itemName, price: itemPrice, quantity: 1 };

  // check if item already exists
  let existing = cart.find(i => i.name === item.name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();  // update UI immediately
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

// Place order
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
   } 
  //  alert("✅ Order placed successfully!");


  cart = [];
  localStorage.removeItem("cart");
  updateCartDisplay();
}

// Update cart display and navbar count
function updateCartDisplay() {
  // Cart page elements
  const cartContainer = document.getElementById("cartItems");
  const totalContainer = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  let total = 0;
  let itemCount = 0;

  if (cartContainer) cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    if (cartContainer) {
      let div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <p>${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}</p>
        <button onclick="removeFromCart(${index})">❌ Remove</button>
      `;
      cartContainer.appendChild(div);
    }
    total += item.price * item.quantity;
    itemCount += item.quantity;
  });

  if (totalContainer) totalContainer.innerText = "Total: ₹" + total;
  if (cartCount) cartCount.innerText = itemCount; // Update navbar
}

// Initialize cart count when page loads
window.addEventListener("DOMContentLoaded", () => {
  updateCartDisplay();
});


document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let name = document.getElementById("fullName").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let pincode = document.getElementById("pincode").value;
  let payment = document.getElementById("payment").value;

  if (!name || !phone || !address || !city || !pincode) {
    alert("⚠️ Please fill all fields!");
    return;
  }

  alert(`✅ Order placed!\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}, ${city} - ${pincode}\nPayment: ${payment}`);
});

