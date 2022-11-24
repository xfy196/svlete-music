<script lang="ts">
  import Loading from "../components/Loading.svelte";
  import { push } from "svelte-spa-router";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import { Pagination, Autoplay } from "swiper";
  import Header from "../layout/Header.svelte";
  import Nav from "../layout/Nav.svelte";
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/autoplay";
  import MeScroll from "mescroll.js";
  import "mescroll.js/mescroll.min.css";
  import { getBanner, getPersonalized } from "../api/index";
  import { onMount } from "svelte";
  let lazyloadUrl =
    "https://via.placeholder.com/150/f0a1a8/ffffff?Text=loading";
  let banners: Array<any> = [];
  let list: Array<any> = [];
  let hasMore: boolean = false;
  let scrollDom: HTMLDivElement;
  let imgEls: Array<HTMLImageElement> = [];
  let mescroll;
  let loading: boolean = true;
  onMount(() => {
    initRequest();
  });
  $: if (scrollDom) {
    mescroll = new MeScroll(scrollDom, {
      down: {
        auto: true,
        offset: 50,
        callback: downCallback,
      },
      up: {
        use: false,
        lazyLoad: {
          use: true,
        },
      },
    });
    // 下拉刷新的回调
    async function downCallback(mescroll) {
      await initRequest();
      mescroll.endSuccess();
    }
  }
  $: if (imgEls.length === list.length) {
    new LazyLoad(imgEls);
  }
  const handleImageLoad = (e: any) => {
    imgEls.push(e.target);
  };
  const initRequest: () => Promise<void> = async () => {
    await getBannerRequest();
    await getPersonalizedRequest();
    loading = false;
  };
  // 获取推荐列表数据
  const getPersonalizedRequest: () => Promise<any> = async () => {
    let res = await getPersonalized();
    hasMore = res.hasMore;
    list = res.result;
    try {
    } catch (error) {
      console.log(error);
    }
  };
  // 获取banner图的操作
  const getBannerRequest: () => Promise<any> = async () => {
    try {
      let res: any = await getBanner();
      banners = res.banners;
    } catch (error) {
      console.log(error);
    }
  };
</script>

<Header />
<Nav />
<div class="home__container">
  {#if !loading}
    <div class="mescroll" bind:this={scrollDom}>
      <div class="banner">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay
        >
          {#each banners as banner (banner.imageUrl)}
            <SwiperSlide>
              <div class="banner_item">
                <img
                  imgUrl={banner.imageUrl}
                  src={banner.imageUrl}
                  alt={banner.typeTitle}
                />
              </div>
            </SwiperSlide>
          {/each}
        </Swiper>
      </div>
      <div class="recommend-list">
        {#if list.length > 0}
          <div class="title">推荐歌单</div>
        {/if}
        <ul class="list">
          {#each list as item (item.id)}
            <li class="list-item" on:click={() => push(`/album/${item.id}`)}>
              <img
                class="lazyload"
                on:load={handleImageLoad}
                data-src={item.picUrl}
                src={lazyloadUrl}
                alt={item.name}
              />
              <div class="sub-title">{item.name}</div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {:else}
    <Loading class="loading-icon" />
  {/if}
</div>

<style lang="scss" type="text/scss" scoped>
  .home__container {
    --swiper-pagination-color: #f0a1a8;
    display: flex;
    justify-content: center;
    .banner {
      .banner_item {
        width: 367px;
        margin: 0 auto;
        height: 160px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }
    }
    .recommend-list {
      padding: 0 4px;
      .title {
        font-weight: bolder;
        font-size: 14px;
        margin-top: 6px;
      }
      .list {
        margin-top: 4px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 4px;
        .list-item {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: calc(100% - 50px);
            border-radius: 3px;
            overflow: hidden;
          }
          .sub-title {
            font-size: 12px;
            color: #2e3030;
            padding: 0 2px;
            text-align: left;
          }
        }
      }
    }
  }
</style>
