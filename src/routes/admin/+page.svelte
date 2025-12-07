<script>
  export let data;
</script>

<h1>Admin Dashboard</h1>

<!-- CREATE NEW POST -->
<form method="POST" action="/api/posts">
  <input name="title" placeholder="Title" required />

  <textarea name="content" placeholder="Write something..." required></textarea>

  <input name="image_url" placeholder="Image URL (optional)" />

  <button>Post</button>
</form>

<hr />

<h1>Edit Posts</h1>

{#each data.posts as post}
  <details style="margin-bottom: 1rem;">
    <summary>
      {post.title} — {new Date(post.created_at).toLocaleString()}
    </summary>

    <!-- UPDATE FORM -->
    <form method="post" action="?/update">
      <input type="hidden" name="id" value={post.id} />
<label for="title-{post.id}">Title</label>
<input id="title-{post.id}" name="title" value={post.title} />

<label for="content-{post.id}">Content</label>
<textarea id="content-{post.id}" name="content">{post.content}</textarea>

<label for="img-{post.id}">Image URL</label>
<input id="img-{post.id}" name="image_url" value={post.image_url} />
      <button type="submit">Save</button>
    </form>

    <!-- DELETE FORM -->
    <form method="post" action="?/delete">
      <input type="hidden" name="id" value={post.id} />
      <button type="submit" class="delete-btn">Delete</button>
    </form>
  </details>
{/each}
