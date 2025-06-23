import React from 'react';
import './CSS/Stats.css';
import { FileText, Folder, Calendar, Tag } from 'lucide-react';

const Stats = ({ filtered_data, folders }) => {
  // Total Presentations
  const totalPresentations = filtered_data.length;

  // Total Slides
  const totalSlides = filtered_data.reduce((acc, curr) => acc + curr.slide_details.length, 0);

  // Total Folders
  const totalFolders = folders.length;

  // Unique Tags
  const allTags = filtered_data.flatMap(file => 
    file.slide_details.flatMap(slide => slide['Tags associated'])
  );
  const uniqueTags = [...new Set(allTags)];

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-content">
          <div>
            <h3>Total Presentations</h3>
            <p className="stat-value">{totalPresentations}</p>
            <p>Across all folders</p>
          </div>
          <div className="icon-wrapper blue-bg">
            <FileText className="stat-icon" />
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div>
            <h3>Total Slides</h3>
            <p className="stat-value">{totalSlides}</p>
            <p>~{(totalSlides / totalPresentations || 0).toFixed(1)} slides per presentation</p>
          </div>
          <div className="icon-wrapper green-bg">
            <Calendar className="stat-icon" />
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div>
            <h3>Unique Tags</h3>
            <p className="stat-value">{uniqueTags.length}</p>
            <p>Different topics covered</p>
          </div>
          <div className="icon-wrapper orange-bg">
            <Tag className="stat-icon" />
          </div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-content">
          <div>
            <h3>Folders</h3>
            <p className="stat-value">{totalFolders}</p>
            <p>Organized collections</p>
          </div>
          <div className="icon-wrapper purple-bg">
            <Folder className="stat-icon" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Stats;
