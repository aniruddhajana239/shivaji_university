import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Accept-Language": localStorage.getItem("app-language") || "en",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add language header from localStorage
    const language = localStorage.getItem("app-language") || "en";
    config.headers["Accept-Language"] = language;
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.clear();
      window.location.href = "/";
      return;
    }

    return Promise.reject(error);
  }
);

/**
 * Function to update language for all future requests
 * Automatically refreshes the page to apply language changes
 * @param {string} language - The language code (e.g., 'en', 'es', 'fr')
 * @param {boolean} shouldRefresh - Whether to refresh the page (default: true)
 * @returns {void}
 */
export const updateAxiosLanguage = (language, shouldRefresh = true) => {
  // Update axios default headers
  axiosClient.defaults.headers.common["Accept-Language"] = language;
  
  // Save to localStorage for persistence
  localStorage.setItem("app-language", language);
  
  // Refresh the page to apply language changes to all components
  if (shouldRefresh) {
    // Small delay for better UX (allows any animations/transitions to complete)
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
};

/**
 * Function to get current language from localStorage
 * @returns {string} Current language code
 */
export const getCurrentLanguage = () => {
  return localStorage.getItem("app-language") || "en";
};

/**
 * Function to initialize language on app startup
 * Can be called in your main App component
 */
export const initializeLanguage = () => {
  const savedLanguage = localStorage.getItem("app-language");
  if (savedLanguage) {
    axiosClient.defaults.headers.common["Accept-Language"] = savedLanguage;
  }
  return savedLanguage || "en";
};

/**
 * Function to change language with optional callback
 * @param {string} language - The language code
 * @param {function} onBeforeRefresh - Callback function to run before refresh
 */
export const changeLanguageWithCallback = (language, onBeforeRefresh = null) => {
  // Run callback if provided (e.g., show loading spinner)
  if (typeof onBeforeRefresh === 'function') {
    onBeforeRefresh();
  }
  
  // Update language
  updateAxiosLanguage(language);
};

export default axiosClient;