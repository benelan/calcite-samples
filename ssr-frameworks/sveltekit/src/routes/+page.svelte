<script>
    import MapView from "@arcgis/core/views/MapView"
    import "@arcgis/core/assets/esri/themes/light/main.css"

    const createMap = (domNode) => {
        view = new MapView({
            container: domNode,
            map: {
                basemap: "topo-vector",
            },
            center: [5.25, 52.14],
            zoom: 8,
        })
    }
</script>

<main>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
    <div use:createMap></div>
</main>
