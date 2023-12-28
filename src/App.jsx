import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoPlayer from './VideoPlayer'
import axios from 'axios'

function App() {
  const [data,setData] = useState();
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

  console.log(data);
  console.log(videoPath); //get videoPath


  return (
    <>
      <VideoPlayer videoPath={videoPath}/>
    </>
  )
}

export default App
