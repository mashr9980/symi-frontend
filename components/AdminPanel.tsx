"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigation
import config from "../config";
import { isTokenExpired, handleLogout } from "../utils/auth"; // Import utility functions

const AdminPanel = () => {
  const [tab, setTab] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]); // State to store users
  const [loading, setLoading] = useState(false);
  const [statusModal, setStatusModal] = useState(false); // State for status modal
  const [selectedUser, setSelectedUser] = useState<any>(null); // State for selected user
  const [newStatus, setNewStatus] = useState("");
  const [professions, setProfessions] = useState<any[]>([]); // State to store professions
  const [loadingProfessions, setLoadingProfessions] = useState(false); // Loading state for professions
  const [addProfessionModal, setAddProfessionModal] = useState(false); // State for add profession modal
  const [newProfession, setNewProfession] = useState({ name: "", description: "" }); // State for new profession
  const [editProfessionModal, setEditProfessionModal] = useState(false); // State for edit profession modal
  const [selectedProfession, setSelectedProfession] = useState<any>(null); // State for selected profession
  const [updatedProfession, setUpdatedProfession] = useState({ name: "", description: "" }); // State for updated profession
  const [selectedModel, setSelectedModel] = useState("gpt-4o"); // State for selected model
  const [isAuthorized, setIsAuthorized] = useState(false); // Tracks if the user is authorized
  const router = useRouter(); // Initialize the router
  const handleTabChange = (newTab: string) => setTab(newTab);
  const [chatData, setChatData] = useState<any[]>([]); // State to store chat data
  const [loadingChats, setLoadingChats] = useState(false); // Loading state for chats
  const [plans, setPlans] = useState<any[]>([]); // State to store pricing plans
  const [loadingPlans, setLoadingPlans] = useState(false); // Loading state for plans
  const [addPlanModal, setAddPlanModal] = useState(false); // State for add plan modal
  const [newPlan, setNewPlan] = useState({
    name: "",
    description: "",
    price: 0,
    currency: "USD",
    duration_days: 365,
    features: [""],
    is_active: true,
    display_order: 0,
  }); // State for new plan
  const [professionPrompts, setProfessionPrompts] = useState<any[]>([]); // State to store profession prompts
  const [loadingProfessionPrompts, setLoadingProfessionPrompts] = useState(false); // Loading state for profession prompts
  const [editPlanModal, setEditPlanModal] = useState(false); // State for edit plan modal
  const [selectedPlan, setSelectedPlan] = useState<any>(null); // State for the selected plan
  const [updatedPlan, setUpdatedPlan] = useState({
    name: "",
    description: "",
    price: 0,
    currency: "USD",
    duration_days: 365,
    features: [""],
    is_active: true,
    display_order: 0,
  }); // State for updated plan
  const [loadingChat, setLoadingChat] = useState(false); // State for chat loading
  const [loadingChatUserId, setLoadingChatUserId] = useState<number | null>(null); // Track the user ID for loading
  const [showPromptModal, setShowPromptModal] = useState(false); // State for showing the modal
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null); // State for the selected system prompt
  const [addProfessionPromptModal, setAddProfessionPromptModal] = useState(false); // State for add profession with prompt modal
  const [newProfessionPrompt, setNewProfessionPrompt] = useState({
    name: "",
    system_prompt: "",
    description: ""
  });

  const [editProfessionPromptModal, setEditProfessionPromptModal] = useState(false); // State for edit profession with prompt modal
  const [selectedProfessionPrompt, setSelectedProfessionPrompt] = useState<any>(null); // State for the selected profession prompt
  const [updatedProfessionPrompt, setUpdatedProfessionPrompt] = useState({
    name: "",
    system_prompt: "",
    description: "",
  }); // State for updated profession prompt

  const addPlan = async () => {
    const accessToken = localStorage.getItem("access_token"); // Get access token from cache
    if (!accessToken) {
      alert("Access token not found. Please log in again.");
      return;
    }
  
    // Check if token is expired before making the request
    if (isTokenExpired()) {
      handleLogout(router);
      return;
    }
  
    try {
      const response = await fetch(`${config.apiBaseUrl}/pricing/admin/plans?token=${accessToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlan),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        alert("Plan added successfully.");
        setPlans((prevPlans) => [...prevPlans, responseData]); // Add the new plan to the list
        setAddPlanModal(false); // Close the modal
        setNewPlan({
          name: "",
          description: "",
          price: 0,
          currency: "USD",
          duration_days: 365,
          features: [""],
          is_active: true,
          display_order: 0,
        }); // Reset the form
      } else {
        alert("Failed to add plan.");
      }
    } catch (error) {
      console.error("Error adding plan:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const updatePlan = async () => {
    const accessToken = localStorage.getItem("access_token"); // Get access token from cache
    if (!accessToken) {
      alert("Access token not found. Please log in again.");
      return;
    }
  
    // Check if token is expired before making the request
    if (isTokenExpired()) {
      handleLogout(router);
      return;
    }
  
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/pricing/admin/plans/${selectedPlan.id}?token=${accessToken}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPlan),
        }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        alert("Plan updated successfully.");
        setPlans((prevPlans) =>
          prevPlans.map((plan) =>
            plan.id === selectedPlan.id ? responseData : plan
          )
        ); // Update the plan in the list
        setEditPlanModal(false); // Close the modal
      } else {
        alert("Failed to update plan.");
      }
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const deletePlan = async (planId: number) => {
    const accessToken = localStorage.getItem("access_token"); // Get access token from cache
    if (!accessToken) {
      alert("Access token not found. Please log in again.");
      return;
    }
  
    // Check if token is expired before making the request
    if (isTokenExpired()) {
      handleLogout(router);
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this plan?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/pricing/admin/plans/${planId}?token=${accessToken}`,
        {
          method: "DELETE",
        }
      );
  
      if (response.ok) {
        alert("Plan deleted successfully.");
        setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== planId)); // Remove the deleted plan from the list
      } else {
        alert("Failed to delete plan.");
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  useEffect(() => {
    const fetchPricingPlans = async () => {
      if (tab === "plans") {
        setLoadingPlans(true);
        const accessToken = localStorage.getItem("access_token"); // Get access token from cache
        if (!accessToken) {
          alert("Access token not found. Please log in again.");
          router.push("/auth/login");
          return;
        }

        // Check if token is expired before making the request
        if (isTokenExpired()) {
          handleLogout(router);
          return;
        }

        try {
          const response = await fetch(
            `${config.apiBaseUrl}/pricing/admin/plans?token=${accessToken}`
          );

          if (response.ok) {
            const data = await response.json();
            setPlans(data); // Populate the pricing plans
          } else {
            console.error("Failed to fetch pricing plans.");
          }
        } catch (error) {
          console.error("Error fetching pricing plans:", error);
        } finally {
          setLoadingPlans(false);
        }
      }
    };

    fetchPricingPlans();
  }, [tab, router]);

  // Check if the user is logged in
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.push("/auth/login"); // Redirect to login if not logged in
    } else {
      setIsAuthorized(true); // Allow access to the page
    }
  }, [router]);

  useEffect(() => {
    const fetchProfessions = async () => {
      if (tab === "professions") {
        setLoadingProfessions(true);

        // Check if token is expired before making the request
        if (isTokenExpired()) {
          handleLogout(router);
          return;
        }

        try {
          const response = await fetch(`${config.apiBaseUrl}/professions`);
          if (response.ok) {
            const data = await response.json();
            setProfessions(data);
          } else {
            console.error("Failed to fetch professions");
          }
        } catch (error) {
          console.error("Error fetching professions:", error);
        } finally {
          setLoadingProfessions(false);
        }
      }
    };

    fetchProfessions();
  }, [tab]);

  const addProfession = async () => {
    const accessToken = localStorage.getItem("access_token"); // Get access token from cache
    if (!accessToken) {
      alert("Access token not found. Please log in again.");
      return;
    }

     // Check if token is expired before making the request
     if (isTokenExpired()) {
      handleLogout(router);
      return;
    }
    
    try {
      const response = await fetch(`${config.apiBaseUrl}/professions?token=${accessToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfession),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("Profession added successfully.");
        setProfessions((prevProfessions) => [...prevProfessions, responseData]); // Add the new profession to the list
        setAddProfessionModal(false); // Close the modal
        setNewProfession({ name: "", description: "" }); // Reset the form
      } else {
        alert("Failed to add profession.");
      }
    } catch (error) {
      console.error("Error adding profession:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const updateProfession = async () => {
    const accessToken = localStorage.getItem("access_token"); // Get access token from cache
    if (!accessToken) {
      alert("Access token not found. Please log in again.");
      return;
    }

    // Check if token is expired before making the request
    if (isTokenExpired()) {
      handleLogout(router);
      return;
    }

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/professions/${selectedProfession.id}?token=${accessToken}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfession),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        alert("Profession updated successfully.");
        setProfessions((prevProfessions) =>
          prevProfessions.map((profession) =>
            profession.id === selectedProfession.id ? responseData : profession
          )
        ); // Update the profession in the list
        setEditProfessionModal(false); // Close the modal
        setUpdatedProfession({ name: "", description: "" }); // Reset the form
      } else {
        alert("Failed to update profession.");
      }
    } catch (error) {
      console.error("Error updating profession:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const deleteProfession = async (professionId: number) => {
    const accessToken = localStorage.getItem("access_token"); // Get access token from cache
    if (!accessToken) {
      alert("Access token not found. Please log in again.");
      return;
    }

    // Check if token is expired before making the request
    if (isTokenExpired()) {
      handleLogout(router);
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this profession?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/professions/${professionId}?token=${accessToken}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Profession deleted successfully.");
        // Remove the deleted profession from the list
        setProfessions((prevProfessions) =>
          prevProfessions.filter((profession) => profession.id !== professionId)
        );
      } else {
        alert("Failed to delete profession.");
      }
    } catch (error) {
      console.error("Error deleting profession:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const openEditProfessionModal = (profession: any) => {
    setSelectedProfession(profession);
    setUpdatedProfession({ name: profession.name, description: profession.description || "" });
    setEditProfessionModal(true);
  };

  const openStatusModal = (user: any) => {
    setSelectedUser(user);
    setStatusModal(true);
  };

  const sampleChat = [
    {
      sender: "Jane Smith",
      message: "How do I integrate Zapier?",
      from: "user",
    },
    {
      sender: "Support",
      message: "You can use our API key in the settings.",
      from: "admin",
    },
    { sender: "Jane Smith", message: "Thanks! That worked.", from: "user" },
    { sender: "Support", message: "Glad to hear that!", from: "admin" },
    { sender: "Jane Smith", message: "Thanks! That worked.", from: "user" },
    { sender: "Support", message: "Glad to hear that!", from: "admin" },
    { sender: "Jane Smith", message: "Thanks! That worked.", from: "user" },
    { sender: "Support", message: "Glad to hear that!", from: "admin" },
    { sender: "Jane Smith", message: "Thanks! That worked.", from: "user" },
    { sender: "Support", message: "Glad to hear that!", from: "admin" },
    { sender: "Jane Smith", message: "Thanks! That worked.", from: "user" },
    { sender: "Support", message: "Glad to hear that!", from: "admin" },
    { sender: "Jane Smith", message: "Thanks! That worked.", from: "user" },
    { sender: "Support", message: "Glad to hear that!", from: "admin" },
  ];

  const openChatModal = async (user: any) => {
    const accessToken = localStorage.getItem("access_token"); // Get access token from cache
    if (!accessToken) {
      alert("Access token not found. Please log in again.");
      return;
    }
  
    // Check if token is expired before making the request
    if (isTokenExpired()) {
      handleLogout(router);
      return;
    }
  
    setLoadingChatUserId(user.id); // Set the loading state for the clicked row
  
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/admin/chat-history/${user.id}?limit=50&token=${accessToken}`
      );
  
      if (response.ok) {
        const data = await response.json();
        const formattedChat = data.map((chat: any) => ({
          sender: "user", // Assuming the user is the sender for `message`
          message: chat.message,
          response: chat.response,
          timestamp: chat.timestamp,
        }));
        setSelectedChat(formattedChat); // Populate the chat modal with the fetched chat history
        setShowModal(true); // Open the chat modal
      } else {
        alert("Failed to fetch chat history.");
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoadingChatUserId(null); // Reset the loading state
    }
  };

  const changeUserStatus = async () => {
    if (!selectedUser || !newStatus) return;

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      alert("Access token not found. Please log in again.");
      return;
    }

    // Check if token is expired before making the request
    if (isTokenExpired()) {
      handleLogout(router);
      return;
    }

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/admin/users/${selectedUser.id}/status?status=${newStatus}&token=${accessToken}`,
        {
          method: "Put",
        }
      );

      if (response.ok) {
        alert("User status updated successfully.");
        setStatusModal(false);
        // Optionally, refresh the user list
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, status: newStatus } : user
          )
        );
      } else {
        alert("Failed to update user status.");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showModal && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [showModal]);

// Fetch users when the tab is "dashboard"
useEffect(() => {
  const fetchUsers = async () => {
    if (tab === "dashboard") {
      setLoading(true);
      const accessToken = localStorage.getItem("access_token"); // Get access token from cache
      if (!accessToken) {
        console.error("Access token not found");
        setLoading(false);
        return;
      }

      // Check if token is expired before making the request
     if (isTokenExpired()) {
      handleLogout(router);
      return;
    }

      try {
        const response = await fetch(
          `${config.apiBaseUrl}/admin/users?token=${accessToken}`
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Populate the users table
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  fetchUsers();
}, [tab]);

const deleteUser = async (userId: number) => {
  const accessToken = localStorage.getItem("access_token"); // Get access token from cache
  if (!accessToken) {
    alert("Access token not found. Please log in again.");
    return;
  }

  // Check if token is expired before making the request
  if (isTokenExpired()) {
    handleLogout(router);
    return;
  }

  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `${config.apiBaseUrl}/admin/users/${userId}?token=${accessToken}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("User deleted successfully.");
      // Remove the deleted user from the users list
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } else {
      alert("Failed to delete user.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("An error occurred. Please try again.");
  }
};

const saveSettings = async () => {
  const accessToken = localStorage.getItem("access_token"); // Get access token from cache
  if (!accessToken) {
    alert("Access token not found. Please log in again.");
    return;
  }

  // Check if token is expired before making the request
  if (isTokenExpired()) {
    handleLogout(router);
    return;
  }

  try {
    const response = await fetch(
      `${config.apiBaseUrl}/admin/settings/model?model_name=${selectedModel}&token=${accessToken}`,
      {
        method: "PUT",
      }
    );

    if (response.ok) {
      alert("Settings updated successfully.");
    } else {
      alert("Failed to update settings.");
    }
  } catch (error) {
    console.error("Error updating settings:", error);
    alert("An error occurred. Please try again.");
  }
};

useEffect(() => {
  const fetchCurrentModel = async () => {
    if (tab === "settings") {
      const accessToken = localStorage.getItem("access_token"); // Get access token from cache
      if (!accessToken) {
        alert("Access token not found. Please log in again.");
        return;
      }

      // Check if token is expired before making the request
     if (isTokenExpired()) {
      handleLogout(router);
      return;
    }

      try {
        const response = await fetch(
          `${config.apiBaseUrl}/admin/settings/model?token=${accessToken}`
        );

        if (response.ok) {
          const data = await response.json();
          setSelectedModel(data.model); // Set the current model in the dropdown
        } else {
          console.error("Failed to fetch current model");
        }
      } catch (error) {
        console.error("Error fetching current model:", error);
      }
    }
  };

  fetchCurrentModel();
}, [tab]);

useEffect(() => {
  const fetchProfessionPrompts = async () => {
    if (tab === "professionPrompts") {
      setLoadingProfessionPrompts(true);
      const accessToken = localStorage.getItem("access_token"); // Get access token from cache
      if (!accessToken) {
        alert("Access token not found. Please log in again.");
        router.push("/auth/login");
        return;
      }

      try {
        const response = await fetch(
          `${config.apiBaseUrl}/profession-prompts/?token=${accessToken}`
        );

        if (response.ok) {
          const data = await response.json();
          setProfessionPrompts(data); // Populate the profession prompts
        } else {
          console.error("Failed to fetch profession prompts.");
        }
      } catch (error) {
        console.error("Error fetching profession prompts:", error);
      } finally {
        setLoadingProfessionPrompts(false);
      }
    }
  };

  fetchProfessionPrompts();
}, [tab, router]);

const addProfessionPrompt = async () => {
  const accessToken = localStorage.getItem("access_token"); // Get access token from cache
  if (!accessToken) {
    alert("Access token not found. Please log in again.");
    return;
  }

  try {
    const response = await fetch(
      `${config.apiBaseUrl}/profession-prompts/profession-with-prompt?token=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfessionPrompt),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      alert("Profession with Prompt added successfully.");
      setProfessionPrompts((prevPrompts) => [...prevPrompts, responseData]); // Add the new profession with prompt to the list
      setAddProfessionPromptModal(false); // Close the modal
      setNewProfessionPrompt({ name: "", system_prompt: "", description:"" }); // Reset the form
    } else {
      alert("Failed to add profession with prompt.");
    }
  } catch (error) {
    console.error("Error adding profession with prompt:", error);
    alert("An error occurred. Please try again.");
  }
};

const updateProfessionPrompt = async () => {
  const accessToken = localStorage.getItem("access_token"); // Get access token from cache
  if (!accessToken) {
    alert("Access token not found. Please log in again.");
    return;
  }

  try {
    const response = await fetch(
      `${config.apiBaseUrl}/profession-prompts/${selectedProfessionPrompt.profession_id}?token=${accessToken}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfessionPrompt),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      alert("Profession with Prompt updated successfully.");
      setProfessionPrompts((prevPrompts) =>
        prevPrompts.map((prompt) =>
          prompt.id === selectedProfessionPrompt.id ? responseData : prompt
        )
      ); // Update the profession prompt in the list
      setEditProfessionPromptModal(false); // Close the modal
    } else {
      alert("Failed to update profession with prompt.");
    }
  } catch (error) {
    console.error("Error updating profession with prompt:", error);
    alert("An error occurred. Please try again.");
  }
};

const deleteProfessionPrompt = async (promptId: number) => {
  const accessToken = localStorage.getItem("access_token"); // Get access token from cache
  if (!accessToken) {
    alert("Access token not found. Please log in again.");
    return;
  }

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this profession with prompt?"
  );
  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `${config.apiBaseUrl}/profession-prompts/profession/${promptId}?token=${accessToken}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Profession with Prompt deleted successfully.");
      setProfessionPrompts((prevPrompts) =>
        prevPrompts.filter((prompt) => prompt.profession_id !== promptId) // Use profession_id instead of id
      ); // Remove the deleted profession prompt from the list
    } else {
      alert("Failed to delete profession with prompt.");
    }
  } catch (error) {
    console.error("Error deleting profession with prompt:", error);
    alert("An error occurred. Please try again.");
  }
};

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden pt-32 bg-gradient-to-tr from-[#f6f2ff] to-[#ebe9ff]">
      {/* Sidebar */}
      <aside className="bg-white shadow-lg border-b lg:border-r flex lg:flex-col min-w-full lg:min-w-[240px]">
        <div className="px-6 py-4 text-xl font-bold text-indigo-600">
          SYMI Admin
        </div>
        <nav className="flex-1 px-4 space-y-2 lg:space-y-0 lg:flex lg:flex-col">
          <button
            className={`block w-full text-left px-4 py-2 rounded hover:bg-indigo-50 ${
              tab === "dashboard" ? "bg-indigo-100 text-indigo-700" : ""
            }`}
            onClick={() => handleTabChange("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded hover:bg-indigo-50 ${
              tab === "professions" ? "bg-indigo-100 text-indigo-700" : ""
            }`}
            onClick={() => handleTabChange("professions")}
          >
            Professions
          </button>

          <button
            className={`block w-full text-left px-4 py-2 rounded hover:bg-indigo-50 ${
              tab === "professionPrompts" ? "bg-indigo-100 text-indigo-700" : ""
            }`}
            onClick={() => handleTabChange("professionPrompts")}
          >
            Profession with Prompts
          </button>

          <button
            className={`block w-full text-left px-4 py-2 rounded hover:bg-indigo-50 ${
              tab === "chat" ? "bg-indigo-100 text-indigo-700" : ""
            }`}
            onClick={() => handleTabChange("chat")}
          >
            Chat History
          </button>

          <button
            className={`block w-full text-left px-4 py-2 rounded hover:bg-indigo-50 ${
              tab === "plans" ? "bg-indigo-100 text-indigo-700" : ""
            }`}
            onClick={() => handleTabChange("plans")}
          >
            Plans
          </button>

          <button
            className={`block w-full text-left px-4 py-2 rounded hover:bg-indigo-50 ${
              tab === "settings" ? "bg-indigo-100 text-indigo-700" : ""
            }`}
            onClick={() => handleTabChange("settings")}
          >
            Settings
          </button>
        </nav>
        <div className="px-4 py-4">
          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 text-sm sm:text-base">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        
        {tab === "dashboard" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h1 className="text-lg sm:text-2xl font-semibold">
                User Management
              </h1>
              {/* <button
                onClick={() => setShowModal(true)}
                className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-indigo-700"
              >
                Add New User
              </button> */}
            </div>
            <div className="w-full overflow-auto bg-white rounded-lg shadow p-4">
              <table className="min-w-[600px] w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 border-b">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Joined</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="px-4 py-2">{user.user}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{user.role}</td>
                        <td className="px-4 py-2">{user.status}</td>
                        <td className="px-4 py-2 text-right space-x-2">
                          <button className="text-blue-600 text-xs" onClick={() => openStatusModal(user)}>Edit</button>
                          <button className="text-red-500 text-xs" onClick={() => deleteUser(user.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "chat" && (
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold mb-4">
              Chat History
            </h1>
            <div className="w-full overflow-auto bg-white rounded-lg shadow p-4">
              <table className="min-w-[600px] w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 border-b">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className={`border-b cursor-pointer hover:bg-indigo-50 ${
                        loadingChatUserId === user.id ? "opacity-50 pointer-events-none" : ""
                      }`}
                      onClick={() => openChatModal(user)}
                    >
                      <td className="px-4 py-2">{user.user}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">{user.status}</td>
                      <td className="px-4 py-2 space-x-2">
                        {loadingChatUserId === user.id ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-t-transparent border-indigo-600 rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click event
                              openChatModal(user);
                            }}
                          >
                            View Chat
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "professions" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg sm:text-2xl font-semibold">List of Professions</h1>
              <button
                onClick={() => setAddProfessionModal(true)}
                className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-indigo-700"
              >
                Add Profession
              </button>
            </div>

            <div className="w-full overflow-auto bg-white rounded-lg shadow p-4">
              {loadingProfessions ? (
                <p>Loading professions...</p>
              ) : (
                <table className="min-w-[600px] w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b">
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Description</th>
                      <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {professions.map((profession) => (
                      <tr key={profession.id} className="border-b">
                        <td className="px-4 py-2">{profession.id}</td>
                        <td className="px-4 py-2">{profession.name}</td>
                        <td className="px-4 py-2">
                          {profession.description || ""}
                        </td>
                        <td className="px-4 py-2 text-right space-x-2">
                          <button
                            className="text-blue-600 text-xs"
                            onClick={() => openEditProfessionModal(profession)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 text-xs"
                            onClick={() => deleteProfession(profession.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold mb-4">Settings</h1>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4 max-w-lg">
              {/* <div>
                <label className="block text-sm font-medium mb-1">
                  App Name
                </label>
                <input
                  type="text"
                  className="w-full border px-4 py-2 rounded"
                  placeholder="SYMI Admin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Support Email
                </label>
                <input
                  type="email"
                  className="w-full border px-4 py-2 rounded"
                  placeholder="support@symi.com"
                />
              </div> */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Model
                </label>
                <select
                  className="w-full border px-4 py-2 rounded"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  <option>gpt-4o</option>
                  <option>gpt-4</option>
                  <option>gpt-3.5-turbo</option>
                </select>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={saveSettings}>
                Save Settings
              </button>
            </div>
          </div>
        )}

        {tab === "plans" && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-lg sm:text-2xl font-semibold">Plans</h1>
      <button
        onClick={() => setAddPlanModal(true)}
        className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-indigo-700"
      >
        Add Plan
      </button>
    </div>
    <div className="w-full overflow-auto bg-white rounded-lg shadow p-4">
      {loadingPlans ? (
        <p>Loading plans...</p>
      ) : (
                <table className="min-w-[600px] w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b">
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Description</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Currency</th>
                      <th className="px-4 py-2">Duration (Days)</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan) => (
                      <tr key={plan.id} className="border-b">
                        <td className="px-4 py-2">{plan.id}</td>
                        <td className="px-4 py-2">{plan.name}</td>
                        <td className="px-4 py-2">{plan.description}</td>
                        <td className="px-4 py-2">{plan.price}</td>
                        <td className="px-4 py-2">{plan.currency}</td>
                        <td className="px-4 py-2">{plan.duration_days}</td>
                        <td className="px-4 py-2">
                          {plan.is_active ? "Active" : "Inactive"}
                        </td>
                        <td className="px-4 py-2 text-right space-x-2">
                          <button
                            className="text-blue-600 text-xs"
                            onClick={() => {
                              setSelectedPlan(plan);
                              setUpdatedPlan(plan);
                              setEditPlanModal(true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 text-xs"
                            onClick={() => deletePlan(plan.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {tab === "professionPrompts" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg sm:text-2xl font-semibold">Profession with Prompts</h1>
              <button
                onClick={() => setAddProfessionPromptModal(true)}
                className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded text-sm hover:bg-indigo-700"
              >
                Add Profession with Prompt
              </button>
            </div>
            <div className="w-full overflow-visible bg-white rounded-lg shadow p-4">
              {loadingProfessionPrompts ? (
                <p>Loading profession prompts...</p>
              ) : (
                <table className="min-w-[600px] w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b">
                      {/* <th className="px-4 py-2">ID</th> */}
                      <th className="px-4 py-2">Profession Name</th>
                      <th className="px-4 py-2">System Prompt</th>
                    </tr>
                  </thead>
                  <tbody>
                      {professionPrompts.map((prompt) => (
                        <tr key={prompt.profession_id} className="border-b">
                          <td className="px-4 py-2">{prompt.profession_name}</td>
                          <td className="px-4 py-2">
                            <button
                              className="text-blue-600 text-xs hover:underline"
                              onClick={() => {
                                setSelectedPrompt(prompt.system_prompt); // Set the selected system prompt
                                setShowPromptModal(true); // Show the modal
                              }}
                            >
                              View
                            </button>
                          </td>
                          <td className="px-4 py-2 text-right space-x-2">
                            <button
                              className="text-blue-600 text-xs"
                              onClick={() => {
                                setSelectedProfessionPrompt(prompt);
                                setUpdatedProfessionPrompt({
                                  name: prompt.profession_name,
                                  system_prompt: prompt.system_prompt,
                                  description: prompt.description || "",
                                });
                                setEditProfessionPromptModal(true);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-500 text-xs"
                              onClick={() => deleteProfessionPrompt(prompt.profession_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Modal */}
    {showModal && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-[95vw] sm:w-full max-w-2xl h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Chat History</h2>

        <div ref={chatRef} className="relative flex-1 overflow-y-auto pr-2">
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
          <div className="space-y-[6px] px-1 pb-6">
            {selectedChat.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">
                User does not have any chat
              </p>
            ) : (
              selectedChat.map((msg, idx) => (
                <div key={idx} className="space-y-2">
                  {/* User Message */}
                  <div className="flex gap-2 items-end justify-start">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-xs rounded-full font-bold text-gray-700">
                      User
                    </div>
                    <div className="relative group max-w-sm px-3 py-2 rounded-lg text-sm leading-relaxed bg-gray-100 text-gray-800 border border-gray-300 break-words">
    <p>
      {typeof msg.message === "string" && msg.message.startsWith("{")
        ? JSON.parse(msg.message).message
        : msg.message}
    </p>
    <span className="text-xs text-gray-400 mt-1 block text-right">
      {new Date(msg.timestamp).toLocaleString()}
    </span>
  </div>
                  </div>

                  {/* Admin Response */}
                  <div className="flex gap-2 items-end justify-end">
                    <div className="relative group max-w-sm px-3 py-2 rounded-lg text-sm leading-relaxed bg-[#EEF2FF] text-indigo-900 border border-indigo-200">
                      <p>{msg.response}</p>
                      <span className="text-xs text-gray-400 mt-1 block text-right">
                        SYMI • {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center bg-indigo-200 text-xs rounded-full font-bold text-indigo-800">
                      A
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
      )}
      
    {/* Status Modal */}
    {statusModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setStatusModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-[95vw] sm:w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Change User Status</h2>
            <p className="mb-4">
              Change the status for <strong>{selectedUser?.name}</strong>.
            </p>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border px-4 py-2 rounded mb-4"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setStatusModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                onClick={changeUserStatus}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    {/* Add Profession Modal */}
    {addProfessionModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setAddProfessionModal(false)}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-xl w-[95vw] sm:w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-semibold mb-4">Add New Profession</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={newProfession.name}
                    onChange={(e) => setNewProfession({ ...newProfession, name: e.target.value })}
                    className="w-full border px-4 py-2 rounded"
                    placeholder="Enter profession name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newProfession.description}
                    onChange={(e) =>
                      setNewProfession({ ...newProfession, description: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded"
                    placeholder="Enter profession description"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setAddProfessionModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    onClick={addProfession}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
    {/* Edit Profession Modal */}
    {editProfessionModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setEditProfessionModal(false)}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-xl w-[95vw] sm:w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-lg font-semibold mb-4">Edit Profession</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={updatedProfession.name}
                    onChange={(e) =>
                      setUpdatedProfession({ ...updatedProfession, name: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded"
                    placeholder="Enter profession name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={updatedProfession.description}
                    onChange={(e) =>
                      setUpdatedProfession({ ...updatedProfession, description: e.target.value })
                    }
                    className="w-full border px-4 py-2 rounded"
                    placeholder="Enter profession description"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setEditProfessionModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    onClick={updateProfession}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

    {addPlanModal && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setAddPlanModal(false)}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-xl w-[95vw] sm:w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-4">Add New Plan</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={newPlan.name}
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter plan name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newPlan.description}
              onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter plan description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={newPlan.price}
              onChange={(e) => setNewPlan({ ...newPlan, price: parseFloat(e.target.value) })}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter plan price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select
              value={newPlan.currency}
              onChange={(e) => setNewPlan({ ...newPlan, currency: e.target.value })}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Duration (Days)</label>
            <input
              type="number"
              value={newPlan.duration_days}
              onChange={(e) => setNewPlan({ ...newPlan, duration_days: parseInt(e.target.value) })}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter duration in days"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Features</label>
            <textarea
              value={newPlan.features.join("; ")} // Join features with a semicolon for display
              onChange={(e) =>
                setNewPlan({
                  ...newPlan,
                  features: e.target.value.split(";").map((f) => f.trim()), // Split by semicolon and trim whitespace
                })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter features separated by semicolons (e.g., Feature 1; Feature 2)"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={newPlan.is_active ? "active" : "inactive"}
              onChange={(e) =>
                setNewPlan({ ...newPlan, is_active: e.target.value === "active" })
              }
              className="w-full border px-4 py-2 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setAddPlanModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={addPlan}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}

    {editPlanModal && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setEditPlanModal(false)}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-xl w-[95vw] sm:w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-4">Edit Plan</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={updatedPlan.name}
              onChange={(e) => setUpdatedPlan({ ...updatedPlan, name: e.target.value })}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter plan name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={updatedPlan.description}
              onChange={(e) =>
                setUpdatedPlan({ ...updatedPlan, description: e.target.value })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter plan description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={updatedPlan.price}
              onChange={(e) => setUpdatedPlan({ ...updatedPlan, price: parseFloat(e.target.value) })}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter plan price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select
              value={updatedPlan.currency}
              onChange={(e) => setUpdatedPlan({ ...updatedPlan, currency: e.target.value })}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Duration (Days)</label>
            <input
              type="number"
              value={updatedPlan.duration_days}
              onChange={(e) =>
                setUpdatedPlan({ ...updatedPlan, duration_days: parseInt(e.target.value) })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter duration in days"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Features</label>
            <textarea
              value={updatedPlan.features.join("; ")} // Join features with a semicolon for display
              onChange={(e) =>
                setUpdatedPlan({
                  ...updatedPlan,
                  features: e.target.value.split(";").map((f) => f.trim()), // Split by semicolon and trim whitespace
                })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter features separated by semicolons (e.g., Feature 1; Feature 2)"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={updatedPlan.is_active ? "active" : "inactive"}
              onChange={(e) =>
                setUpdatedPlan({ ...updatedPlan, is_active: e.target.value === "active" })
              }
              className="w-full border px-4 py-2 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setEditPlanModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={updatePlan}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}

    {showPromptModal && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowPromptModal(false)} // Close the modal on background click
      >
        <div
          className="bg-white p-6 rounded-lg shadow-xl w-[95vw] sm:w-full max-w-lg max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <h2 className="text-lg font-semibold mb-4">System Prompt</h2>
          <div className="text-sm text-gray-800 whitespace-pre-line overflow-y-auto max-h-[60vh]">
            {selectedPrompt}
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={() => setShowPromptModal(false)} // Close the modal
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}

    {addProfessionPromptModal && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setAddProfessionPromptModal(false)} // Close the modal on background click
      >
        <div
          className="bg-white p-6 rounded-lg shadow-xl w-[95vw] sm:w-full max-w-md"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <h2 className="text-lg font-semibold mb-4">Add Profession with Prompt</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Profession Name</label>
            <input
              type="text"
              value={newProfessionPrompt.name}
              onChange={(e) =>
                setNewProfessionPrompt({
                  ...newProfessionPrompt,
                  name: e.target.value,
                })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter profession name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">System Prompt</label>
            <textarea
              value={newProfessionPrompt.system_prompt}
              onChange={(e) =>
                setNewProfessionPrompt({
                  ...newProfessionPrompt,
                  system_prompt: e.target.value,
                })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter system prompt"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newProfessionPrompt.description}
              onChange={(e) =>
                setNewProfessionPrompt({
                  ...newProfessionPrompt,
                  description: e.target.value,
                })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter description"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setAddProfessionPromptModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={addProfessionPrompt}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}

    {editProfessionPromptModal && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setEditProfessionPromptModal(false)} // Close the modal on background click
      >
        <div
          className="bg-white p-6 rounded-lg shadow-xl w-[95vw] sm:w-full max-w-md"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <h2 className="text-lg font-semibold mb-4">Edit Profession with Prompt</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Profession Name</label>
            <input
              type="text"
              value={updatedProfessionPrompt.name}
              onChange={(e) =>
                setUpdatedProfessionPrompt({
                  ...updatedProfessionPrompt,
                  name: e.target.value,
                })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter profession name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">System Prompt</label>
            <textarea
              value={updatedProfessionPrompt.system_prompt}
              onChange={(e) =>
                setUpdatedProfessionPrompt({
                  ...updatedProfessionPrompt,
                  system_prompt: e.target.value,
                })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter system prompt"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={updatedProfessionPrompt.description}
              onChange={(e) =>
                setUpdatedProfessionPrompt({
                  ...updatedProfessionPrompt,
                  description: e.target.value,
                })
              }
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter description"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setEditProfessionPromptModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={updateProfessionPrompt}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}

    </div>
  );
};

export default AdminPanel;
