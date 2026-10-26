import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR("https://jsonplaceholder.typicode.com/posts", fetcher, {
    refreshInterval: 10000, // auto-refresh every 10 seconds
  });

  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-slate-600 mb-6">
        Client-side rendered with useSWR from JSONPlaceholder. The list
        auto-refreshes every 10 seconds.
      </p>

      {isLoading && (
        <div className="flex items-center gap-3 text-slate-600">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-amber-500" />
          Loading...
        </div>
      )}

      {error && (
        <p className="text-red-600">Failed to load posts. Retrying soon...</p>
      )}

      {posts && (
        <ul className="space-y-3">
          {posts.slice(0, 10).map((post) => (
            <li
              key={post.id}
              className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition"
            >
              <span className="text-slate-400 text-sm mr-2">#{post.id}</span>
              <span className="font-medium">{post.title}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
