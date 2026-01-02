import { GetServerSideProps } from "next";
import { Product } from "../../types/product";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

interface Props {
  product: Product | null;
  products: Product[];
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

  // Related products: 4 products excluding current
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <div className="container mt-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Product */}
      <div className="container my-5">
        <div className="row">
          {/* Image */}
          <div className="col-md-6 text-center">
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "350px", objectFit: "contain" }}
            />
          </div>

          {/* Details */}
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

// Fetch product + all products for related section
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params!.id); // convert to number

  if (isNaN(id)) {
    // invalid ID → show not found
    return { props: { product: null, products: [] } };
  }

  try {
    // Fetch product and all products
    const [productRes, productsRes] = await Promise.all([
      fetch(`https://fakestoreapi.com/products/${id}`, { cache: "no-store" }),
      fetch("https://fakestoreapi.com/products", { cache: "no-store" }),
    ]);

    if (!productRes.ok) {
      return { props: { product: null, products: [] } };
    }

    const product: Product = await productRes.json();
    const products: Product[] = await productsRes.json();

    return {
      props: { product, products },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { props: { product: null, products: [] } };
  }
};
