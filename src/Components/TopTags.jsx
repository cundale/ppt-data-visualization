import React from "react";
import "./CSS/TopTags.css";
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
const TopTags = ({filtered_data}) => {
  //   Tag Frequency Analysis
  const tagFrequency = {};

  filtered_data.forEach((file) => {
    file.slide_details.forEach((slide) => {
      if (slide["Tags associated"] && Array.isArray(slide["Tags associated"])) {
        slide["Tags associated"].forEach((tag) => {
          const upperTag = tag.toUpperCase(); // Convert tag to uppercase
          tagFrequency[upperTag] = (tagFrequency[upperTag] || 0) + 1;
        });
      }
    });
  });

  const topTags = Object.entries(tagFrequency)
    .sort((a, b) => b[1] - a[1]) // Sort by frequency descending
    .slice(0, 20) // Top 20 tags
    .map(([tag, count]) => ({ text: tag, value: count }));

  console.log(topTags);
  console.log(filtered_data.length);

  const options = {
    rotations: 2,
    rotationAngles: [0, 90],
    fontSizes: [15, 50],
    padding: 1,
    scale: "sqrt",
  };
  return (
    <div style={{ width: "100%", height: "800px" }} className="graph">
      <h3>Top 20 Tag Frequency Analysis</h3>
      <ResponsiveContainer>
        <BarChart data={topTags} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            label={{
              value: "Frequency Count",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis type="category" dataKey="text" width={200} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" name="Tag Frequency" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopTags;
