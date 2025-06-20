import React from "react";
import "./CSS/Sidebar.css";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import data from "../data.json";
import OpenSidebar from "../images/sidebar_open.png";
import CloseSidebar from "../images/sidebar_close.png";

const Sidebar = ({
  filteredPPTs,
  setFilteredPPTs,
  selectedFolders,
  setSelectedFolders,
}) => {
  const [value, setValue] = React.useState([0, 50]);
  function valuetext(value) {
    return `${value}`;
  }
  const [folders, setFolders] = useState([]);
  const [startDate, setStartDate] = useState(dayjs("2022-04-17"));
  const [endDate, setEndDate] = useState(dayjs());
  const [minSlides, setMinSlides] = useState(0);
  const [maxSlides, setMaxSlides] = useState(50);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  //   Find the Folders
  useEffect(() => {
    const folderNames = Array.from(
      new Set(data.map((item) => item.pptx_path.split("/")[0]))
    );
    setFolders(folderNames);
    setSelectedFolders(folderNames);
  }, []);

  // Manage Filters
  useEffect(() => {
    const filtered = data.filter((item) => {
      const folder = item.pptx_path.split("/")[0];
      const creationDate = new Date(item.creation_date);
      const slideCount = item.slide_details.length;

      const folderMatch = selectedFolders.includes(folder);
      const dateMatch =
        (!startDate || creationDate >= startDate.toDate()) &&
        (!endDate || creationDate <= endDate.toDate());
      const slideMatch = slideCount >= value[0] && slideCount <= value[1];

      return folderMatch && dateMatch && slideMatch;
    });

    setFilteredPPTs(filtered);
  }, [selectedFolders, startDate, endDate, value]);

  const handleFolderChange = (folder) => {
    setSelectedFolders((prev) =>
      prev.includes(folder)
        ? prev.filter((f) => f !== folder)
        : [...prev, folder]
    );
  };

  return (
    <div
      className={`Sidebar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <div className="container">
        {/* Sidebar Icon*/}
        <button
          className="sidebar-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <img src={CloseSidebar} className="sidebar-icon"></img>
          ) : (
            <img src={OpenSidebar} className="sidebar-icon"></img>
          )}
        </button>

        {isSidebarOpen && (
          <>
            {/* Folder Selection */}
            <p className="filter-title">Folders</p>
            {folders.map((folder) => (
              <label key={folder} className="folder-label">
                <input
                  type="checkbox"
                  checked={selectedFolders.includes(folder)}
                  onChange={() => handleFolderChange(folder)}
                />
                {folder}
              </label>
            ))}

            {selectedFolders.length === 0 ? (
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  className="folder-btn"
                  onClick={() => setSelectedFolders(folders)}
                >
                  Select All
                </Button>
              </Stack>
            ) : (
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  className="folder-btn"
                  onClick={() => setSelectedFolders([])}
                >
                  Deselect All
                </Button>
              </Stack>
            )}

            {/* Date Selection */}

            <p className="filter-title">Data Range</p>
            <div className="date_input">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="From"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="To"
                    value={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            {/* Slide Range */}
            <p className="filter-title">Number of Slides</p>
            <div className="slide_range">
              <Box sx={{ width: 150 }}>
                <Slider
                  getAriaLabel={() => "Temperature range"}
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
              </Box>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
