import { useEffect, useState } from 'react'
import './App.css'
import VideoPlayer from './VideoPlayer'
import axios from 'axios'
import Series from './Series'

function App() {
  const [data,setData] = useState([]);
  const [videoPath,setVideoPath] = useState('');
  useEffect(()=>{

    const fetchMovie = async () =>{
      try{
        const response = await axios.get('http://localhost:8000/api/v1/movies/getmovies');
        setData(response.data);
      }catch (error){
        console.error('Error fetching data:', error);
      }
    };

    fetchMovie();

  },[]);

  useEffect(() => {
    if (data && data.length > 0) {
      const firstMovie = data[0];
      setVideoPath(firstMovie.videoPath);
    }
  }, [data]);



  return (
    <>
    
    {data.map((movie) => (
        <div key={movie._id}>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          {/* Add more properties as needed */}
        </div>
      ))}
      <VideoPlayer videoPath={videoPath} />
      <Series/>
    </>
  )
}

export default App
