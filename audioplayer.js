/*SCRIPT WRITTEN BY DUVAN CRUZ FOR 6CONNEX*/
let audio = document.getElementById('audio');
let isPaused = audio.paused;
let isPlaying = !isPaused;

var songId = 0;

var playlist = [];

playlist.push(["https://www.mboxdrive.com/Rising%20World%20by%20Chill%20Study.mp3","Rising World","Chill Study"]);
playlist.push(["https://www.mboxdrive.com/Beach%20by%20JAM%20Studio.mp3","Beach","JAM Studio"]);

function playpause() {       
    var element = document.getElementById("playpause_btn")

    if (element.matches(".fa-play-circle")) {
      element.classList.remove("fa-play-circle");
      element.classList.add("fa-pause-circle");
      audio.play();
      document.getElementById("equalizer").style.visibility = "visible";
    } else if (element.matches(".fa-pause-circle")) {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
      audio.pause();
      document.getElementById("equalizer").style.visibility = "hidden";
    } 
}

function forward() {
    songId += 1;
    if (songId >= playlist.length) {
        songId = 0;
    }

    autoplay(songId);
}

function backward() {
    songId -= 1;
    if (songId < 0) {
        songId = playlist.length - 1;
    }

    autoplay(songId);
}

audio.addEventListener('ended', (event) => {
  forward();
});

var previousvol = 1

function mute() {
	var elementvol = document.getElementById("mute_btn")
    
	if (audio.volume > 0) {
    	previousvol = audio.volume;    	
        audio.volume = 0;
        elementvol.classList.remove("fa-volume-up");
    	elementvol.classList.add("fa-volume-off");
    } else if (audio.volume == 0) {
    	audio.volume = previousvol;
        elementvol.classList.remove("fa-volume-off");
    	elementvol.classList.add("fa-volume-up");
    }
    document.getElementById("volume").innerText = Math.floor(audio.volume * 100);
}

function volumeup() {
	var elementvol = document.getElementById("mute_btn");
    
    previousvol += 0.05;
    
    if (previousvol > 1) {
    	previousvol = 1;
    }
    
	audio.volume = previousvol;
    document.getElementById("volume").innerText = Math.round(previousvol * 100);
    if ((Math.floor(previousvol * 100)) > 0) {
    	elementvol.classList.remove("fa-volume-off");
    	elementvol.classList.add("fa-volume-up");
    } 
}

function volumedown() {
	var elementvol = document.getElementById("mute_btn");
    
    previousvol -= 0.05;
    
    if (previousvol < 0) {
    	previousvol = 0;
    }
    
	audio.volume = previousvol;
    document.getElementById("volume").innerText = Math.round(previousvol * 100);
    if ((Math.floor(audio.volume * 100)) == 0) {
    	elementvol.classList.remove("fa-volume-up");
    	elementvol.classList.add("fa-volume-off");
    }    	
}


window.onload = autoplay(songId);

function autoplay(song) {
    loadsong(song);
    document.getElementById("volume").innerText = Math.round(audio.volume * 100);

    var element = document.getElementById("playpause_btn")

    audio.play();
    element.classList.remove("fa-play-circle");
    element.classList.add("fa-pause-circle");
    document.getElementById("equalizer").style.visibility = "visible";
}

function loadsong(songId) {
    document.getElementById("audio").src = playlist[songId][0];
    document.getElementById("songName").innerText = playlist[songId][1] + " - " + playlist[songId][2];
}

const interval = setInterval(function() {
    if (isNaN(audio.duration)) {
        document.getElementById("songduration").innerText = "00:00 / 00:00";
    } else {
        document.getElementById("songduration").innerText = ("0" + Math.floor(audio.currentTime/60)).slice(-2) + ":" + ("0" + Math.floor(((audio.currentTime/60) % 1)*60)).slice(-2) + " / " + ("0" + Math.floor(audio.duration/60)).slice(-2) + ":" + ("0" + Math.floor(((audio.duration/60) % 1)*60)).slice(-2);
    }
 }, 1000);
