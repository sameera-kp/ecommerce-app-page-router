
import Link from "next/link";
import { Product } from "@/types/product";

interface Props {
  product: Product;
  showOffer?: boolean;
}

export default function ProductCard({ product, showOffer = false }: Props) {
  if (!product) return null; // ⚡ prevent crash if product is undefined

  return (
    <div className="card h-100 position-relative">
      {showOffer && (
        <span className="badge bg-danger position-absolute top-0 start-0 m-2">
          OFFER
        </span>
      )}
      <img
        src={product?.image ?? "/placeholder.png"} // fallback image
        className="card-img-top p-3"
        style={{ height: "220px", objectFit: "contain" }}
        alt={product?.title ?? "Product"}
      />
      <div className="card-body">
        <h6>{product?.title ?? "No Title"}</h6>
        <p className="fw-bold">${product?.price ?? 0}</p>
        <Link
          href={`/products/${product?.id ?? "#"}`} // fallback link
          className="btn btn-primary w-100"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
