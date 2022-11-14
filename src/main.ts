import App from "./App.svelte";
import "normalize.css";
import "cornercss/index.css";
import "./reset.css";
const app = new App({
  target: document.getElementById("app"),
});

export default app;
