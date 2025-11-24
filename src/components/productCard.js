/*import React from "react";
export default function ProductCard({product,onAdd}) {
    return(
    <div>
        <img src={product.img}/>
        <h3>{product.title}</h3>
        <p>{product.desc}</p>
        <div>
        <strong>${product.price.toFixed(2)}</strong>
        <button onClick={()=>onAdd(product)}>Add to Cart</button>
        </div>
    </div>
    );
}*/
import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <img src={product.img} alt={product.title} />
      <h4>{product.title}</h4>
      <p className="desc">{product.desc}</p>
      <div className="row">
        <strong className="price">${product.price.toFixed(2)}</strong>
        <button onClick={() => onAdd(product)}>أضف إلى السلة</button>
      </div>
    </div>
  );
}

