export const fetchHomes = async () => {
  try {
    const response = await fetch("https://livingo-backend.onrender.com/api/homes", {
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
    const response = await fetch(`https://livingo-backend.onrender.com/api/homes/${homeId}`, {
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
    const res = await fetch(
      "https://livingo-backend.onrender.com/api/favourites",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (res.status === 401) {
      return { unauthorized: true };
    }

    if (!res.ok) {
      throw new Error("Failed to fetch favourites");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error fetching favourites:", error);
    throw error;
  }
};



export const addFavourite = async (homeId) => {
  try {
    const response = await fetch("https://livingo-backend.onrender.com/api/favourite", {
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
      `https://livingo-backend.onrender.com/api/favourite/${homeId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.status) {
      throw new Error("Failed to remove favourite");
    }
  } catch (error) {
    console.error("Error removing favourite:", error);
    throw error;
  }
};
