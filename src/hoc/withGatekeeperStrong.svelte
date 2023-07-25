<!-- WithGatekeeperStrong.svelte -->
<script>
  import { getContext } from "svelte";
  import GatekeeperContext from "../contexts/GatekeeperContext";

  export let Component;
  export let FallbackComponent;
  export let props;

  // Get the GatekeeperContext from the app's context
  const { verified } = getContext(GatekeeperContext);
</script>

{#if verified}
  <svelte:component this={Component} {...props} />
{:else}
  <svelte:component this={FallbackComponent} />
{/if}
