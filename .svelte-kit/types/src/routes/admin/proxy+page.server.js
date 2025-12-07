// @ts-nocheck
/** @param {Parameters<import('./$types').PageServerLoad>[0]} event */
export async function load({ platform }) {
  const db = platform?.env?.cf_timeline;


  const { results } = await db
    .prepare(
      "SELECT id, title, content, image_url, created_at FROM posts ORDER BY created_at DESC"
    )
    .all();

  return {
    posts: results
  };
}

/** */
export const actions = {
  update:/** @param {import('./$types').RequestEvent} event */  async ({ platform, request }) => {
    const db = platform?.env?.cf_timeline;


    const form = await request.formData();
    const id = form.get("id");
    const title = form.get("title");
    const content = form.get("content");
    const image_url = form.get("image_url");

    await db
      .prepare(
        `
        UPDATE posts
        SET title = ?, content = ?, image_url = ?
        WHERE id = ?
      `
      )
      .bind(title, content, image_url, id)
      .run();

    return { updated: true };
  },

  delete:/** @param {import('./$types').RequestEvent} event */  async ({ platform, request }) => {
    const db = platform?.env?.cf_timeline;


    const form = await request.formData();
    const id = form.get("id");

    await db.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();

    return { deleted: true };
  }
};
