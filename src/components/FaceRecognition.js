import React from 'react';
import '../styles/FaceRecognition.css'

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="center faceRec">
      <div className="wrapper">
        <img id="img" alt="" src={imageURL} className="imgPre" />
        <div className="bounding_box"
          style={{ top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow }}>
        </div>
      </div>
    </div>
  );
}

export default FaceRecognition;