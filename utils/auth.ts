import config from "../config"; // Make sure config is imported

export const handleLogout = (
  router: ReturnType<typeof import("next/navigation").useRouter>, // Accept the router object
  setIsLoggedIn?: (value: boolean) => void,
  setIsAdmin?: (value: boolean) => void
) => {
  // Clear localStorage and redirect to login page
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_role");
  localStorage.removeItem("token_expiry");
  localStorage.removeItem("payment_status");

  if (setIsLoggedIn) setIsLoggedIn(false);
  if (setIsAdmin) setIsAdmin(false);

  router.push("/auth/login");

  // Trigger the `storage` event manually to update other tabs
  window.dispatchEvent(new Event("storage"));
};

// Save token with expiry
export const saveTokenWithExpiry = async (token: string) => {
  const expiryTime = Date.now() + 5400000; // Current time + duration in milliseconds
  localStorage.setItem("access_token", token);
  localStorage.setItem("token_expiry", expiryTime.toString());

  // Fetch payment status and save to cache
  try {
    const accessToken = token || localStorage.getItem("access_token");
    const response = await fetch(`${config.apiBaseUrl}/payment/status?token=${accessToken}`);
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("payment_status", JSON.stringify(data));
    }
  } catch (error) {
    console.error("Failed to fetch payment status:", error);
  }
};

// Check if token is expired
export const isTokenExpired = () => {
  const expiryTime = localStorage.getItem("token_expiry");
  if (!expiryTime) return true; // No expiry time means token is invalid
  return Date.now() > parseInt(expiryTime, 10);
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

export async function getPaymentStatusFromCache() {
  // Always try to fetch fresh payment status
  const accessToken = localStorage.getItem("access_token");
  
  if (!accessToken) {
    return { status: null, expiredStatus: null, plan_id: null };
  }
  
  try {
    // First check if we already have cached payment status
    let paymentStatusRaw = localStorage.getItem("payment_status");
    let cachedPaymentStatus = null;
    
    if (paymentStatusRaw) {
      try {
        cachedPaymentStatus = JSON.parse(paymentStatusRaw);
      } catch (error) {
        // Invalid JSON in cache, will fetch fresh data
      }
    }
    
    // If we need to fetch fresh data (no cache or expired)
    if (!cachedPaymentStatus || 
        cachedPaymentStatus.status === "free" || 
        !cachedPaymentStatus.expiry_date) {
      
      // Fetch fresh data
      const response = await fetch(`${config.apiBaseUrl}/payment/status?token=${accessToken}`);
      
      if (response.ok) {
        const freshData = await response.json();
        
        // Update cache with fresh data
        localStorage.setItem("payment_status", JSON.stringify(freshData));
        
        // Return processed fresh data
        const status = freshData.status || null;
        const plan_id = freshData.plan_id || null;
        let expiredStatus = null;
        
        if (freshData.expiry_date) {
          const expiryTime = new Date(freshData.expiry_date).getTime();
          expiredStatus = Date.now() > expiryTime;
        }
        
        return { status, expiredStatus, plan_id };
      } else {
        // API error, clear cache
        localStorage.removeItem("payment_status");
        return { status: null, expiredStatus: null, plan_id: null };
      }
    } else {
      // Use cached data
      const status = cachedPaymentStatus.status || null;
      const plan_id = cachedPaymentStatus.plan_id || null;
      let expiredStatus = null;
      
      if (cachedPaymentStatus.expiry_date) {
        const expiryTime = new Date(cachedPaymentStatus.expiry_date).getTime();
        expiredStatus = Date.now() > expiryTime;
      }
      
      return { status, expiredStatus, plan_id };
    }
  } catch (error) {
    console.error("Error getting payment status:", error);
    return { status: null, expiredStatus: null, plan_id: null };
  }
}

export async function getPaymentStatus() {
  const { status } = await getPaymentStatusFromCache();
  return status;
}

export function hasChatHistory() {
  if (typeof window === "undefined") return false;
  try {
    const chat = localStorage.getItem("symi_hero_chat");
    return !!chat;
  } catch {
    return false;
  }
}