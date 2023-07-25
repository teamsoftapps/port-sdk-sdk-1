// api.js
const PRODUCTION_BACKEND_URL = "https://api.gatekeeper.software/v1";
const STAGING_BACKEND_URL =
  "https://gk-prod-backend-staging.azurewebsites.net/v1";

// @ts-ignore
const makeRequest = async (url, method, isStaging, body) => {
  const isGETmethod = method === "GET";
  const fetchUrl = isStaging ? STAGING_BACKEND_URL : PRODUCTION_BACKEND_URL;

  const finalURL = isGETmethod
    ? `${url}?${new URLSearchParams(body).toString()}`
    : url;

  try {
    const response = await fetch(fetchUrl + finalURL, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: isGETmethod ? null : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

// @ts-ignore
export const getNonce = async (address, isStaging) => {
  return makeRequest("/wallets/nonce", "GET", isStaging, { address });
};

// @ts-ignore
export const register = async (address, signature, appId, isStaging) => {
  return makeRequest("/users/register", "POST", isStaging, {
    address,
    signature,
    appId,
  });
};
