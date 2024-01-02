import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';

const Episode = ({ seriesTitle, seasonNumber }) => {
  const [episodeData, setEpisodeData] = useState([]);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/series/getEpisodes', {
          params: {
            seriesTitle: seriesTitle,
            seasonNumber: seasonNumber,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setEpisodeData(response.data.episodes || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEpisode();
  }, [seriesTitle, seasonNumber]);

  return (
    <div>
      <h4>Episodes</h4>
      {episodeData.map((episode) => (
        <div key={episode._id}>
          <h5>{`Episode ${episode.episodeNumber}`}</h5>
          <p>Description: {episode.description}</p>
          <p>Video Path: {episode.videoPath}</p>
          <p>Release Date: {new Date(episode.releaseDate).toLocaleString()}</p>
          <VideoPlayer videoPath={episode.videoPath}/>
        </div>
      ))}
    </div>
  );
};

export default Episode;
