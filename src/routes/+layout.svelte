<script>
    import { websiteTag, pageName, titlebarScroller, pageTitlebar, loadingIco } from "$lib/titlebar.js";
	import { deviceType, pageLoaded, transitioning } from "$lib/writables.js";
	import { navigation } from "$lib/directories.js";

    import Device from "svelte-device-info";
    import { onMount } from "svelte";
    import { afterNavigate } from "$app/navigation";

    onMount(async () => {
        switch (true) {
            case Device.isPhone:  	$deviceType = 0; break;
            case Device.isTablet: 	$deviceType = 1; break;
            default:      			$deviceType = 2; break;}
		$pageLoaded = true;
    });

    $: $deviceType === 2 ?
		$transitioning !== true ?
			titlebarScroller(`${$pageName} 𝚊𝚝 ${websiteTag} // `) :
            $pageTitlebar = loadingIco
		: $pageTitlebar = "Mobile Website";

    let pageLocation = "/";

    const redirect = async (n, l) => {
        $pageName = n;
        pageLocation = l;
        $transitioning = true;
    };

    afterNavigate( async () => {
        $transitioning = false;
	});

</script>

<svelte:head>
	<title>{$pageTitlebar}</title>
</svelte:head>

<div class="navigationWrapper">
	<div class="navigation">
		{#each navigation as button}
			<a href={button.path}
			   class:located={pageLocation === button.path}
			   on:click={() => redirect(button.pagePreview, button.path)}>
				{button.title}
			</a>
		{/each}
	</div>
	<div class="path">
		<h1> Current Route: {pageLocation} </h1>
	</div>
</div>

<div class="body">
	<slot/>
</div>

<style>
	.navigationWrapper {
		height: 	100%;
		padding: 	10px;

		gap: 		10px;
		display: 	flex;

		background: 	black;
		border-radius: 	10px;
	}
	.navigation {
		gap: 		10px;
		display: 	flex;
	}
	.path {
		margin: auto 0;
	}

	a {
		padding: 		10px;
		background: 	#ffffff;
		border-radius: 	5px;
		color: 			black;
	}
	a:hover {
		background: 	gray;
	}
	.located {
		background: 	mediumpurple;
		color: 			white;
	}
	.located:hover {
		background: 	rebeccapurple;
	}

	.body {
		padding: 10px;
	}
</style>