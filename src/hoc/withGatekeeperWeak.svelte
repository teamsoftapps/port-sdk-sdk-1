<!-- WithGatekeeperWeak.svelte -->
<script>
  import { getContext } from "svelte";
  import GatekeeperContext from "../contexts/GatekeeperContext";

  export let Component;
  export let props;

  // Get the GatekeeperContext from the app's context
  const { verified } = getContext(GatekeeperContext);
</script>

<div style="position: relative; width: 100%; height: 100%;">
  {#if verified}
    <div>
      <!-- Render the Component with the provided props -->
      <svelte:component this={Component} {...props} />
    </div>
  {:else}
    <div style="position: absolute; inset: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 9999; pointer-events: all;"></div>
  {/if}
</div>
