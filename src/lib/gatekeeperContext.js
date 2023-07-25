// gatekeeperContext.js
import { writable } from "svelte/store";

// Set the initial value of the verified state to false
export const gatekeeperContext = writable({
  verified: false,
  verify: () => {},
});
