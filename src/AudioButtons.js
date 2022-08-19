// import React from "react";
import  Next  from "./assets/next-track.png";
import  Previous  from "./assets/previous.png";
import  play  from "./assets/play-buton.png";
import  stop  from "./assets/pause.png";
import linkit from "./assets/share.png";
import love from "./assets/love.png";
import heart from "./assets/heart.png";

const AudioButtons = ({ isPlaying, liked, toPrevious, toNext, onPlayPause, link, storeSong  }) => {
    return( 
    <div class="btns">
    <div className="btndiv">
     {liked? 
         <button className="btnfix" type="button" onClick={storeSong}><img className="btnimg" src={heart} alt="error"/></button>
            :
         <button className="btnfix" type="button" onClick={storeSong}><img className="btnimg" src={love} alt="error"/></button>
     }
    </div>
    <div className="btndiv anchor">
    <a href={link}><img className="btnimg" src={linkit} alt="error"/></a>
    </div>
    <div className="btndiv">
    <button className="btnfix" type="button" onClick={toPrevious}><img className="btnimg" src={Previous} alt="error"/></button>
    </div>
    <div className="btndiv">
    <button className="btnfix" onClick={toNext}><img className="btnimg" src={Next} alt="error"/></button>
    </div>
    <div className="btndiv giantbtn">
    {isPlaying ? 
    <button className="btnfix" onClick={() => onPlayPause(false)}><img className="btnimg largebtn" src={stop} alt="error"/></button>
     : 
    <button className="btnfix" onClick={() => onPlayPause(true)}><img className="btnimg largebtn" src={play} alt="error"/></button>}
    </div>
    </div>
    );
};
export default AudioButtons;