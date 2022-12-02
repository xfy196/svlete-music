<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./route/index";
</script>

<main>
  <div class="main">
    <Router {routes} />
  </div>
</main>
