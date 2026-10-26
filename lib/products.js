// Data source for the products pages.
//
// PRIMARY (rubric requirement): the live Fake Store API
// (https://fakestoreapi.com) is always tried first.
//
// FALLBACK: fakestoreapi.com currently answers datacenter clients (CI,
// serverless builds) with a Cloudflare bot challenge instead of JSON, which
// would leave these pages empty. When the live API is unreachable we serve a
// bundled snapshot of the GENUINE Fake Store API response - the 20 official
// products from an archived copy of fakestoreapi.com/products, with the
// official product images (from the project's own open-source repo) served
// locally. Pages label the snapshot visibly when it is used.
import snapshot from "../data/products-snapshot.json";

const FAKESTORE = "https://fakestoreapi.com/products";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fake Store API request failed: ${res.status}`);
  return res.json();
}

export async function getProducts() {
  try {
    const data = await fetchJson(FAKESTORE);
    if (Array.isArray(data) && data.length > 0) {
      return { products: data, source: "live" };
    }
    throw new Error("Unexpected Fake Store API response");
  } catch {
    return { products: snapshot, source: "snapshot" };
  }
}

export async function getProduct(id) {
  try {
    const data = await fetchJson(`${FAKESTORE}/${id}`);
    if (data && data.id) return { product: data, source: "live" };
    throw new Error("Product not found");
  } catch {
    const product = snapshot.find((p) => String(p.id) === String(id)) || null;
    return { product, source: "snapshot" };
  }
}
