let songs = [
  {
    id: 1,
    songName: "Start over",
    singer: "Gaho",
    audio: "./song audios/Start over- Gaho.mp3",
    image: "./song images/Start over- Gaho.jpg",
    isFavourite: false,
  },
  {
    id: 2,
    songName: "Dive",
    singer: "Ed Sheeran",
    audio: "./song audios/Dive- Ed Sheeran.mp3",
    image: "./song images/Dive- Ed Sheeran.jpg",
    isFavourite: false,
  },
  {
    id: 3,
    songName: "I like you",
    singer: "Jo Jung Suk",
    audio: "./song audios/I like you- Jo Jung Suk.mp3",
    image: "./song images/I like you- Jo Jung Suk.jpeg",
    isFavourite: true,
  },
  {
    id: 4,
    songName: "Nandemonaiya",
    singer: "Radwimps",
    audio: "./song audios/Nandemonaiya - Radwimps.mp3",
    image: "./song images/Nandemonaiya - Radwimps.jpg",
    isFavourite: false,
  },
  {
    id: 5,
    songName: "Introduce Me a Good Person",
    singer: "Joy",
    audio: "./song audios/Introduce Me a Good Person- Joy.mp3",
    image: "./song images/Introduce Me a Good Person- Joy.jpg",
    isFavourite: false,
  },
  {
    id: 6,
    songName: "Butterfly",
    singer: "Jeon Mi Do",
    audio: "./song audios/Butterfly- Jeon Mi Do.mp3",
    image: "./song images/Butterfly- Jeon Mi Do.jpg",
    isFavourite: false,
  },
  {
    id: 7,
    songName: "Sparkle",
    singer: "Radwimps",
    audio: "./song audios/Sparkle- Radwimps.mp3",
    image: "./song images/Sparkle- Radwimps.jpg",
    isFavourite: false,
  },
  {
    id: 8,
    songName: "Me to you, you to me",
    singer: "Mido and Falasol",
    audio: "./song audios/Me to you, you to me- Mido and Falasol.mp3",
    image: "./song images/Me to you, you to me- Mido and Falasol.jpg",
    isFavourite: false,
  },
  {
    id: 9,
    songName: "Talking To The Moon",
    singer: "Bruno Mars",
    audio: "./song audios/Talking To The Moon- Bruno Mars.mp3",
    image: "./song images/Talking To The Moon- Bruno Mars.jpg",
    isFavourite: false,
  },
];
const wrapper = document.querySelector(".wrapper"),
  loading = document.getElementById("loading"),
  browseSongs = document.querySelector(".browse-songs-btn"),
  introPageWrapper = document.getElementById("intro-page-wrapper"),
  songsPageWrapper = document.getElementById("songs-page-wrapper"),
  songsList = document.querySelector(".songs-list"),
  allSongsBtn = document.getElementById("all-songs-btn"),
  favSongsBtn = document.getElementById("fav-songs-btn"),
  audio = document.querySelector("audio"),
  songDataBox = document.querySelector(".song-data-box"),
  songDetails = document.querySelector(".song-details"),
  playingSongImg = document.querySelector(".song-img"),
  playingSongName = document.querySelector(".song-name"),
  playingSongSinger = document.querySelector(".singer"),
  playingSongCurrentTime = document.querySelector(".currenttime"),
  playingSongDuration = document.querySelector(".duration"),
  playPauseBtn = document.querySelector(".play-pause"),
  playPauseIcon = document.querySelector(".play-pause i");

let favSongs;
let songsListArray;

// loading
window.addEventListener("load", () => {
  loading.classList.add("hide-loading");
  wrapper.style.opacity = "1";
});

// design shifting Pages
browseSongs.addEventListener("click", (e) => {
  introPageWrapper.classList.add("shift");
  songsPageWrapper.classList.add("shift");
});

// storing on local storage
localStorage.setItem("songs", JSON.stringify(songs));

// displaying songs according to all or fav songs button
allSongsBtn.addEventListener("click", (e) => {
  favSongsBtn.classList.remove("active");
  e.currentTarget.classList.add("active");
  document.querySelector(".btn-container + p ").style.display = "none";
  showSongList(songs);
  addStyleToPlayingSong();
});
favSongsBtn.addEventListener("click", (e) => {
  allSongsBtn.classList.remove("active");
  e.currentTarget.classList.add("active");
  favSongs = JSON.parse(getFromLocalStorage()).filter(
    (song) => song.isFavourite == true
  );
  if (favSongs.length < 1) {
    document.querySelector(".btn-container + p ").style.display = "block";
  }
  showSongList(favSongs);
  addStyleToPlayingSong();
});

// play songs
songsList.addEventListener("click", (e) => {
  let id = getSelectedListElement(e).dataset.id;
  songsList.setAttribute("data-song_id", id);
  setAudioSrc(e);
  chooseSongsArray();
  audio.play();
  addStyleToPlayingSong();
  showSongData(e);
});

// open song details box
songDataBox.addEventListener("click", (e) => {
  if (e.target.tagName !== "I" && !e.target.classList.contains("play-pause")) {
    openSongDetails();
  }
});
document.querySelector(".slide-down").addEventListener("click", () => {
  songDetails.classList.remove("show");
});

// FUNCTIONS
function getFromLocalStorage() {
  let songs = localStorage.getItem("songs");
  return songs;
}
function showSongList(songs) {
  songsList.innerHTML = songs
    .map(({ id, songName, singer, image }) => {
      return `<li data-id=${id}>
              <img src="${image}" alt="${songName}-${singer}"/>
              <div class="song-info">
                <h3>${songName}</h3>
                <p>${singer}</p>
              </div>
            </li>`;
    })
    .join("\n");
}
showSongList(JSON.parse(getFromLocalStorage()));

function getSelectedListElement(e) {
  let element;
  switch (e.target.tagName) {
    case "LI":
      element = e.target;
      break;
    case "H3":
    case "P":
      element = e.target.parentElement.parentElement;
      break;
    default:
      element = e.target.parentElement;
  }
  return element;
}
function setAudioSrc(e) {
  let song = songs.find(
    (song) => song.id == getSelectedListElement(e).dataset.id
  );
  audio.src = song.audio;
}
function addStyleToPlayingSong() {
  let playingSongID = songsList.dataset.song_id;
  if (playingSongID) {
    let lists = document.querySelectorAll(".songs-list li");
    lists.forEach((list) => {
      list.classList.remove("playing");
      if (list.dataset.id == playingSongID) {
        list.classList.add("playing");
      }
    });
  }
}
// deciding array according to all or fav
function chooseSongsArray() {
  if (allSongsBtn.classList.contains("active")) {
    songsListArray = songs;
  } else {
    songsListArray = favSongs;
  }
  console.log(songsListArray);
}
// show song data box at bottom
function showSongData(e) {
  songDataBox.classList.add("show");
  let songData = [songs.find((song) => song.id == songsList.dataset.song_id)]
    .map((song) => {
      return `<img
            src="${song.image}"
            alt="${song.songName}- ${song.singer}"
          />
          <div class="song-data-box__song-info">
            <h3>${song.songName}</h3>
            <p>${song.singer}</p>
          </div>
          <div class="play-pause">
            <i class="fa-solid fa-pause"></i>
          </div>
          <i class="fa-solid fa-forward-step" class="next"></i>`;
    })
    .join("\n");
  songDataBox.innerHTML = songData;
}

function openSongDetails() {
  songDetails.classList.add("show");
  let playingSongData = songs.find(
    (song) => songsList.dataset.song_id == song.id
  );
  playingSongImg.src = playingSongData.image;
  playingSongName.textContent = playingSongData.songName;
  playingSongSinger.textContent = playingSongData.singer;
}
