<script lang="ts">
    import {link} from "svelte-spa-router"
  import active from "svelte-spa-router/active";

</script>
<nav class="nav">
    <ul class="nav-list">
      <li class="item">
        <a
          use:active={{
            path: "/(\/{1})|(\/home)/",
            className: "active",
          }}
          use:link={{ href: "/home" }}
          target="_self">推荐</a
        >
      </li>
      <li class="item">
        <a
          use:active={{
            path: "/rank",
            className: "active",
          }}
          use:link={{ href: "/rank" }}
          target="_self">排行榜</a
        >
      </li>
    </ul>
  </nav>
<style type="text/scss" lang="scss" scoped>
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
        a {
          font-weight: bolder;
          color: rgba($color: #000000, $alpha: 0.6);
        }
        :global(.active) {
          color: #ffffff;
        }
      }
    }
  }
</style>
