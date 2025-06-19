import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

const SlidesPerFolder = ({ filtered_data, folders }) => {
  // Calculate total slides for each folder
  const slidesByFolder = folders.map((folder) => {
    const filesInFolder = filtered_data.filter((file) =>
      file.pptx_path.startsWith(folder)
    );
    const totalSlides = filesInFolder.reduce(
      (acc, file) => acc + file.slide_details.length,
      0
    );

    return {
      folder,
      totalSlides,
    };
  });

  return (
    <div style={{ width: "100%", height: 500 }} className="graph">
      <h3>Slides per Folder</h3>
      <ResponsiveContainer>
        <BarChart
          data={slidesByFolder}
          margin={{ top: 20, right: 20, left: 20, bottom: 40 }} // Adjusted bottom margin
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="folder"
            label={{
              value: "Folder Names",
              position: "insideBottom",
              offset: -40, // Previously -5, increasing gap
            }}
            angle={-30}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            label={{
              value: "Slide Count",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: 40 }}
          />
          {/* Bar chart for total slides per folder */}
          <Bar dataKey="totalSlides" fill="#8884d8" name="Total Slides">
            <LabelList dataKey="totalSlides" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SlidesPerFolder;
