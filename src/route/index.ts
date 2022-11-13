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
};

export default routes;
