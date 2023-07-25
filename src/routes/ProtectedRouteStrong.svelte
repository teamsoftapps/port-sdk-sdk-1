<!-- ProtectedRouteStrong.svelte -->
<script>
  import { getContext } from "svelte";
  import GatekeeperContext from "../contexts/GatekeeperContext";

  export let component;
  export let fallbackComponent;

  // Get the GatekeeperContext from the app's context
  const { verified } = getContext(GatekeeperContext);
</script>

{#if verified}
  <!-- Render the provided component if the user is verified -->
  <svelte:component this={component} />
{:else}
  <!-- Render the fallback component if the user is not verified -->
  <svelte:component this={fallbackComponent} />
{/if}
