# 📌 Crown of Krishna – Website Flow

This document explains the flow of the website step by step.  
The project is built with **Next.js** and order data is stored in **Google Sheets**.

---

## 1. Home Page
- **File:** `app/page.js`
- **Description:**  
  - Landing page of the website.  
  - Navigation to Products, Cart, and other sections.  

---

## 2. Product Listing Page
- **File:** `app/product/page.js`
- **Description:**  
  - Displays all available products (Poshak, Pagri, etc.) with images, price, and details.  
  - User can click on a product to view more information.  

---

## 3. Product Detail Page
- **File:** `app/product/[productinfo]/page.js`
- **Description:**  
  - Shows product details (multiple images, description, price).  
  - Option: **Add to Cart**.  
  - When clicked, product is stored in **Local Storage**.  

---

## 4. Cart Page
- **File:** `app/cart/page.js`
- **Description:**  
  - Displays all products added to cart (from Local Storage).  
  - User can update quantity or remove items.  
  - Button: **Proceed to Checkout**.  

---

## 5. Checkout Page
- **File:** `app/ordernow/[slug]/page.js`
- **Description:**  
  - User enters **address, contact details, and delivery info**.  
  - Button: **Confirm Order**.  

---

## 6. Order API
- **File:** `app/api/route.js`
- **Description:**  
  - Handles **order submission**.  
  - Saves the order into **Google Sheets**.  
  - On success → redirects user to **Home Page**.  

---

## 🔄 Overall Flow Diagram


Home (app/page.js)
   ↓
Product List (app/product/page.js)
   ↓
Product Detail (app/product/[productinfo]/page.js)
   ↓
Add to Cart (stored in LocalStorage)
   ↓
View Cart (app/cart/page.js)
   ↓
Proceed to Checkout
   ↓
Checkout Page (app/ordernow/[slug]/page.js)
   ↓
Confirm Order → API (app/api/route.js)
   ↓
Order Saved in Google Sheets
   ↓
Redirect to Home
