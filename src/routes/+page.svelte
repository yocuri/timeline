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

<div id="headline">it's yocuri.live <i>!</i></div>

{#if data.posts.length === 0}
  <p style="padding-top:30px;">Development zone (let's get connected to Cloudflare!)
    <br>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam odio libero, dapibus in augue quis, semper ultrices ex. Phasellus in scelerisque mi. Donec lacinia purus justo, eget malesuada metus tincidunt ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In a elementum ligula, lobortis condimentum nisi. Pellentesque tincidunt varius sapien, id sagittis lorem. Etiam suscipit odio vitae nulla dignissim ultrices. Aliquam in diam aliquet, sagittis lectus vitae, lacinia nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus.
<br><br>
Nulla quis sapien lobortis, lacinia dui in, tristique dui. Donec tincidunt tristique risus, id sodales justo ultricies et. Donec elementum sollicitudin arcu nec tempor. Maecenas imperdiet ante sapien, vitae dictum ante lobortis in. Integer a tellus et lectus auctor mollis vel at nibh. Proin at mauris hendrerit mauris pretium ornare ut in sem. Fusce sodales nibh aliquet, sagittis lorem vitae, tempor felis. Nullam iaculis, ligula a tincidunt tristique, nulla ante varius nulla, et pellentesque ipsum turpis sit amet felis. Aliquam nisi risus, finibus imperdiet orci cursus, tincidunt feugiat metus. Suspendisse hendrerit eu orci non placerat.
<br><br>
Cras eget ultrices felis. Ut ac urna id mauris consequat semper. Nam ac felis suscipit, euismod orci quis, mollis eros. Vivamus efficitur arcu at libero dapibus, vel commodo est cursus. In velit eros, viverra eget varius at, interdum quis sapien. Nullam a cursus est. Etiam condimentum fringilla enim cursus sollicitudin. In elementum efficitur mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce non orci erat.
<br><br>
Mauris pulvinar posuere odio. Duis eget leo risus. Curabitur feugiat mi quis lacus scelerisque, vitae rutrum arcu pellentesque. In tristique mi enim, sit amet viverra neque ullamcorper ac. Nullam vel porttitor erat. Fusce aliquet dictum nisi sed posuere. Fusce ultricies risus a nibh tempus sollicitudin.
<br><br>
Sed tincidunt eleifend augue eget convallis. Cras ornare semper pharetra. Cras velit libero, vulputate sed tortor non, tempor tincidunt ex. Morbi molestie, purus sit amet aliquet pulvinar, est ligula aliquet risus, ac aliquet lorem dolor ut massa. Suspendisse potenti. Donec lorem purus, laoreet sit amet quam eu, convallis congue neque. Etiam pretium blandit metus et dapibus. Sed mollis auctor accumsan. Nunc eget libero eleifend lacus tempor vestibulum sed sit amet lacus. Curabitur efficitur cursus nibh non vulputate. Vestibulum volutpat ipsum nibh, quis lacinia augue ullamcorper egestas. Donec sed metus bibendum diam iaculis ullamcorper sit amet sed libero. Duis varius posuere mauris, ut consectetur nunc faucibus vel. Suspendisse congue, eros quis ornare mollis, massa nisl mollis lorem, mattis vehicula arcu tortor non nulla. Cras ut ligula arcu. Sed vel bibendum odio.

  </p>
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