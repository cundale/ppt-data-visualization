import React from "react";
import "./CSS/Graphs.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import moment from "moment";
import SlideCount from "./SlideCount";
import PPTDistribution from "./PPTDistribution";
import TopTags from "./TopTags";
import SlidesPerFolder from "./SlidesPerFolder";
import SlidesVsTags from "./SlidesVsTags";
import FolderSummary from "./FolderSummary";
import AverageSlides from "./AverageSlides";
import SlidesStatsCombined from "./SlidesStatsCombined";
import Stats from "./Stats";

const Graphs = ({ filtered_data, folders }) => {
  return (
    <div className="graphs_container">
      {filtered_data.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: "36px",
            color: "red",
          }}
        >
          No Data to Show
        </div>
      ) : (
        <>
          <Stats folders={folders} filtered_data={filtered_data} />
          <PPTDistribution filtered_data={filtered_data} folders={folders} />
          <TopTags filtered_data={filtered_data} />
          <SlideCount folders={folders} filtered_data={filtered_data} />
          <SlidesStatsCombined filtered_data={filtered_data} folders={folders} />
          <SlidesVsTags filtered_data={filtered_data} folders={folders} />
          <FolderSummary filtered_data={filtered_data} folders={folders} />
        </>
      )}
    </div>
  );
};


export default Graphs;
