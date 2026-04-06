

export async function signup(form) {
  try {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, errors: data.errors || ["Signup failed"] };
    }

    return { success: true, message: data.message };
  } catch {
    return { success: false, errors: ["Server error. Try again later."] };
  }
}

export const login = async (form) => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json(); // parse response

    if (!res.ok)
      return { success: false, errors: data.errors || ["Login failed"] };

    return { success: true, user: data.user };
  } catch {
    return { success: false, errors: ["Server error. Try again later."] };
  }
};

export const logoutService = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Logout failed:", err);
    return { success: false };
  }
};

