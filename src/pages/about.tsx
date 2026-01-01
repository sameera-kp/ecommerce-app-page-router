import Navbar from "./components/Navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <h2>About Us</h2>
        <p>We are a fictional e-commerce store built with Next.js Pages Router!</p>
      </div>
    </div>
  );
}
