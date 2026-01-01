import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const cartCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("cart="))
      ?.split("=")[1];

    if (cartCookie) setCart(JSON.parse(decodeURIComponent(cartCookie)));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <div className="row">
            {cart.map((item) => (
              <div key={`${item.id}-${Math.random()}`} className="col-md-3 mb-3">
                <div className="card p-2">
                  <img src={item.image} alt={item.title} style={{ height: "100px", objectFit: "contain" }} />
                  <div className="card-body p-2">
                    <h6>{item.title}</h6>
                    <p>${item.price} × {item.quantity} = ${item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
