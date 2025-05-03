export const handleLogout = (
    router: ReturnType<typeof import("next/navigation").useRouter>, // Accept the router object
    setIsLoggedIn?: (value: boolean) => void,
    setIsAdmin?: (value: boolean) => void
  ) => {
    // Clear localStorage and redirect to login page
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("token_expiry");
  
    if (setIsLoggedIn) setIsLoggedIn(false);
    if (setIsAdmin) setIsAdmin(false);
  
    router.push("/auth/login");
  
    // Trigger the `storage` event manually to update other tabs
    window.dispatchEvent(new Event("storage"));
  };

  // Save token with expiry
  export const saveTokenWithExpiry = (token: string) => {
    const expiryTime = Date.now() + 5400000; // Current time + duration in milliseconds
    localStorage.setItem("access_token", token);
    localStorage.setItem("token_expiry", expiryTime.toString());
  };
  
  // Check if token is expired
  export const isTokenExpired = () => {
    const expiryTime = localStorage.getItem("token_expiry");
    if (!expiryTime) return true; // No expiry time means token is invalid
    if(Date.now() > parseInt(expiryTime, 10)) {
      console.log("Token expired",parseInt(expiryTime, 10), Date.now());
      return true; // Token is expired
      }
  };
  
  // Clear token if expired
  export const clearTokenIfExpired = () => {
    if (isTokenExpired()) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_expiry");
      localStorage.removeItem("user_role");
      window.dispatchEvent(new Event("storage"));
    }
  };