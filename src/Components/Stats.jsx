import React from 'react';
import "./CSS/Stats.css";
import { FileText, Calendar, Folder, Tag } from 'lucide-react';

const Stats = ({ filtered_data, folders }) => {
  const totalPresentations = filtered_data.length;
  const totalSlides = filtered_data.reduce((acc, curr) => acc + curr.slide_details.length, 0);
  const totalFolders = folders.length;
  const allTags = filtered_data.flatMap(file =>
    file.slide_details.flatMap(slide => slide['Tags associated'])
  );
  const uniqueTags = [...new Set(allTags)];

  const statsData = [
    {
      title: "Total Presentations",
      value: totalPresentations,
      subtitle: "Across all folders",
      icon: <FileText size={20} />,
      color: "blue",
    },
    {
      title: "Total Slides",
      value: totalSlides,
      subtitle: `~${Math.round(totalSlides / (totalPresentations || 1))} slides per presentation`,
      icon: <Calendar size={20} />,
      color: "green",
    },
    {
      title: "Folders",
      value: totalFolders,
      subtitle: "Organized collections",
      icon: <Folder size={20} />,
      color: "purple",
    },
    {
      title: "Unique Tags",
      value: uniqueTags.length,
      subtitle: "Different topics covered",
      icon: <Tag size={20} />,
      color: "orange",
    },
  ];

  return (
    <div className="stats-container">
      {statsData.map((item, idx) => (
        <div className="stat-card" key={idx}>
          <div className="stat-content">
            <div>
              <h4>{item.title}</h4>
              <h2>{item.value}</h2>
              <p>{item.subtitle}</p>
            </div>
            <div className={`icon-circle ${item.color}`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
