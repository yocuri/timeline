export async function onRequestGet({ env }) {
  const db = env.cf_timeline;

  const { results } = await db.prepare(
    "SELECT * FROM posts ORDER BY created_at DESC"
  ).all();

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function onRequestPost({ request, env }) {
  const user = request.headers.get("cf-access-authenticated-user-email");

  if (user !== "YOUR_EMAIL@HERE.com") {
    return new Response("Unauthorized", { status: 401 });
  }

  const form = await request.formData();
  const title = form.get("title");
  const content = form.get("content");
  const image_url = form.get("image_url");

  const db = env.cf_timeline;

  await db.prepare(
    "INSERT INTO posts (title, content, image_url) VALUES (?, ?, ?)"
  ).bind(title, content, image_url).run();

  return Response.redirect("/admin", 303);
}
