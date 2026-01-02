import { useEffect, useState } from "react";
import { Product } from "../types/product";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <h2 className="mb-4 text-center">🔥 Today's Offers</h2>

        {products.length === 0 ? (
          <p className="text-center text-muted">Loading products...</p>
        ) : (
          <div className="row">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="col-md-3 mb-4">
                <ProductCard product={product} showOffer />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
