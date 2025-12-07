<script lang="ts">
  import { marked } from "marked";
  import { browser } from "$app/environment";

  export let data;
  // CUSTOM LINK RENDERER → forces target="_blank"
  const renderer = new marked.Renderer();

renderer.link = ({ href, title, tokens }) => {
  // tokens → markdown child tokens → convert back to HTML
  const text = tokens ? marked.parser(tokens) : href;

  const t = title ? ` title="${title}"` : "";

  return `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`;
};


  marked.setOptions({ renderer });
  const md = (text: string) => marked.parse(text || "");

  function formatTimestamp(created_at: string): string {
    // On the server, just show the raw string to avoid weird timezone behavior.
    if (!browser) return created_at;

    // D1 typically returns "YYYY-MM-DD HH:MM:SS" in UTC.
    // We normalize it to ISO and explicitly mark it as UTC with "Z".
    let iso = created_at;

    if (!iso.endsWith("Z")) {
      if (iso.includes("T")) {
        // e.g. "2025-12-07T21:50:00"
        iso = iso + "Z";
      } else {
        // e.g. "2025-12-07 21:50:00" -> "2025-12-07T21:50:00Z"
        iso = iso.replace(" ", "T") + "Z";
      }
    }

    const date = new Date(iso);

    return date.toLocaleString("en-US", {
      // your browser's local timezone (America/Chicago for you)
      dateStyle: "medium",
      timeStyle: "short"
    });
  }
</script>

<h1>it's yocuri.live <i>!</i></h1>

{#if data.posts.length === 0}
  <p>Development zone (let's get connected to Cloudflare!</p>
{/if}

{#each data.posts as post}
  <article class="post">
    <p class="timestamp">
      {formatTimestamp(post.created_at)}
    </p>

    <h2>{post.title}</h2>

    <div class="content">
      {@html md(post.content)}
    </div>

    {#if post.image_url}
      <img src={post.image_url} alt=" " style="max-width: 300px;" />
    {/if}

    <hr />
  </article>
{/each}