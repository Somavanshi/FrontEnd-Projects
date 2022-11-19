console.log("Hello friends chai pilo");

let audioElement = new Audio("/songs/1.mp3");

let selectedSong = document.getElementById("selectedSong");

const mySongs = [{ name: "let me love you", path: "/songs/1.mp3", cover: "1.jpg" },
{ name: "there you are", path: "/songs/2.mp3", cover: "2.jpg" },
{ name: "instrumental music", path: "/songs/3.mp3", cover: "3.jpg" }
];

let myIndex = 1;
let songImages = Array.from(document.getElementsByClassName("song"));

songImages.forEach((item,index)=>{
    item.getElementsByTagName("img")[0].src = mySongs[index].cover;
    item.getElementsByClassName("songInfo")[0].getElementsByTagName("h2")[0].innerText = mySongs[index].name;
});

const removeAllPlayingSong = () =>{
    Array.from(document.getElementsByClassName("fa")).forEach((item,index)=>{
        item.classList.add("fa-play-circle");
        item.classList.remove("fa-pause-circle");
    });
}
mySongs.forEach((item,index)=>{
    document.getElementById(`${index+1}`).addEventListener("click",(e)=>{
        removeAllPlayingSong();
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");

        audioElement.src = `/songs/${index+1}.mp3`;
        audioElement.currentTime = 0;

        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        myIndex = index + 1;
        selectedSong.innerText = mySongs[myIndex - 1].name;
        audioElement.play();
        document.getElementById("gif").classList.remove("hideGif");
    });
});

const myProgressBar = document.getElementById("range");
const masterPlay = document.getElementById("masterPay");

masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        document.getElementById("gif").classList.remove("hideGif");
    } else {
        audioElement.pause();
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        document.getElementById("gif").classList.add("hideGif");
    }
});

audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime * 100) / audioElement.duration);
    myProgressBar.value = progress;

    if (audioElement.duration === audioElement.currentTime) {
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
    }
});

myProgressBar.addEventListener("change", () => {
    // console.log(myProgressBar.value);
    // console.log(audioElement.duration);
    // console.log((myProgressBar.value * audioElement.duration) /100);
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const forward = document.getElementsByClassName("fa-toggle-right")[0];

const backword = document.getElementsByClassName("fa-toggle-left")[0];

backword.addEventListener("click" , ()=>{
    if (myIndex > 1) {
        removeAllPlayingSong();
        document.getElementById(`${myIndex}`).classList.remove("fa-pause-circle");
        document.getElementById(`${myIndex}`).classList.add("fa-play-circle");

        document.getElementById(`${myIndex-1}`).classList.remove("fa-play-circle");
        document.getElementById(`${myIndex-1}`).classList.add("fa-pause-circle");

        audioElement.src = `/songs/${myIndex-1}.mp3`;
        audioElement.currentTime = 0;

        myIndex--;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        selectedSong.innerText = mySongs[myIndex - 1].name;
        audioElement.play();
        document.getElementById("gif").classList.remove("hideGif");

    }
});

forward.addEventListener("click" , ()=>{
    if (myIndex < 3) {
        removeAllPlayingSong();
        document.getElementById(`${myIndex}`).classList.remove("fa-pause-circle");
        document.getElementById(`${myIndex}`).classList.add("fa-play-circle");

        document.getElementById(`${myIndex+1}`).classList.remove("fa-play-circle");
        document.getElementById(`${myIndex+1}`).classList.add("fa-pause-circle");

        audioElement.src = `/songs/${myIndex+1}.mp3`;
        audioElement.currentTime = 0;

        myIndex++;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        selectedSong.innerText = mySongs[myIndex -1].name;
        audioElement.play();
        document.getElementById("gif").classList.remove("hideGif");
    }
});