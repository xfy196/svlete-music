<script lang="ts">
  import Router from "svelte-spa-router";
  import routes from "./route/index";
</script>

<main>
  <div class="main">
    <Router {routes} />
  </div>
</main>

<style lang="scss" type="text/scss" scoped>
  .main {
    height: calc(100vh - 64px);
    overflow: auto;
  }
</style>
