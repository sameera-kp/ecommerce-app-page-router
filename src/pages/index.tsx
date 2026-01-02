import { GetStaticProps } from "next";
import { Product } from "../types/product";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";

interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
  const offerProducts = Array.isArray(products) ? products.slice(0, 4) : [];

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <h2 className="mb-4 text-center">🔥 Today's Offers</h2>

        {offerProducts.length === 0 ? (
          <p className="text-center text-muted">
            No products available
          </p>
        ) : (
          <div className="row">
            {offerProducts.map((product) => (
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    return {
      props: { products },
      revalidate: 60, // refresh every 1 minute
    };
  } catch (error) {
    return {
      props: { products: [] },
    };
  }
};
