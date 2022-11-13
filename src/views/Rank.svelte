<script lang="ts">
  import { onMount } from "svelte";

  import Loading from "../components/Loading.svelte";
  let loading: boolean = true;
  onMount(() => {
    loading = false;
  });
</script>

<div class="rank__container">
  {#if !loading}
    <p>rank</p>
  {:else}
    <Loading />
  {/if}
</div>

<style lang="scss" type="text/scss" scoped></style>
