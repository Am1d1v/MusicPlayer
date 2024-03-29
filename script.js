

const musicContainer = document.querySelector('#music-container');

// Music Player Buttons
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

const audio = document.querySelector('#audio');
const progress = document.querySelector('#progress');
const progressContainer = document.querySelector('#progress-container');

// Title and Image of the song
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Array of Songs Titles
const songs = ['summer', 'ukulele'];

// Track of song
let songIndex = 1;

// Initially load song
loadSong(songs[songIndex]);

// Update song details
function loadSong(song){
    title.innerText = song;
    audio.src = `audio/${song}.mp3`;
    cover.src = `images/${song}.jpg`
}

// Play Song
function playSong(){
    musicContainer.classList.add('play');

    // Change Play Button to Stop Button
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// Pause Song
function pauseSong(){
    musicContainer.classList.remove('play');

    // Change Play Button to Stop Button
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

// Update Progress
function updateProgress(e){
    // Song's Duration and Current Time of the Song
    const {duration, currentTime} = e.srcElement
    const progressPercent = ((currentTime / duration) * 100).toFixed(1);

    // Song's Progress
    progress.style.width = `${progressPercent}%`;
}

// Set Progress Bar
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    // Set Song's current time
    audio.currentTime = (clickX / width) * duration;

}


// Event Listeners

// Play Button
playBtn.addEventListener('click', () => {

    // Check playing song status
    const isPlaying = musicContainer.classList.contains('play');

    // Plat/Stop Buttons Toggle
    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
});

// Change Song

// Previous Song
prevBtn.addEventListener('click', () => {
    songIndex--;
    if(songIndex < 0){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
});

// Next Song
nextBtn.addEventListener('click', () => {
    songIndex++;
    if(songIndex > 1){
        songIndex = 1;
    }
    console.log(songIndex)

    loadSong(songs[songIndex]);
    playSong();
});

// Time Song Update
audio.addEventListener('timeupdate', updateProgress)

// Click on progress bar
progressContainer.addEventListener('click', setProgress)

