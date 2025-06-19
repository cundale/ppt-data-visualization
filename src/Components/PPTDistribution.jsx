import "./CSS/PPTDistribution.css";
import React from "react";
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

const PPTDistribution = ({filtered_data, folders}) => {
  const colorPalette = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#00bfff",
    "#dda0dd",
    "#a0522d",
  ];

  //   PPT Distribution Across Folders
  const folderDistribution = folders.map((folder) => {
    const count = filtered_data.filter((file) =>
      file.pptx_path.startsWith(folder)
    ).length;
    return { folder, count };
  });

  return (
    <div style={{ width: "100%", height: 500 }} className="graph">
      <h3>PPT Distribution Across Folders</h3>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Pie
            data={folderDistribution}
            dataKey="count"
            nameKey="folder"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {folderDistribution.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorPalette[index % colorPalette.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PPTDistribution;
