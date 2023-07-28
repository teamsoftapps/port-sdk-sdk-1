<!-- AccessControlModal.svelte -->
<script context="module">
  // Import necessary constants from config/constants.js and utils/defaultColor.js
  import { PRODUCTION_WEBSITE, STAGING_WEBSITE } from "../config/constants.js";
  import { DEFAULT_COLORS } from "../utils/defaultColor.js";
</script>
<script>
 import { onMount, page } from "svelte";
  import { gatekeeperContext } from "../lib/gatekeeperContext.js";

  export let checksIds;
  export let roles;
  export let checkCallback;
  export let defaultColors;
  export let nftClaimLinks;
  export let isStaging;
  export let account;

  // ... (rest of the script)



  let closeModal = false;
   const { verified, verify } = gatekeeperContext;

  // Handle iframe message
  const receiveMessage = (event) => {
    try {
      const msgReceived = JSON.parse(event.data || "{}");
      const isVerified = msgReceived.isVerified || false;
      checkCallback && checkCallback(msgReceived);

      if (isVerified) {
        document.body.style.overflow = "visible";
        closeModal = true;
        verify();
      }
    } catch (error) {}
  };

  onMount(() => {
    window.addEventListener("message", receiveMessage);
    return () => {
      window.removeEventListener("message", receiveMessage);
    };
  });

  // Define the parameters to be passed in the URL
  const params = {
    bgColor: defaultColors ? defaultColors.backgroundColor : DEFAULT_COLORS.backgroundColor,
    primaryColor: defaultColors ? defaultColors.primaryColor : DEFAULT_COLORS.primaryColor,
    textColor: defaultColors ? defaultColors.textColor : DEFAULT_COLORS.textColor,
    buttonTextColor: defaultColors ? defaultColors.buttonTextColor : DEFAULT_COLORS.buttonTextColor,
    isIframe: "true",
    address: account,
    checksIds: checksIds ? checksIds.toString() : undefined,
    roles: roles ? roles.toString() : undefined,
    nftClaimLinks: JSON.stringify(nftClaimLinks || {}),
  };

  console.log("params:", params);

  // Filter out undefined and empty values, and sort the URL parameters
  const sortedUrlParams = Object.entries(params)
    .filter(([key, value]) => {
      if (key === "nftClaimLinks") {
        const obj = JSON.parse(value);
        return Object.keys(obj).length > 0;
      }
      return value !== undefined && value !== "";
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  const IFRAME_URL = `${
    isStaging ? STAGING_WEBSITE : PRODUCTION_WEBSITE
  }/verify?${new URLSearchParams(sortedUrlParams)}`;

  const IFRAME_TITLE = "Gatekeeper Access Control";
</script>

{#if !closeModal}
  <!-- Render the modal only on the client-side -->
  <svelte:component this={gatekeeperContext}>
    <div class="modal-bg">
      <iframe
        class="modal-iframe"
        src={IFRAME_URL}
        data-testid="gatekeeper_iframe"
        allow="camera"
        title={IFRAME_TITLE} 
      />
    </div>
  </svelte:component>
{/if}

<style>
  /* Define your styles for modal and iframe here */
  /* You can copy the styles from the original global.css or define them inline */

  /* Example styles (customize them according to your needs) */
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999;
  }

  .modal-iframe {
    width: 80%;
    height: 80%;
    border: none;
    z-index: 999999999;
  }
</style>
