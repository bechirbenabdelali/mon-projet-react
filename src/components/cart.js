import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cartItems, onRemove, onChangeQty, onClear }) {
  const subtotal = cartItems.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shipping = subtotal > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  return (
    <div className="cart-total">
      <h3>السلة</h3>
      {cartItems.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        <>
          <ul>
            {cartItems.map((it) => (
              <li key={it.id} className="cart-item">
                <img src={it.img} alt={it.title} />
                <div className="info">
                  <div className="title">{it.title}</div>
                  <div className="controls">
                    <button onClick={() => onChangeQty(it.id, it.qty - 1)}>-</button>
                    <span className="qty">{it.qty}</span>
                    <button onClick={() => onChangeQty(it.id, it.qty + 1)}>+</button>
                  </div>
                </div>
                <div className="right">
                  <div className="price">${(it.price * it.qty).toFixed(2)}</div>
                  <button className="remove" onClick={() => onRemove(it.id)}>حذف</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div>المجموع الفرعي: <strong>${subtotal.toFixed(2)}</strong></div>
            <div>التوصيل: <strong>${shipping.toFixed(2)}</strong></div>
            <div className="total">الإجمالي: <strong>${total.toFixed(2)}</strong></div>
            <div className="cart-actions">
              <button onClick={onClear} className="clear">تفريغ السلة</button>
              <Link to="/checkout">
              <button className="Checkout">طلب</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
