
export const fetchHostHomes = async () => {
  const res = await fetch("https://livingo-backend.onrender.com/api/host/host-homes", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch host homes");

  return res.json();
};

export const addHomeService = async (formData) => {
  const res = await fetch("https://livingo-backend.onrender.com/api/host/add-home", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if(res.status===402){
    throw new Error("Img type not supported")
  }

  if (!res.ok) throw new Error("Failed to add home");
  return res.json();
};

export const getSingleHomeService = async (homeId) => {
  console.log("Request come for Fetching home details for ID:", homeId);
  const res = await fetch(
    `https://livingo-backend.onrender.com/api/host/edit-home/${homeId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  console.log(
    "Response received for Fetching home details for ID:",
    homeId,
    res
  );
  if (!res.ok) throw new Error("Failed to fetch home details");
  return res.json();
};

export const updateHomeService = async (homeId, formData) => {
  const res = await fetch(
    `https://livingo-backend.onrender.com/api/host/edit-home/${homeId}`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Failed to update home");
  return res.json();
};

export const deleteHomeService = async (homeId) => {
  const res = await fetch(
    `https://livingo-backend.onrender.com/api/host/delete-home/${homeId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Failed to delete home");

  return res.json(); // parse backend response
};
