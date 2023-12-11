import React, { useEffect, useState } from 'react';
import './Article.css'
const Articles = () => {
  const [prediction, setPrediction] = useState(null);
  const [matchingRows, setMatchingRows] = useState([]);
  const [allRows, setAllRows] = useState([]); // State to store all rows
  const skillToMatch = 'Javascript'; // Replace with the actual skill you want to match

  const loadModel = async () => {
    try {
      // Mock prediction value as 4
      const mockPrediction =4;
      setPrediction(mockPrediction);
  
      // Make a request to the backend API to get matching rows
      const response = await fetch(`http://localhost:3001/api/getRows/${mockPrediction}/${skillToMatch}`);
      const data = await response.json();
  
      console.log('Matching rows from API:', data);
      setMatchingRows(data);

      // Update allRows state to include the new rows
      setAllRows((prevRows) => [...prevRows, ...data]);
      console.log(allRows);
    } catch (error) {
      console.error('Error loading or predicting with the model:', error);
    }
  };
  

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <div className="articles-container">
    {matchingRows.length > 0 && (
      <div>
        <h1 className="main-heading">Recommended Articles</h1>
        <ul className="article-list">
          {matchingRows.slice(0,5).map((row, index) => (
            <li key={row.id} className="article-item">
              <p className="article-title">
                {index + 1}:{" "}
                <a href={row.Url} target="_blank" rel="noopener noreferrer">
                  {row.Title}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  );
};

export default Articles;
