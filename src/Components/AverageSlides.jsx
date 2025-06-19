import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, LabelList } from 'recharts';

const AverageSlides = ({ filtered_data, folders }) => {
  // Calculate average slides per folder
  const avgSlidesByFolder = folders.map((folder) => {
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
      avgSlides: Number(avgSlides.toFixed(2)), // Round to 2 decimal places
    };
  });

  return (
    <div style={{ width: "100%", height: 500 }} className="graph">
      <h3>Average Slides per Folder</h3>
      <ResponsiveContainer>
        <BarChart
          data={avgSlidesByFolder}
          margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="folder"
            label={{
              value: "Folder Names",
              position: "insideBottom",
              offset: -35,
            }}
            angle={-30}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            label={{
              value: "Average Slide Count",
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
          {/* Bar chart for average slides per folder */}
          <Bar dataKey="avgSlides" fill="#82ca9d" name="Avg Slides per Folder">
            <LabelList dataKey="avgSlides" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSlides;
