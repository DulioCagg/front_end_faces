import React from 'react';
import '../styles/rank.css';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="rank">
        {`${name}, Your current entry count is: ${entries} get better`}
      </div>
    </div>

  );
}

export default Rank;