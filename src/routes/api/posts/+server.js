// GET /api/posts
export async function GET({ platform }) {
  const db = platform?.env?.cf_timeline;


  const { results } = await db
    .prepare("SELECT * FROM posts ORDER BY created_at DESC")
    .all();

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}

// POST /api/posts
export async function POST({ request, platform }) {
  const db = platform?.env?.cf_timeline;

  const form = await request.formData();
  const title = form.get("title");
  const content = form.get("content");
  const image_url = form.get("image_url");

  await db
    .prepare(
      "INSERT INTO posts (title, content, image_url) VALUES (?, ?, ?)"
    )
    .bind(title, content, image_url)
    .run();

  return new Response("Created", { status: 201 });
}
