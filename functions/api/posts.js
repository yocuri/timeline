export async function onRequestGet({ env }) {
  const { results } = await env.cf_timeline
    .prepare("SELECT * FROM posts ORDER BY created_at DESC")
    .all();

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost({ request, env }) {
  const form = await request.formData();

  const title = form.get("title");
  const content = form.get("content");
  const image_url = form.get("image_url");

  await env.cf_timeline
    .prepare("INSERT INTO posts (title, content, image_url) VALUES (?, ?, ?)")
    .bind(title, content, image_url)
    .run();

  return new Response("Created", { status: 201 });
}
