<script>
  import { onMount } from 'svelte';

  let isVerified = false;
  let showModal = false;

  const closeModal = () => {
    showModal = false;
    document.body.style.overflow = 'visible';
  };

  const openModal = () => {
    showModal = true;
    document.body.style.overflow = 'hidden';
  };

  onMount(() => {
    window.addEventListener('message', (event) => {
      try {
        const msgReceived = JSON.parse(event.data || '{}');
        isVerified = msgReceived.isVerified || false;

        if (isVerified) {
          console.log('User is verified.');
          closeModal();
        }
      } catch (error) {
        console.error('Error parsing the received message:', error);
      }
    });
  });

  const handleLogin = async () => {
    const apiEndpoint = 'https://gk-prod-backend-staging.azurewebsites.net/v1';

    try {
      const response = await fetch(apiEndpoint);
      if (response.ok) {
        const responseData = await response.json();
        // Handle the response data as needed
        console.log('API request was successful:', responseData);
      } else {
        console.error('Error: The API request was not successful.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
</script>

<style>
  /* Your CSS styles for the modal and button */
  .login-modal-bg {
    height: 100vh;
    width: 100vw;
    z-index: 9999;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    pointer-events: all;
  }

  .login-btn {
    /* ... */
  }

  .login-modal-iframe {
    width: 480px;
    min-height: 650px;
    color: #ffff;
    background: #141724;
    border-radius: 12px;
    border: none;
    font-family: "Albert Sans", sans-serif;
  }
</style>

<div class="login-modal-bg">
  <button on:click={openModal} class="login-btn">Login</button>
  {#if showModal}
    <div class="login-modal-bg" id="modal-container">
      <iframe
        class="login-modal-iframe"
        src="https://gatekeeper.software/verify?address=your-account-value&bgColor=%23141724&buttonTextColor=%23e2e8f0&isIframe=true&primaryColor=%23059669&textColor=%23e2e8f0"
        data-testid="gatekeeper_iframe"
        allow="camera"
      />
    </div>
  {/if}
</div>
