import { y as ensure_array_like, x as attr } from "../../chunks/index.js";
import { e as escape_html } from "../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let posts = [];
    $$renderer2.push(`<h1>Lauren’s Timeline</h1> `);
    if (posts.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p>No posts yet… but soon 😌</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array = ensure_array_like(posts);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post = each_array[$$index];
      $$renderer2.push(`<article><h2>${escape_html(post.title)}</h2> <p>${escape_html(post.body)}</p> `);
      if (post.image_url) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<img${attr("src", post.image_url)} alt="post image" style="max-width: 300px;"/>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <small>${escape_html(new Date(post.created_at).toLocaleString())}</small> <hr/></article>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
