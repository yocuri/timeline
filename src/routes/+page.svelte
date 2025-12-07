<script lang="ts">
	import { onMount } from 'svelte';
	
	let posts: Array<{ 
		id: number;
		title: string;
		body: string;
		created_at: string;
		image_url?: string | null;
	}> = [];
	
	onMount(async () => {
		const res = await fetch('/api/posts');
		posts = await res.json();
	});
</script>


<h1>Lauren’s Timeline</h1>

{#if posts.length === 0}
  <p>No posts yet… but soon 😌</p>
{/if}

{#each posts as post}
  <article>
    <h2>{post.title}</h2>
    <p>{post.body}</p>

    {#if post.image_url}
      <img src={post.image_url} alt="post image" style="max-width: 300px;">
    {/if}

    <small>{new Date(post.created_at).toLocaleString()}</small>
    <hr />
  </article>
{/each}
