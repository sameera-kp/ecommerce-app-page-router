import Link from "next/link";
import { Product } from "@/types/product";

interface Props {
  product: Product;
  showOffer?: boolean;
}

export default function ProductCard({ product, showOffer = false }: Props) {
  if (!product) return null; // prevent crash

  return (
    <div className="card h-100 position-relative">
      {showOffer && (
        <span className="badge bg-danger position-absolute top-0 start-0 m-2">
          OFFER
        </span>
      )}

      <img
        src={product.image || "/placeholder.png"}
        className="card-img-top p-3"
        style={{ height: "220px", objectFit: "contain" }}
        alt={product.title}
      />

      <div className="card-body">
        <h6>{product.title}</h6>
        <p className="fw-bold">${product.price}</p>

        {/* FIXED Link: no optional chaining, guaranteed ID */}
        <Link href={`/products/${product.id}`} className="btn btn-primary w-100">
          View Details
        </Link>
      </div>
    </div>
  );
}

