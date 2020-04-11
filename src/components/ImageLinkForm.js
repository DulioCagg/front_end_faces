import React from 'react';
import '../styles/ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSearch }) => {
  return (
    <div>
      <p className="imgLink">
        {`This application can detect faces in the pictures. Try it boys!`}
      </p>
      <div className="center">
        <div className="center form">
          <input type="text" className="imgInp" onChange={onInputChange} />
          <button className="imgButt" onClick={onSearch} >Try it!</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;