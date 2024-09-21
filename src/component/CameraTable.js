import React, { useContext } from "react";
import TableBody from "./TableBody";
import { CameraContext } from "../CameraContext";

const CameraTable = () => {

  const {
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
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    updateCameraStatus,
  } = useContext(CameraContext);

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
