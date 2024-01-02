import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Seasons = ({ seriesTitle }) => {
  const [seasonsData, setSeasonsData] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        // Send seriesTitle as a query parameter
        const response = await axios.get('http://localhost:8000/api/v1/series/getSeasons', {
          params: {
            seriesTitle: seriesTitle,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setSeasonsData(response.data.seasons);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSeasons();
  }, [seriesTitle]);

  console.log(seriesTitle);

  return (
    <div>
      <h2>Seasons</h2>
      {seasonsData.map((season) => (
        <div key={season._id}>
          <h1>{season.seasonNumber}</h1>
          <p>{season.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Seasons;
