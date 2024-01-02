import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Seasons from './Seasons';

const Series = () => {
    const [seriesData, setSeriesData] = useState([]);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/series/getSeries');
                setSeriesData(response.data.series); // Assuming the array is nested under 'series' property
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSeries();

    }, []);

    return (
        <div>
            <h1>Series</h1>
            {seriesData.map((series) => (
                <div key={series._id}>
                    <h1>{series.title}</h1>
                    <p>{series.description}</p>
                    <Seasons seriesTitle={series.title}/>
                </div>
            ))}
        </div>
    );
};

export default Series;
