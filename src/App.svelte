<!-- App.svelte -->
<script>
  import { Router, Route } from '@sveltejs/kit';
  import AccessControlModal from './routes/AccessControlModal.svelte';
  import GatekeeperContextProvider from '../lib/GatekeeperContextProvider.svelte'; // Import the GatekeeperContextProvider here

  // ... (rest of the script)
</script>

<main>
  <!-- Router and routes -->
  <Router>
    <Route path="/access-control-modal" component={} />
    <Route path="/" component={Page} />
  </Router>
</main>

<GatekeeperContextProvider> <!-- Wrap the entire app with the GatekeeperContextProvider -->
  <header>
    <!-- Your header content -->
  </header>

  <main>
    <Router>
      <Route path="/access-control-modal" component={AccessControlModal} />
      <Route path="/" component={Page} />
    </Router>
  </main>

  <footer>
    <!-- Your footer content -->
  </footer>
</GatekeeperContextProvider>

<style>
  /* Add your global styles here */
</style>
