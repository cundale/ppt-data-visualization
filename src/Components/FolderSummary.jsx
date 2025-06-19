import React from 'react';
import './CSS/FolderSummary.css'; // Import the CSS file

const FolderSummary = ({ filtered_data, folders }) => {
  const folderSummary = folders.map((folder) => {
    const filesInFolder = filtered_data.filter((file) =>
      file.pptx_path.startsWith(folder)
    );
    const pptCount = filesInFolder.length;

    const totalSlides = filesInFolder.reduce(
      (sum, file) => sum + file.slide_details.length,
      0
    );
    const avgSlides = pptCount ? (totalSlides / pptCount).toFixed(2) : 0;

    // Collect all tags (converted to uppercase):
    const allTags = filesInFolder.flatMap((file) =>
      file.slide_details.flatMap((slide) =>
        (slide["Tags associated"] || []).map((tag) => tag.toUpperCase())
      )
    );

    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map((entry) => `${entry[0]} (${entry[1]})`)
      .join(", ");

    return {
      folder,
      pptCount,
      totalSlides,
      avgSlides,
      topTags,
    };
  });

  return (
    <div className="folder-summary-container">
      <h3>Folder Summary Table</h3>
      <table className="folder-summary-table">
        <thead>
          <tr>
            <th>Folder</th>
            <th>PPT Count</th>
            <th>Total Slides</th>
            <th>Avg Slides/PPT</th>
            <th>Top Tags</th>
          </tr>
        </thead>
        <tbody>
          {folderSummary.map((row, index) => (
            <tr key={index}>
              <td>{row.folder}</td>
              <td>{row.pptCount}</td>
              <td>{row.totalSlides}</td>
              <td>{row.avgSlides}</td>
              <td>{row.topTags}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FolderSummary;
