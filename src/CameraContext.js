// CameraContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const CameraContext = createContext();

const CameraProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [locationFilter, setLocationFilter] = useState("Location");
  const [statusFilter, setStatusFilter] = useState("Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [changeStatus, setChangeStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
          {
            headers: {
              Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy",
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [changeStatus]);

  const updateCameraStatus = async (id, newStatus) => {
    console.log("Request payload:", { id, status: newStatus });

    try {
      const response = await axios.put(
        "https://api-app-staging.wobot.ai/app/v1/update/camera/status",
        { id, status: newStatus },
        {
          headers: {
            Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy",
          },
        }
      );
      console.log("Response data:", response.data);
      setChangeStatus(response.data.data.status);

      if (response.data.success) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
      }
    } catch (error) {
      console.error(
        "Error updating camera status:",
        error.response || error.message
      );
    }
  };

  // Value to be provided
  const contextValue = {
    data,
    setData,
    error,
    loading,
    selectedRows,
    setSelectedRows,
    locationFilter,
    setLocationFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    changeStatus,
    setChangeStatus,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    updateCameraStatus,
  };

  return (
    <CameraContext.Provider value={contextValue}>
      {children}
    </CameraContext.Provider>
  );
};

export default CameraProvider;
