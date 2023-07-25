<!-- sortUrlParams.svelte -->
<script>
  export function sortUrlParams(urlSearchParams) {
    const sortedParams = {};
    const keys = Array.from(urlSearchParams.keys()).sort();

    for (const key of keys) {
      sortedParams[key] = urlSearchParams.get(key) ?? "";
    }

    return new URLSearchParams(sortedParams);
  }
</script>
