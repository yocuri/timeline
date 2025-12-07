export async function onRequestGet({ env }) {
  const stmt = env.DB.prepare("SELECT * FROM posts ORDER BY created_at DESC");
  const posts = await stmt.all();
  return new Response(JSON.stringify(posts.results), {
    headers: { "Content-Type": "application/json" }
  });
}