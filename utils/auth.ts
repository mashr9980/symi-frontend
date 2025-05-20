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

  // export const saveTokenWithExpiry = (token: string) => {
  //   const expiryTime = Date.now() + 5400000; // Current time + duration in milliseconds
  //   localStorage.setItem("access_token", token);
  //   localStorage.setItem("token_expiry", expiryTime.toString());
  // };
  
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

  export async function getPaymentStatusFromCache() {
  let paymentStatusRaw = localStorage.getItem("payment_status");

  // If not in cache, return nulls
  if (!paymentStatusRaw) {
    return { status: null, expiredStatus: null, plan_id: null };
  }

  try {
    let paymentStatus = JSON.parse(paymentStatusRaw);

    // If status is "free", fetch from API and update cache
    if (paymentStatus.status === "free") {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          return { status: null, expiredStatus: null, plan_id: null };
        }
        const response = await fetch(`${config.apiBaseUrl}/payment/status?token=${accessToken}`);
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("payment_status", JSON.stringify(data));
          paymentStatus = data;
        } else {
          return { status: null, expiredStatus: null, plan_id: null };
        }
      } catch {
        return { status: null, expiredStatus: null, plan_id: null };
      }
    }

    const status = paymentStatus.status || null;
    const plan_id = paymentStatus.plan_id || null;
    let expiredStatus = null;
    if (paymentStatus.expiry_date) {
      const expiryTime = new Date(paymentStatus.expiry_date).getTime();
      expiredStatus = Date.now() > expiryTime;
    }
    return { status, expiredStatus, plan_id };
  } catch {
    return { status: null, expiredStatus: null, plan_id: null };
  }
}

  export async function getPaymentStatus() {
  const { status } = await getPaymentStatusFromCache();
  return status;
}

  export function hasChatHistory()  {
  if (typeof window === "undefined") return false;
  try {
    const chat = localStorage.getItem("symi_hero_chat");
    return !!chat;
  } catch {
    return false;
  }
};

