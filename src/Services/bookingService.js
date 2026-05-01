const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchUserBookings = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/my-bookings`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch bookings");
    }

    return data;
  } catch (error) {
    console.error("Error fetching user Bookings:", error);
    throw error;
  }
};

export const fetchHostAllBookings = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/host/host-bookings`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch bookings");
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching host Bookings:", error);
    throw error;
  }
};

export const createNewBooking = async (form) => {
  try {
    const response = await fetch(`${API_BASE}/api/create-booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || ["Booking failed"] };
    }

    return {
      success: true,
      booking: data.data,
    };
  } catch (error) { 
    return {
      success: false,
      error: error.message,
    };
  }
};

export const cancelMyBooking = async (bookingId) => {
  try {
    const response = await fetch(`${API_BASE}/api/bookings/${bookingId}/cancel`, {
      method: "PATCH",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to cancel booking");
    }
    
    return {
      success: true,
      booking: data.data,
    };
  } catch (error) {
    console.error("Error while cancel your Booking:", error);
    throw error;
  }
};