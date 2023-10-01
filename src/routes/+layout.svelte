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

    const redirect = async (n) => {
        $pageName = n;
        $transitioning = true;
    };

    afterNavigate( async () => {
        $transitioning = false;
	});

</script>

<svelte:head>
	<title>{$pageTitlebar}</title>
</svelte:head>

<div class="navigation">
	{#each navigation as button}
		<a href={button.path} on:click={() => redirect(button.pagePreview)}>
			{button.title}
		</a>
	{/each}
</div>

<slot/>

<style>
	.navigation {
		gap: 10px;
		display: flex;
	}

	a {
		padding: 10px;
		background: greenyellow;
		border-radius: 5px;
	}
</style>