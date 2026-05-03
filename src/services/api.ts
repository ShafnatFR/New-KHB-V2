const API_URL = import.meta.env.VITE_CMS_API_URL;
const API_KEY = import.meta.env.VITE_CMS_API_KEY;

export const fetchCMS = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

export const cmsService = {
  getGallery: () => fetchCMS('/gallery'),
  getTemplates: () => fetchCMS('/templates'),
  getEvents: () => fetchCMS('/events'),
  getPages: () => fetchCMS('/pages'),
  getPosts: () => fetchCMS('/posts'),
  // Add more specific methods as needed
};
