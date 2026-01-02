import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { Product } from "../../types/product";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h3>Products</h3>
        <div className="row">
          {products.map(p => (
            <div key={p.id} className="col-md-3 mb-4">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
