const API_URL = "http://localhost:7777";

const api = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();
 
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export default api;
