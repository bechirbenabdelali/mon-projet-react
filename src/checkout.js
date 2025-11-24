import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, push } from "firebase/database";

export default function Checkout() {
  const [cartit, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart"));
    setCart(saved || []); // ← حل المشاكل
  }, []);

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    if (!fullname || !phone || !address) {
      alert("املأ كل الخانات");
      return;
    }

    if (cartit.length === 0) {
      alert("السلة فارغة!");
      return;
    }

    const ordersRef = ref(db, "orders");

    const orderData = {
      fullname,
      phone,
      address,
      cart: cartit,
      date: new Date().toLocaleString()
    };

    push(ordersRef, orderData)
      .then(() => {
        alert("تم إرسال الطلب بنجاح");
      })
      .catch((err) => {
        alert("خطأ أثناء الإرسال");
        console.error(err);
      });
  };

  return (
  <div className="checkout-container">
    <div className="checkout-box">

      <h2>📦 معلومات الدفع</h2>

      <input
        placeholder="الإسم الكامل"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      /><br />

      <input
        placeholder="رقم الهاتف"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /><br />

      <input
        placeholder="العنوان"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      /><br />

      <button onClick={handleSubmit}>إرسال الطلب</button>
    </div>
  </div>
);

}
