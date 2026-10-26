import Link from "next/link";
import { getProduct } from "../../lib/products";

export default function ProductDetails({ product, source }) {
  return (
    <article className="max-w-3xl mx-auto">
      <Link href="/products" className="text-amber-600 hover:underline">
        &larr; Back to all products
      </Link>
      {source === "snapshot" && (
        <p className="mt-6 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-600">
          Live Fake Store API was unreachable, so this page is showing a
          bundled snapshot of the genuine Fake Store product data.
        </p>
      )}
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center border border-slate-200 rounded-lg p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="max-h-72 object-contain"
          />
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500 mb-1">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl text-amber-600 font-bold mb-4">
            ${product.price}
          </p>
          <p className="text-slate-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export async function getServerSideProps({ params }) {
  const { product, source } = await getProduct(params.id);
  if (!product) {
    return { notFound: true };
  }
  return { props: { product, source } };
}
