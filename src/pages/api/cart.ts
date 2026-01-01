import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../types/product";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const newProduct: Product = req.body;
    let cart: any[] = [];

    const cartCookie = req.cookies.cart;
    if (cartCookie) {
      try {
        cart = JSON.parse(cartCookie);
      } catch {}
    }

    const existing = cart.find((p) => p.id === newProduct.id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...newProduct, quantity: 1 });

    res.setHeader(
      "Set-Cookie",
      `cart=${encodeURIComponent(JSON.stringify(cart))}; Path=/; Max-Age=${60*60*24*7}`
    );
    res.status(200).json({ message: "Product added to cart!" });
  } else {
    res.status(405).end();
  }
}
