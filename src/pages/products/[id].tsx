import { GetServerSideProps } from "next";
import { Product } from "../../types/product";
import Navbar from "../components/Navbar";

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <h2>{product.title}</h2>
        <img src={product.image} alt={product.title} style={{ height: "300px", objectFit: "contain" }} />
        <p>{product.description}</p>
        <p className="fw-bold">${product.price}</p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product: Product = await res.json();
  return { props: { product } };
};
