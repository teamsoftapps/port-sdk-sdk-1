<!-- ProtectedRouteWeak.svelte -->
<script>
  import { getContext } from "svelte";
  import GatekeeperContext from "../contexts/GatekeeperContext";

  export let component;

  // Get the GatekeeperContext from the app's context
  const { verified } = getContext(GatekeeperContext);
</script>

<div style="position: relative;">
  {#if verified}
    <!-- Render the provided component if the user is verified -->
    <svelte:component this={component} />
  {:else}
    <!-- Render the component with pointerEvents set to "none" to prevent interaction -->
    <div style="pointer-events: none;">
      <svelte:component this={component} />
    </div>
    <!-- Render the semi-transparent overlay if the user is not verified -->
    <div
      style="position: fixed; inset: 0; height: 100%; width: 100%; background-color: rgba(0,0,0,0.5); z-index: 9999; pointer-events: all;"
    />
  {/if}
</div>
