<script lang="ts">
  import { pop, params } from "svelte-spa-router";
  import backSvg from "../assets/back.svg";
  import { getTrackSongs } from "../api/index";
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Loading from "../components/Loading.svelte";

  let durationStep: number = 1;
  let loading: boolean = true;
  let songs = [];

  const [receive] = crossfade({
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;
      durationStep = durationStep + 0.04;
      return {
        duration: 600 * durationStep,
        easing: quintOut,
        css: (t) => {
          return `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`;
        },
      };
    },
  });
  $: if ($params?.id) {
    requestSongs();
  }

  const requestSongs = async () => {
    let res = await getTrackSongs({
      id: $params.id,
      limit: null,
      offset: 0,
    });
    loading = false;
    songs = res.songs;
  };
  // params.subscribe(async (data) => {
  //   id = data?.id;
  // });
</script>

<div class="album-container">
  <header>
    <div on:click={() => pop()} class="back-icon">
      <img src={backSvg} alt="" />
    </div>
    <div class="title">歌曲列表</div>
  </header>
  <div class="content">
    {#if !loading}
      <div class="songs">
        {#each songs as song (song.id)}
          <div in:receive={{ key: song.id }} animate:flip class="song">
            {song.name}
          </div>
        {/each}
      </div>
    {:else}
      <Loading class="loading-icon" />
    {/if}
  </div>
</div>

<style scoped type="text/scss" lang="scss">
  .album-container {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    height: 100vh;
    header {
      background-color: #f0a1a8;
      display: flex;
      align-items: center;
      height: 32px;
      .back-icon {
        display: flex;
        align-items: center;
        margin-left: 12px;
        img {
          width: 24px;
          height: 24px;
        }
      }
      .title {
        flex: 1;
        text-align: center;
        margin-right: 36px;
      }
    }
    .content {
      height: calc(100vh - 32px);
      overflow: auto;
      display: flex;
      justify-content: center;
      .songs {
        width: 100%;
        .song {
          background: #ff4400;
        }
      }
    }
  }
</style>
