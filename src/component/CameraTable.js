import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiCloudOn } from "react-icons/ci";
import {
  MdSignalWifiStatusbar3Bar,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import axios from "axios";
import { MdDoDisturb } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import ReactPaginate from "react-paginate";
import { GoDotFill } from "react-icons/go";

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
    <div className="camera_body">
      <div className="camera_heading">
        <div className="heading">
          <h2>Cameras</h2>
          <p className="cameras_tag">Manage your cameras here.</p>
        </div>
        <div className="search_cameras">
          <input
            type="text"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search_icon">
            <IoSearchOutline />
          </span>
        </div>
      </div>
      <div className="camera_table">
        <div className="table_filters">
          <div className="loc_cameras selection_filters">
            <span>
              <CiLocationOn />
            </span>
            <select
              className="select_filter"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="Location">Location</option>
              {data &&
                data.map((item, index) => (
                  <option key={index} value={item.location}>
                    {item.location}
                  </option>
                ))}
            </select>
          </div>
          <div className="status_cameras selection_filters">
            <span>
              <MdSignalWifiStatusbar3Bar />
            </span>
            <select
              className="select_filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="Status">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="tables_fields">
          <table id="customers">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setSelectedRows(
                        e.target.checked
                          ? paginatedData.map((item) => item.id)
                          : []
                      )
                    }
                    checked={
                      paginatedData &&
                      selectedRows.length === paginatedData.length
                    }
                  />
                </th>
                <th>NAME</th>
                <th>HEALTH</th>
                <th>LOCATION</th>
                <th>RECORDER</th>
                <th>TASK</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData &&
                paginatedData.map((item) => (
                  <tr key={item.id} className="table_body">
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>

                    <td className="name_table">
                      <span className="name_dot">
                        <GoDotFill />
                      </span>
                      {item.name}
                    </td>
                    <td>
                      <span>
                        <CiCloudOn />
                      </span>
                      <div
                        className="pie"
                        style={{
                          "--p": "70",
                          "--b": "2px",
                          "--c": "orange",
                        }}
                      >
                        {item.health.cloud}
                      </div>
                      <span>
                        <CiCloudOn />
                      </span>
                      <div
                        className="pie"
                        style={{
                          "--p": "70",
                          "--b": "2px",
                          "--c": "green",
                        }}
                      >
                        {item.health.device}
                      </div>
                    </td>
                    <td>{item.location}</td>
                    <td>{item.recorder || "N/A"}</td>
                    <td>{item.tasks}</td>
                    <td
                      style={{
                        color: item.status === "Active" ? "green" : "red",
                      }}
                      className="status"
                    >
                      {item.status}
                    </td>
                    <td>
                      {selectedRows.includes(item.id) ? (
                        <>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="delete_btn"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() =>
                              updateCameraStatus(
                                item.id,
                                item.status === "Active" ? "Inactive" : "Active"
                              )
                            }
                            className="update_btn"
                          >
                            Update
                          </button>
                        </>
                      ) : (
                        <MdDoDisturb />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pagination_style">
          <div className="rows_per_page">
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="page-number">
            {currentPage + 1} of {pageCount}
          </div>
          <ReactPaginate
            previousLabel={<MdChevronLeft />}
            nextLabel={<MdChevronRight />}
            breakLabel={""}
            onPageChange={handlePageClick}
            forcePage={currentPage}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            marginPagesDisplayed={0}
            pageRangeDisplayed={0}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousClassName={"prev"}
            nextClassName={"next"}
            disabledClassName={"disabled"}
          />
        </div>
      </div>
    </div>
  );
};

export default CameraTable;
