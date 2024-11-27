import { getToken } from "./authenticate";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function for making API requests with authentication
async function fetchWithAuth(url, options = {}) {
  const token = getToken(); // Get the JWT token
  if (!token) {
    console.error("No token available");
    return [];
  }

  // Include the Authorization header
  options.headers = {
    ...options.headers,
    Authorization: `JWT ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, options);

    // Check if the response status is OK
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Request failed with status:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    return [];
  }
}

// Add to Favourites
export async function addToFavourites(id) {
  const url = `${BASE_URL}/favourites/${id}`;
  return await fetchWithAuth(url, { method: "PUT" });
}

// Remove from Favourites
export async function removeFromFavourites(id) {
  const url = `${BASE_URL}/favourites/${id}`;
  return await fetchWithAuth(url, { method: "DELETE" });
}

// Get Favourites
export async function getFavourites() {
  const url = `${BASE_URL}/favourites`;
  return await fetchWithAuth(url, { method: "GET" });
}

// Add to History
export async function addToHistory(id) {
  const url = `${BASE_URL}/history/${id}`;
  return await fetchWithAuth(url, { method: "PUT" });
}

// Remove from History
export async function removeFromHistory(id) {
  const url = `${BASE_URL}/history/${id}`;
  return await fetchWithAuth(url, { method: "DELETE" });
}

// Get History
export async function getHistory() {
  const url = `${BASE_URL}/history`;
  return await fetchWithAuth(url, { method: "GET" });
}
