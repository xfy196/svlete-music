<script lang="ts">
  import Router, { link } from "svelte-spa-router";
  import routes from "./route/index";
  let path = location.hash;
  const changePath = () => {
    path = location.hash;
  };
</script>

<main>
  <div class="header">
    <div class="title">小荧音乐</div>
  </div>
  <nav class="nav">
    <ul class="nav-list">
      <li
        on:click={changePath}
        class={path === "#/home" || path === "#" ? "active item" : "item"}
      >
        <a use:link={{ href: "/home" }} target="_self">推荐</a>
      </li>
      <li
        on:click={changePath}
        class={path === "#/rank" || path === "#" ? "active item" : "item"}
      >
        <a use:link={{ href: "/rank" }} target="_self">排行榜</a>
      </li>
    </ul>
  </nav>
  <div class="main">
    <Router {routes} />
  </div>
</main>

<style lang="scss" type="text/scss" scoped>
  .header {
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0a1a8;
    .title {
      color: rgba($color: #000000, $alpha: 1);
    }
  }
  .nav {
    width: 100%;
    height: 32px;
    background-color: #f0a1a8;
    .nav-list {
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .item {
        &.active {
          a {
            color: #ffffff;
          }
        }
        a {
          font-weight: bolder;
          color: rgba($color: #000000, $alpha: 0.6);
        }
      }
    }
  }
</style>
