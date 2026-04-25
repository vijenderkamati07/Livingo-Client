const API_BASE = import.meta.env.VITE_API_BASE_URL ;

export const fetchHomes = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/homes`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching homes:", error);
    throw error;
  }
};

export const fetchHomeDetails = async (homeId) => {
  try {
    const response = await fetch(`${API_BASE}/api/homes/${homeId}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching home details:", error);
    throw error;
  }
};

export const fetchFavourites = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/favourites`, {
      method: "GET",
      credentials: "include",
    });

    // Auth case
    if (res.status === 401) {
      return { success: false, unauthorized: true, data: [] };
    }

    if (!res.ok) {
      throw new Error("Failed to fetch favourites");
    }

    const data = await res.json();

    return { success: true, data }; // ALWAYS consistent shape

  } catch (error) {
    console.error("Error fetching favourites:", error);
    return { success: false, error: true, data: [] };
  }
};

export const addFavourite = async (homeId) => {
  try {
    const response = await fetch(`${API_BASE}/api/favourite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({homeId}),
    });
    console.log("Body: ", JSON.stringify({homeId}));
    if (!response.ok) {
      throw new Error("Failed to add favourite");
    }
  } catch (error) {
    console.error("Error adding favourite:", error);
    throw error;
  }
};

export const removeFavourite = async (homeId) => {
  try {
    const response = await fetch(
      `${API_BASE}/api/favourite/${homeId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json(); // parse backend JSON

    return data; // 🔥 send success result to UI
  } catch (error) {
    console.error("Error removing favourite:", error);
    return { success: false };
  }
};

export const fetchListedHomes = async (params = {}) => {
  const qs = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      qs.append(key, value);
    }
  });

  const res = await fetch(`${API_BASE}/api/listed-homes?${qs.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch homes");
  }

  return res.json(); // { homes, hasMore }
};