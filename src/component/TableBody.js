import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiCloudOn } from "react-icons/ci";
import { MdSignalWifiStatusbar3Bar } from "react-icons/md";
import { MdDoDisturb } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import PaginationShow from "./PaginationShow";

const TableBody = ({
  searchQuery,
  setSearchQuery,
  locationFilter,
  setLocationFilter,
  data,
  setStatusFilter,
  statusFilter,
  selectedRows,
  setSelectedRows,
  paginatedData,
  rowsPerPage,
  currentPage,
  updateCameraStatus,
  handleCheckboxChange,
  handleDelete,
  pageCount,
  handlePageClick,
  handleRowsPerPageChange,
}) => {
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
        <PaginationShow
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          currentPage={currentPage}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      </div>
    </div>
  );
};

export default TableBody;
