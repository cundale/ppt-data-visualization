import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import { useState } from "react";
import Graphs from "./Components/Graphs";

const App = () => {
  const [filteredPPTs, setFilteredPPTs] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState([]);

  return (
    <div className="App_Container">
      <Sidebar
        filteredPPTs={filteredPPTs}
        setFilteredPPTs={setFilteredPPTs}
        selectedFolders={selectedFolders}
        setSelectedFolders={setSelectedFolders}
      />
      <Graphs filtered_data={filteredPPTs} folders={selectedFolders}/>
    </div>
  );
};

export default App;
