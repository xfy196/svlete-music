<script lang="ts">
  import { onMount } from "svelte";
  import { getTopListDetail } from "../api";
  import MeScroll from "mescroll.js";
  import Loading from "../components/Loading.svelte";
  import Header from "../layout/Header.svelte";
  import Nav from "../layout/Nav.svelte";
  import { push } from "svelte-spa-router";
  let loading: boolean = true;
  let data: {
    artistToplist: object;
    list: Array<any>;
    rewardToplist: object;
  };
  let scrollDom: HTMLDivElement;
  let mescroll;
  onMount(() => {
    getToplistDetailRequest();
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
      await getToplistDetailRequest();
      mescroll.endSuccess();
    }
  }

  const getToplistDetailRequest = async () => {
    try {
      let res = await getTopListDetail();
      data = res;
      console.log(data);
      loading = false;
    } catch (error) {}
  };
</script>

<Header />
<Nav />
<div class="rank__container">
  {#if !loading}
    <div bind:this={scrollDom} class="wrapper">
      <div class="official-list-container">
        <div class="title">官方榜</div>
        <div class="official-list">
          {#each data?.list?.slice(0, 4) as item (item.id)}
            <div class="item">
              <div on:click={() => push(`/album/${item.id}`)} class="left-icon">
                <div class="update-state">
                  {item.updateFrequency}
                </div>
                <img src={item.coverImgUrl} alt={item.description} />
              </div>
              <div class="right-rank-tracks">
                {#each item.tracks as track, i (track.second)}
                  <div class="track">
                    <div class="number">
                      {i + 1}
                    </div>
                    <div class="track-content">
                      {track.first}-{track.second}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
      <div class="global-list-container">
        <div class="title">全球榜</div>
        <div class="global-list">
          {#each data?.list?.slice(4) as item (item.id)}
            <div on:click={() => push(`/album/${item.id}`)} class="item">
              <img src={item.coverImgUrl} alt={item.name} />
              <div class="update-state">{item.updateFrequency}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else}
    <Loading />
  {/if}
</div>

<style lang="scss" type="text/scss">
  .rank__container {
    display: flex;
    justify-content: center;
    overflow: hidden;
    .wrapper {
      width: 100%;
      padding: 0 4px;
      .official-list-container {
        .title {
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 14px;
          font-weight: bolder;
        }
        .official-list {
          .item {
            display: flex;
            align-items: center;
            margin-bottom: 4px;
            &:last-of-type {
              margin-bottom: 0;
            }
            .left-icon {
              width: 100px;
              height: 100px;
              position: relative;
              img {
                width: 100%;
                height: 100%;
                border-radius: 3px;
              }
              .update-state {
                position: absolute;
                bottom: 7px;
                left: 7px;
                font-size: 12px;
                color: #f1f1f1;
              }
            }
            .right-rank-tracks {
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              height: 100px;
              flex: 1;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              .track {
                display: flex;
                font-size: 12px;
                color: grey;
                .link {
                  margin: 0 4px;
                }
                .number {
                  margin-right: 4px;
                }
                .track-content {
                  width: 230px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
              }
            }
          }
        }
      }
      .global-list-container {
        .title {
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 14px;
          font-weight: bolder;
        }
        .global-list {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-column-gap: 4px;
          grid-row-gap: 4px;
          .item {
            position: relative;
            .update-state {
              position: absolute;
              left: 7px;
              bottom: 7px;
              font-size: 12px;
              color: #f1f1f1;
            }
            img {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
</style>
