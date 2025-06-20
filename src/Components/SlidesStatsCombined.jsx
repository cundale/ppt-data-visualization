import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

const SlidesStatsCombined = ({ filtered_data, folders }) => {
  // Prepare combined data
  const slidesByFolder = folders.map((folder) => {
    const filesInFolder = filtered_data.filter((file) =>
      file.pptx_path.startsWith(folder)
    );
    const totalSlides = filesInFolder.reduce(
      (acc, file) => acc + file.slide_details.length,
      0
    );
    const avgSlides =
      filesInFolder.length > 0 ? totalSlides / filesInFolder.length : 0;

    return {
      folder,
      totalSlides,
      avgSlides: Number(avgSlides.toFixed(2)), // rounded to 2 decimals
    };
  });

  return (
    <div style={{ width: "100%", height: 500 }} className="graph">
      <h3>Total Slides and Average Slides per PPT by Folder</h3>
      <ResponsiveContainer>
        <ComposedChart
          data={slidesByFolder}
          margin={{ top: 20, right: 40, left: 40, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="folder"
            angle={-30}
            textAnchor="end"
            interval={0}
            label={{
              value: "Folder Names",
              position: "insideBottom",
              offset: -40,
            }}
          />

          {/* Left Y-axis for totalSlides */}
          <YAxis
            yAxisId="left"
            label={{
              value: "Total Slides",
              angle: -90,
              position: "insideLeft",
            }}
          />

          {/* Right Y-axis for avgSlides */}
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Avg Slides per PPT",
              angle: -90,
              position: "insideRight",
            }}
          />

          <Tooltip />
          <Legend verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: 35 }} />

          {/* Bar for total slides on left Y axis */}
          <Bar dataKey="totalSlides" fill="#8884d8" name="Total Slides" yAxisId="left">
            <LabelList dataKey="totalSlides" position="top" />
          </Bar>

          {/* Line for average slides on right Y axis */}
          <Line
            type="monotone"
            dataKey="avgSlides"
            stroke="#ff7300"
            name="Avg Slides per PPT"
            yAxisId="right"
            strokeWidth={4}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SlidesStatsCombined;
