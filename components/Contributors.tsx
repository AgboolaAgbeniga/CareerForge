import React from 'react';
import contributorsData from '../contributors.json';

interface ContributorsProps {}

const Contributors: React.FC<ContributorsProps> = () => {
  const { contributors, lastUpdated } = contributorsData;

  return (
    <div className="text-center">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Contributors</h3>
      <div className="flex flex-wrap justify-center gap-2 mb-2">
        {contributors.map((contributor, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
          >
            {contributor}
          </span>
        ))}
      </div>
      <p className="text-xs text-slate-500">
        Last updated: {new Date(lastUpdated).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Contributors;