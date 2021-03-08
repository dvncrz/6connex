let audio = document.getElementById('audio');
let isPaused = audio.paused;
let isPlaying = !isPaused;

var songId = 0;

var playlist = [];

playlist.push(["https://cdn-akamai.6connex.com//465/2156//Lobby_Playlist_BMS_Prospanica_16141150836837815.mp3","Simples corazones","Fonseca"]);

playlist.push(["https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3","Helix Sound","Unknown Artist"]);

function playpause() {       
    var element = document.getElementById("playpause_btn")

    if (element.matches(".fa-play")) {
      element.classList.remove("fa-play");
      element.classList.add("fa-pause");
      audio.play();
      document.getElementById("equalizer").style.visibility = "visible";
    } else if (element.matches(".fa-pause")) {
      element.classList.remove("fa-pause");
      element.classList.add("fa-play");
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

window.onload = autoplay(songId);

function autoplay(song) {
    loadsong(song);

    var element = document.getElementById("playpause_btn")

    audio.play();
    element.classList.remove("fa-play");
    element.classList.add("fa-pause");
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
