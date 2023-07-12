<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/calculate">Calculate</a>
</nav>

<slot />

<!-- layout.svelte -->
<style>
	nav {
		background-color: #007bff;
		padding: 10px;
	}

	nav a {
		color: #fff;
		margin-right: 10px;
		text-decoration: none;
	}

	nav a:hover {
		text-decoration: underline;
	}

	slot {
		display: block;
		margin-top: 20px;
	}
</style>
