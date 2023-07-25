<!-- page.svelte -->
<script>
  import AccessControlModal from '../AccessControlModal.svelte';
  import { onMount } from 'svelte';
  import verified from '../../lib/GatekeeperContextProvider.svelte';

  let GatekeeperContextProvider;
console.log("module", verified)
  // Function to import the `GatekeeperContextProvider` component
  async function importGatekeeperContextProvider() {
    try {
      const module = await import("../../lib/GatekeeperContextProvider.svelte");
	  console.log("module", module)
      if (module.default && module.default.GatekeeperContext) {
        GatekeeperContextProvider = module.default.GatekeeperContext;
      }
    } catch (error) {
      // Handle any import errors here
    }
  }

  // Use the `use:mounted` action to import the component onMount
  onMount(importGatekeeperContextProvider);
</script>

<!-- Use the <svelte:component> to conditionally render the component -->
<svelte:component this={GatekeeperContextProvider} let:GatekeeperContextProvider>
  {#if GatekeeperContextProvider}
    <GatekeeperContextProvider>
      <GatekeeperContext.Provider value={GatekeeperContext}>
        <AccessControlModal
          account="user_account"
          polygonId="polygon_id"
          checksIds={[1, 2, 3]}
          roles={['admin', 'user']}
          checkCallback={(msgReceived) => console.log('Received message:', msgReceived)}
          customization={{ backgroundColor: '#f0f0f0', primaryColor: '#000000' }}
          nftClaimLinks={{ link1: 'https://example.com/nft1', link2: 'https://example.com/nft2' }}
          signature="user_signature"
          isStaging={true}
        />
      </GatekeeperContext.Provider>
    </GatekeeperContextProvider>
  {/if}
</svelte:component>

<!-- Rest of your page content -->
<h1>Welcome to the Page!</h1>
