import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ProductCard from "../components/ProductCard";
import { Product } from "../../types/product";
import Navbar from "../components/Navbar";

export default function Products({ products }: { products: Product[] }) {
  const router = useRouter();
  const search = router.query.search?.toString().toLowerCase() || "";

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search)
  );

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h3>Products</h3>
        <div className="row">
          {filtered.map(product => (
            <div key={product.id} className="col-md-3 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  return { props: { products } };
};
