<!-- src/lib/GatekeeperContextProvider.svelte -->
<script>
  import { gatekeeperContext } from './gatekeeperContext.js';
  import { onMount } from 'svelte';

  let verified = false; // Default value for the verified state

  // Use onMount to update verified on the client-side
  onMount(() => {
    const initialVerifiedStatus = Boolean(localStorage.getItem('GatekeeperVerified') === 'true');
    verified = initialVerifiedStatus;
  });

  // Handle client-side verification
  const verify = () => {
    verified = true;
    // Save the verified status to localStorage
    localStorage.setItem('GatekeeperVerified', 'true');
  };
</script>

<svelte:head>
  <!-- The <svelte:head> tag will be included in the HTML head during SSR -->
  <script>
    // Update the verified value during client-side rendering
    const initialVerifiedStatus = Boolean(localStorage.getItem('GatekeeperVerified') === 'true');
    verified = initialVerifiedStatus;
  </script>
</svelte:head>

<gatekeeperContext.Provider value={{ verified, verify }}>
  <!-- Pass the context down to child components -->
  <slot></slot>
</gatekeeperContext.Provider>
