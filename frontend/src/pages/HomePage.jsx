import { Link } from "react-router-dom";

function HomePage() {
  return (
  <section className="bg-zinc-800 flex justify-center items-center">
    <header className="bg-zinc-800 p-10">
      <h1 className="text-5xl py-2 font-bold">Bienvenido a Markplace Magic</h1>
      <p className="text-md text-slate-400">
        El ecommerce para comprar al por mayor.
      </p>

      <Link
        className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
        to="/register"
      >
        Comenzar
      </Link>
    </header>
  </section>
  );
}

export default HomePage;
