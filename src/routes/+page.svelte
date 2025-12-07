<script lang="ts">
  import { marked } from "marked";
  export let data;

  marked.setOptions({});


  const md = (text: string) => marked.parse(text || "");
</script>

<h1>Lauren’s Timeline</h1>

{#if data.posts.length === 0}
  <p>No posts yet… but soon 😌</p>
{/if}

{#each data.posts as post}
  <article class="post">
    <p class="timestamp">
  {#if browser}
    {new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(post.created_at))}
  {/if}
</p>


    <h2>{post.title}</h2>

    <!-- MARKDOWN CONTENT -->
    <div class="content">
  {@html md(post.content)}
</div>
    {#if post.image_url}
      <img src={post.image_url} alt="post image" style="max-width: 300px;">
    {/if}

    <hr />
  </article>
{/each}
