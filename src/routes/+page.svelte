<script lang="ts">
  export let data;
</script>

<h1>Lauren’s Timeline</h1>

{#if data.posts.length === 0}
  <p>No posts yet… but soon 😌</p>
{/if}

{#each data.posts as post}
  <article class="post">
    <p class="timestamp">
      {new Date(post.created_at).toLocaleString()}
    </p>

    <h2>{post.title}</h2>

    <p>{post.content}</p>

    {#if post.image_url}
      <img src={post.image_url} alt="post image" style="max-width: 300px;">
    {/if}

    <hr />
  </article>
{/each}
