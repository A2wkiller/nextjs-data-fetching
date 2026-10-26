# nextjs-data-fetching

Next.js (Pages Router) + Tailwind CSS assignment covering data fetching
strategies and API routes.

## Pages & Features

- `/` - Home. Fetches the custom API route `/api/hello` in the browser and
  displays its message.
- `/products` - **SSG**. `getStaticProps` fetches products from the
  [Fake Store API](https://fakestoreapi.com) at build time and shows title,
  price, and thumbnail in a responsive grid. `revalidate: 60` enables
  Incremental Static Regeneration (ISR).
- `/products/[id]` - **SSR**. `getServerSideProps` fetches one product at
  request time and shows title, description, category, price, and image.

### Product data source note

The live Fake Store API is always fetched first. fakestoreapi.com currently
answers some datacenter clients (CI/serverless builds) with a Cloudflare bot
challenge instead of JSON; when that happens the pages fall back to a bundled
snapshot of the genuine Fake Store API product data (20 official products,
archived from `fakestoreapi.com/products`, with the official images from the
project's open-source repo served locally) and label it visibly on the page.

- `/dashboard` - **CSR**. `useSWR` fetches posts from
  [JSONPlaceholder](https://jsonplaceholder.typicode.com), lists post titles,
  auto-refreshes every 10 seconds, and shows a loading spinner.
- `/api/hello` - Custom API route returning
  `{ "message": "Hello from Next.js API Route!" }`.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Deployed on Vercel; pushes to `main` auto-deploy.
