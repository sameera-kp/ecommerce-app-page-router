import { GetServerSideProps } from "next";
import { Product } from "../types/product";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";

interface Props {
  products: Product[];
}

export default function Home({ products }: Props) {
  const offerProducts = products.slice(0, 4); // example offers

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <h2 className="mb-4 text-center">🔥 Today's Offers</h2>
        <div className="row">
          {offerProducts.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <ProductCard product={product} showOffer />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();
  return { props: { products } };
};
