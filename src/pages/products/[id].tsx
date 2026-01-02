import { GetServerSideProps } from "next";
import { Product } from "../../types/product";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

interface Props {
  product: Product | null;
  products: Product[]; // all products for related items
}

export default function ProductDetails({ product, products }: Props) {
  if (!product) {
    return (
      <div>
        <Navbar />
        <p className="text-center mt-5">Product not found</p>
      </div>
    );
  }

  // show 4 related products excluding current one
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Product */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "300px", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-6">
            <h2>{product.title}</h2>
            <h4 className="text-success">${product.price}</h4>
            <p>{product.description}</p>
            <button className="btn btn-primary mt-3">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container my-5">
          <h3 className="mb-4 text-center">🔥 You may also like</h3>
          <div className="row">
            {relatedProducts.map((p) => (
              <div key={p.id} className="col-md-3 mb-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    // Fetch main product
    const productRes = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await productRes.json();

    // Fetch all products (for related products)
    const productsRes = await fetch("https://fakestoreapi.com/products");
    const products: Product[] = await productsRes.json();

    return {
      props: { product, products },
    };
  } catch (error) {
    return {
      props: { product: null, products: [] },
    };
  }
};
