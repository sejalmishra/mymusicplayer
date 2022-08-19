import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import AudioButtons from './AudioButtons';

function App({tracks}) {
  const [trackIndex,setTrackIndex] = useState(0);
  const [isPlaying,setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [liked,setLiked] = useState(false);

  const { title, artist, image, audioSrc, link }= tracks[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;

//   const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
// const trackStyling = `
//   -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
// `; 

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if(audioRef.current.ended){
      toNext();
      } else{
      setTrackProgress(audioRef.current.currentTime);
    }
    }, [1000]);
  }
  useEffect(() => {
    if(isPlaying){
      audioRef.current.play();
      startTimer();
    } else{
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  },[isPlaying]);

  useEffect(() => {
    return () => {
    audioRef.current.pause();
    clearInterval(intervalRef.current);
    }
  },[]);

  useEffect(() => {
  audioRef.current.pause();
  audioRef.current = new Audio(audioSrc);
  setTrackProgress(audioRef.current.currentTime);

  if(isReady.current){
    audioRef.current.play();
    setIsPlaying(true);
    startTimer();
  } else{
    isReady.current = true;
  }
  if(localStorage.getItem(JSON.stringify(title))){
    setLiked(true);
  }
  else{
  setLiked(false);
  }
  },[trackIndex]);

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  }
  
  const onScrubEnd = () => {
    if(!isPlaying){
      setIsPlaying(true);
    }
    startTimer();
  }

  const toPrevious = () => {
    if(trackIndex-1<0){
      setTrackIndex(tracks.length-1);
    }
    else{
      setTrackIndex(trackIndex-1);
    }
  }

  const toNext = () => {
    if((trackIndex+1)>=tracks.length){
      setTrackIndex(0);
    }
    else{
      setTrackIndex(trackIndex+1);
    }
  }
  const storeSong = () => {
    if(localStorage.getItem(JSON.stringify(title))){
      localStorage.removeItem(JSON.stringify(title));
      setLiked(false);
    }
    else{
    localStorage.setItem(JSON.stringify(title), JSON.stringify(audioSrc));
    setLiked(true);
    }
  }


  return (
    <div className="music-player">
    <div className='imgdiv'>
helloooooooohjbsdjhds shdsuidsiu
    </div>
    <div className='artist-info'>
    </div>
    {"00:00" && <h4 class="top">0{Math.floor(trackProgress/60)} : {Math.floor(trackProgress%60)<10 ? `0${Math.floor(trackProgress)%60}`: Math.floor(trackProgress)%60}</h4>}
    <input type="range" value={trackProgress} step="1" min="0" max={duration ? duration : `${duration}`} onChange={(e) => onScrub(e.target.value)} onMouseUp={onScrubEnd} 
        onKeyUp={onScrubEnd}/> 
    {duration? <h4 class="bottom">0{Math.floor(duration/60)} : {Math.floor(duration%60)}</h4> : <h4 class="bottom">00:00</h4>}
    <div className='audiobtndiv'>
    <AudioButtons isPlaying={isPlaying} liked={liked} toPrevious={toPrevious} toNext={toNext} onPlayPause={setIsPlaying} link={link} storeSong={storeSong}/>
    </div>
    </div>
  );
}

export default App;
// {duration? `${Math.floor(trackProgress%60)<10 ? `0${Math.floor(trackProgress)%60}`: `${Math.floor(trackProgress)%60}`}` : "0:00" }

