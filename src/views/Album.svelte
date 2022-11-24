<script lang="ts">
  import { pop, params } from "svelte-spa-router";
  import backSvg from "../assets/back.svg";
  import { getTrackSongs } from "../api/index";
  import { onMount } from "svelte";
  let songs = [];
  params.subscribe(async (data) => {
    if (data !== undefined && data.id) {
      let res = await getTrackSongs({
        id: data.id,
        limit: null,
        offset: 0,
      });
      songs = res.songs;
    }
  });
</script>

<div class="album-container">
  <header>
    <div on:click={() => pop()} class="back-icon">
      <img src={backSvg} alt="" />
    </div>
    <div class="title">歌曲列表</div>
  </header>
  <div class="content">hi</div>
</div>

<style scoped lang="scss" type="text/scss">
  .album-container {
    background-color: #ffffff;
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
  }
</style>
