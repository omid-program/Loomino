# 🧵 Loomino

A complete e-commerce web application for fabric sales, built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
Includes a dynamic store interface and a powerful admin dashboard — all without a real backend!

---

## 🚀 Live Featuress

### 🛍 Public Store (Client Side)
- Dynamic homepage:
  - **Newest Products**
  - **Best Sellers**
  - **Seasonal Fabrics**
  - **Special Sale** (controlled via Admin Dashboard)
- Product listing with:
  - Search & filtering
  - Pagination
- Single product page:
  - Live price calculator based on selected meter
  - Color-switch with image + shadow update
  - Related products (tag-based)
- Shopping cart:
  - Managed with React Context + LocalStorage
  - Dynamic total price, color-specific products, editable meters
  - Full mobile responsiveness

---

### 🛠 Admin Dashboard (Simulated with JSON Server)

- Basic login system with cookie-based authentication check
- Sales reports:
  - Daily / Monthly / Yearly charts (Chart.js)
- Full product CRUD:
  - Add / Edit / Delete
  - Filter & pagination
- Special Sale toggle
- Order management:
  - Track order status: "Paid / Preparing / Shipping / Delivered"
- Comment moderation:
  - Pending comments
  - Search in product titles and comment body
- Category & tag management:
  - Create / Delete
  - Category descriptions + image (SEO boost)

> ⚠ Note: All admin-side data management is done via **JSON Server** (simulated backend).

---

## 🧪 Tech Stack

| Tool/Library     | Purpose                         |
|------------------|----------------------------------|
| **Next.js**      | SSR + dynamic routing            |
| **TypeScript**   | Type safety                      |
| **Tailwind CSS** | Styling + responsiveness         |
| **Chart.js**     | Sales charts in dashboard        |
| **React Icons**  | Iconography                      |
| **JSON Server**  | Mock backend for development     |

---

## 💻 How to Run Locally

```bash
git clone https://github.com/omid-program/Loomino.git
cd Loomino
npm install
```

### Run mock server:

```bash
npx json-server --watch db.json --port 8000
```

### Start development server:

```bash
npm run dev
```

---

## 📺 Demo Video

Check out the demo videos (in Persian) for full walkthrough and future updates:

🔗 [Video on Aparat](https://aparat.com/)  
🕒 YouTube version coming soon...

---

## 🔒 License

This project is released under a [Creative Commons BY-NC License](https://creativecommons.org/licenses/by-nc/4.0/).

> Personal & educational use is allowed.  
> **Commercial use is prohibited** without written permission from the author.

---

## 📬 Developer

**Omid**  
Frontend Developer (React / Next.js)  
📧 omidprogram79 [at] gmail.com  
🌍 LinkedIn: coming soon...

---

## 🛠 Upcoming Features

- 🔄 Dark Mode  
- 🌐 Multilingual support (English version)  
- 🧼 UI/UX improvements  
- 📦 Switch to real backend (Node or Next API)

---

## ⭐ Like the project?

- Leave a **Star**
- Create an **Issue**
- Fork and contribute via **Pull Requests**

---

📄 [Persian README is available here](./README.fa.md)