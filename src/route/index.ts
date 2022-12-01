import { wrap } from "svelte-spa-router/wrap";
const routes = {
  "/": wrap({
    asyncComponent: () => import("../views/Home.svelte"),
  }),
  "/home": wrap({
    asyncComponent: () => import("../views/Home.svelte"),
  }),
  "/rank": wrap({
    asyncComponent: () => import("../views/Rank.svelte"),
  }),
  "/album/:id": wrap({
    asyncComponent: () => import("../views/Album.svelte"),
  }),
  "/todolist": wrap({
    asyncComponent: () => import("../views/TodoList.svelte"),
  }),
};

export default routes;
