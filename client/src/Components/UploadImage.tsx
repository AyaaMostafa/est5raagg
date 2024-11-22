import React, { useState } from 'react';
import axios from 'axios';
import '../style/style.scss';

const UploadImage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{
    name: string;
    size: string;
    progress: string;
    preview: string;
  }[]>([]);
  const [conversionResult, setConversionResult] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageDescription, setImageDescription] = useState<string | null>(null); 

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        progress: '✔',
        preview: URL.createObjectURL(file),
      }));
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleConvertClick = async () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload a file before converting!');
      return;
    }

    const formData = new FormData();
    const fileToUpload = uploadedFiles[0];

    
    formData.append('file', fileToUpload as any); 

    try {
      
      const response = await axios.post('http://10.100.102.6:1331/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { imageUrl, description } = response.data;

     
      setImageUrl(imageUrl);
      setImageDescription(description);
      setConversionResult('Conversion successful!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="upload-image-container">
      <header className="upload-image-header">
        <img src="Group 1000001110 (1).png" alt="Logo" className="logo" />
        <img src="Vector (2).png" alt="Settings" className="settings-icon" />
      </header>

      <div className="upload-image-content">
        <p className="center-text">Convert Your photo to AR Text</p>
        <div className="upload-section">
          <div className="drag-drop-area">
            {uploadedFiles.length > 0 && uploadedFiles[0].preview ? (
              <img
                src={uploadedFiles[0].preview}
                alt="Preview"
                className="upload-preview"
              />
            ) : (
              <img src="Vector-2 (1).png" alt="Upload Icon" className="upload-icon" />
            )}
            <p>
              <strong>Drag and drop your file or</strong>
            </p>
            <label className="browse-button">
              Browse
              <input type="file" onChange={handleFileUpload} multiple hidden />
            </label>
          </div>
          <hr className="custom-hr" />
          <div className="uploaded-files">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-info">
                  <div className="file-icon">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="file-icon-image"
                    />
                  </div>
                  <div className="file-details">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{file.size}</span>
                  </div>
                </div>
                <div className="file-status">{file.progress}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="convert-button-container">
          <button className="convert-button" onClick={handleConvertClick}>
            Convert
          </button>
        </div>

        {conversionResult && (
          <div className="result-section">
            <h3>Results</h3>
            <div className="result-text-box">
              <p>{conversionResult}</p>
            </div>
            <div className="result-description">
              <p>
                The uploaded file description is as follows:
                <strong>{uploadedFiles[0]?.name || 'No file uploaded'}</strong>
              </p>
            </div>
            <div className="reconvert-button-container">
              <button
                className="reconvert-button"
                onClick={() => setConversionResult(null)}
              >
                Re-Convert
              </button>
            </div>
          </div>
        )}

        {imageUrl && (
          <div className="api-result">
            <img src={imageUrl} alt="Converted" className="api-image" />
            <p className="image-description">{imageDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
