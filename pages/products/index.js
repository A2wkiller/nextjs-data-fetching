import Link from "next/link";
import { getProducts } from "../../lib/products";

export default function Products({ products, source }) {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">Products</h1>
      <p className="text-slate-600 mb-6">
        Statically generated at build time with getStaticProps (SSG) from the
        Fake Store API, and revalidated every 60 seconds (ISR).
      </p>
      {source === "snapshot" && (
        <p className="mb-6 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-600">
          Live Fake Store API was unreachable, so this page is showing a
          bundled snapshot of the genuine Fake Store product data.
        </p>
      )}
      {products.length === 0 ? (
        <p className="text-slate-500">No products available right now.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="border border-slate-200 rounded-lg p-5 flex flex-col hover:shadow-md transition"
            >
              <div className="h-40 flex items-center justify-center mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-40 object-contain"
                />
              </div>
              <h2 className="font-semibold mb-2 line-clamp-2">
                {product.title}
              </h2>
              <p className="mt-auto text-amber-600 font-bold">
                ${product.price}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export async function getStaticProps() {
  try {
    const { products, source } = await getProducts();
    return {
      props: { products, source },
      revalidate: 60, // Incremental Static Regeneration
    };
  } catch {
    return { props: { products: [], source: "snapshot" }, revalidate: 60 };
  }
}
