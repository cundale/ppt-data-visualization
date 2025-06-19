import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import './CSS/SlideCount.css';

const SlideCount = ({ filtered_data }) => {
  // Initialize an array to store counts for each slide count from 0 to 50
  const slideCountData = Array.from({ length: 51 }, () => 0); // Array of size 51 for slide counts (0 to 50)

  if (filtered_data && filtered_data.length > 0) {
    filtered_data.forEach((file) => {
      const slideCount = file.slide_details?.length || 0;
      if (slideCount <= 50) {
        slideCountData[slideCount] += 1; // Increment the count for this slide count
      }
    });
  }

  // Convert the slide count data into a format compatible with Recharts
  const chartData = slideCountData.map((count, index) => ({
    name: index, // X-axis will represent the slide count (0, 1, 2, ..., 50)
    count,
  }));

  return (
    <div className="slide-count">
      {filtered_data.length === 0 ? (
        <p>No Data available</p>
      ) : (
        <>
          <h3>Slide Count Distribution (Line Graph)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                label={{
                  value: "Number of Slides",
                  position: "insideBottom",
                  offset: -5,
                }}
                type="number"
                domain={['auto', 'auto']} // Ensures a continuous scale on the X-axis
              />
              <YAxis
                label={{
                  value: "Number of PPT Files",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              {/* Line to plot the data */}
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3f81eb"
                name="PPT Files"
                strokeWidth={3}
                activeDot={{ r: 8 }} // Dot for active points
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default SlideCount;
