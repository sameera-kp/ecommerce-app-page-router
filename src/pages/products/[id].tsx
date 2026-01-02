import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Product } from "../../types/product";
import Navbar from "../components/Navbar";

interface Props {
  product: Product | null;
}

export default function ProductDetails({ product }: Props) {
  const router = useRouter();

  if (!product) {
    return (
      <div>
        <Navbar />
        <p className="text-center mt-5">Product not found</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "300px" }}
            />
          </div>

          <div className="col-md-6">
            <h2>{product.title}</h2>
            <h4 className="text-success">${product.price}</h4>
            <p>{product.description}</p>

            <button className="btn btn-primary mt-3">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    return {
      props: { product },
    };
  } catch (error) {
    return {
      props: { product: null },
    };
  }
};
