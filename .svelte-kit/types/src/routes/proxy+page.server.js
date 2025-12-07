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
