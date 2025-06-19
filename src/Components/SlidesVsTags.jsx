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
import randomColor from "randomcolor";


const SlidesVsTags = ({filtered_data, folders}) => {
  const bubbleData = folders
    .map((folder) => {
      // For each file in the folder:
      const filesInFolder = filtered_data.filter((file) =>
        file.pptx_path.startsWith(folder)
      );
      return filesInFolder.map((file) => {
        const totalSlides = file.slide_details.length;

        // Count total tags in this file:
        const totalTags = file.slide_details.reduce((tagCount, slide) => {
          return (
            tagCount +
            (slide["Tags associated"] ? slide["Tags associated"].length : 0)
          );
        }, 0);

        // Count total images in this file:
        const totalImages = file.slide_details.reduce((imgCount, slide) => {
          return (
            imgCount +
            (slide["Images paths"] && slide["Images paths"].length > 0 ? 1 : 0)
          );
        }, 0);

        return {
          folder,
          pptx_name: file.pptx_name,
          slides: totalSlides,
          tags: totalTags,
          images: totalImages,
        };
      });
    })
    .flat();

  // Group data per folder for scatter chart:
  const dataByFolder = folders.map((folder) => {
    return {
      folder,
      color: randomColor(), // generate distinct color
      data: bubbleData.filter((item) => item.folder === folder),
    };
  });
  return (
    <div style={{ width: "100%", height: 500 }} className="graph">
      <h3>File Size vs. Content Correlation (Bubble Chart)</h3>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis
            dataKey="slides"
            name="Number of Slides"
            type="number"
            label={{
              value: "Number of Slides",
              position: "insideBottom",
              offset: -10,
            }}
          />
          <YAxis
            dataKey="tags"
            name="Total Tags"
            type="number"
            label={{
              value: "Total Tags",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <ZAxis
            dataKey="images"
            range={[60, 400]} // Bubble size
            name="Number of Images"
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value, name) => [value, name]}
          />
          <Legend wrapperStyle={{ paddingTop: 20 }}/>
          {dataByFolder.map((folderData) => (
            <Scatter
              key={folderData.folder}
              name={folderData.folder}
              data={folderData.data}
              fill={folderData.color}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SlidesVsTags;
