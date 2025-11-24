import React, { useState, useEffect } from "react";
import ProductsData from "./Products";
import ProductCard from "./components/productCard";
import Cart from "./components/cart";
import "./App.css";
function App() {
  // 🛒 حالة السلة
  const [cartItems, setCartItems] = useState([]);

  // 📥 تحميل السلة من localStorage عند أول تشغيل
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart"));
      if (Array.isArray(saved)) setCartItems(saved);
    } catch (err) {
      console.error("فشل تحميل السلة من localStorage:", err);
    }
  }, []);

  // 💾 حفظ السلة تلقائيًا في localStorage كلما تغيّرت
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ إضافة منتج للسلة
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.img,
          qty: 1,
        },
      ];
    });
  };

  // ❌ حذف منتج من السلة
  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  // 🔢 تعديل الكمية
  const handleChangeQty = (id, newQty) => {
    setCartItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, newQty) } : p))
        .filter((p) => p.qty > 0) // حذف العناصر ذات الكمية 0
    );
  };

  // 🧹 تفريغ السلة بالكامل
  const handleClear = () => {
    if (window.confirm("هل تريد تفريغ السلة؟")) setCartItems([]);
  };

  // 🖼️ واجهة التطبيق
  return (
    <div className="app-wrapper">
      <header>
        <h1>🛍️ متجر مصغّر</h1>
        <div className="cart-summary">
          عناصر في السلة:{" "}
          <strong>{cartItems.reduce((s, i) => s + i.qty, 0)}</strong>
        </div>
      </header>

      <main>
        <div className="product-section">
          {ProductsData.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
            />
          ))}
        </div>

        <Cart
          cartItems={cartItems}
          onRemove={handleRemove}
          onChangeQty={handleChangeQty}
          onClear={handleClear}
        />
      </main>

      <footer>© {new Date().getFullYear()} متجري الصغير</footer>
    </div>
  );
}

export default App;
