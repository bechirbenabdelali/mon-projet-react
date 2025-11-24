import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

export default function Admin() {
  const [orders, setOrders] = useState([]); // ← مهم أن يكون [] وليس undefined

  useEffect(() => {
    const ordersRef = ref(db, "orders");

    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();

      // إذا لا توجد طلبات، دع orders = []
      if (!data) {
        setOrders([]);
        return;
      }

      // تحويل الـ object إلى array
      const list = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      setOrders(list);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 قائمة الطلبات</h2>

      {orders.length === 0 ? (
        <p>لا توجد طلبات حاليا.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              padding: "15px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#fafafa",
            }}
          >
            <h3>👤 {order.fullname}</h3>
            <p><b>📞 الهاتف:</b> {order.phone}</p>
            <p><b>📍المدينة و العنوان:</b> {order.address}</p>
            <p><b>🕒 التاريخ:</b> {order.date}</p>

            <h4>🛒 المنتجات:</h4>
            {order.cart && order.cart.length > 0 ? (
            order.cart.map((item, i) => (
            <p key={i}>
            - {item.title} × {item.qty} = {item.qty * item.price} د
    </p>
  ))
) : (
  <p>لا توجد منتجات</p>
)}

            <hr />
            <h3>
             المجموع الكلي:{" "}
  {Array.isArray(order.cart)
    ? order.cart.reduce((sum, it) => sum + it.price * it.qty, 0)
    : 0
  } د
            </h3>
          </div>
        ))
      )}
    </div>
  );
}
