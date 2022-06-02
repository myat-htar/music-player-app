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
    isFavourite: false,
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
  playPauseIcon = document.querySelector(".play-pause i"),
  favouriteIcon = document.querySelector(".fav-icon");

let favSongs = getFromLocalStorage().filter((song) => song.isFavourite == true);
let songsListArray;
let playingSongID;
let playingSongItem;
if (getFromLocalStorage().length > 0) {
  songs = getFromLocalStorage();
}
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

// displaying songs according to all or fav songs button
allSongsBtn.addEventListener("click", (e) => {
  favSongsBtn.classList.remove("active");
  e.currentTarget.classList.add("active");
  checkSongList(songs);
  showSongList(songs);
  addStyleToPlayingSong();
});
favSongsBtn.addEventListener("click", (e) => {
  allSongsBtn.classList.remove("active");
  e.currentTarget.classList.add("active");
  checkSongList(favSongs);
  showSongList(favSongs);
  addStyleToPlayingSong();
});

// play songs
songsList.addEventListener("click", (e) => {
  playingSongID = getSelectedListElement(e).dataset.id;
  songsList.setAttribute("data-song_id", playingSongID);
  playingSongItem = songs.find((song) => songsList.dataset.song_id == song.id);
  audio.src = playingSongItem.audio;
  updateSongList();
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

// update play/pause btn icon
updatePlayPauseBtn(playPauseIcon);
// play/pause song on play/pause btn click
playPauseBtn.addEventListener("click", togglePlayPause);

// FUNCTIONS
function getFromLocalStorage() {
  let songs = JSON.parse(localStorage.getItem("songs")) || [];
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
showSongList(songs);

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
// check song list is empty or not
function checkSongList(songs) {
  if (songs.length < 1) {
    document.querySelector(".btn-container + p ").style.display = "block";
  } else {
    document.querySelector(".btn-container + p ").style.display = "none";
  }
}
// deciding array according to all or fav
function updateSongList() {
  if (allSongsBtn.classList.contains("active")) {
    songsListArray = songs;
    showSongList(songs);
  } else {
    songsListArray = favSongs;
    showSongList(favSongs);
  }
}
// show song data box at bottom
function showSongData(e) {
  songDataBox.classList.add("show");
  let songData = [playingSongItem]
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

  // making play pause btn work
  const playPauseBtn = document.querySelector(".play-pause");
  const playPauseIcon = document.querySelector(".play-pause i");
  updatePlayPauseBtn(playPauseIcon);
  playPauseBtn.addEventListener("click", togglePlayPause);
}

function openSongDetails() {
  songDetails.classList.add("show");
  playingSongImg.src = playingSongItem.image;
  playingSongName.textContent = playingSongItem.songName;
  playingSongSinger.textContent = playingSongItem.singer;
  updateFavouriteIcon();
  favouriteIcon.addEventListener("click", updateFavouriteList);
}

//update play/pause icon according to music play
function updatePlayPauseBtn(icon) {
  audio.addEventListener("play", update);
  audio.addEventListener("pause", update);
  function update() {
    if (audio.paused) {
      icon.className = `fa-solid fa-play`;
    } else {
      icon.className = `fa-solid fa-pause`;
    }
  }
}
// make play/pause song on play/pause btn click
function togglePlayPause() {
  audio.paused ? audio.play() : audio.pause();
}
// update favourite songs
function updateFavouriteList() {
  songs = songs.map((song) => {
    if (song.id == playingSongItem.id) {
      song.isFavourite = !song.isFavourite;
    }
    return song;
  });

  localStorage.setItem("songs", JSON.stringify(songs));
  favSongs = getFromLocalStorage().filter((song) => song.isFavourite);
  updateSongList();
  checkSongList(favSongs);
  updateFavouriteIcon();
}
function updateFavouriteIcon() {
  if (playingSongItem.isFavourite) {
    favouriteIcon.className = "fa-solid fa-heart fav-icon";
    favouriteIcon.title = "Remove from Favourites";
  } else {
    favouriteIcon.className = "fa-regular fa-heart fav-icon";
    favouriteIcon.title = "Add to Favourites";
  }
}
