import React, { useEffect, useState } from "react";
import axios from "axios";
import TableBody from "./TableBody";

const CameraTable = () => {
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

  console.log("for status", changeStatus);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
    setSelectedRows((prevSelected) =>
      prevSelected.filter((rowId) => rowId !== id)
    );
  };

  const filteredData = data?.filter((item) => {
    const locationMatch =
      locationFilter === "Location" || item.location === locationFilter;
    const statusMatch =
      statusFilter === "Status" || item.status === statusFilter;

    const searchMatch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    return locationMatch && statusMatch && searchMatch;
  });

  const pageCount = Math.ceil((filteredData?.length || 0) / rowsPerPage);
  const paginatedData = filteredData?.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <TableBody
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      locationFilter={locationFilter}
      setLocationFilter={setLocationFilter}
      data={data}
      setStatusFilter={setStatusFilter}
      statusFilter={statusFilter}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      paginatedData={paginatedData}
      rowsPerPage={rowsPerPage}
      currentPage={currentPage}
      updateCameraStatus={updateCameraStatus}
      handleCheckboxChange={handleCheckboxChange}
      handleDelete={handleDelete}
      pageCount={pageCount}
      handleRowsPerPageChange={handleRowsPerPageChange}
      handlePageClick={handlePageClick}
    />
  );
};

export default CameraTable;
