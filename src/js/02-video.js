
import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function saveCurrentTimeToLocalStorage(time) {
  localStorage.setItem('videoplayer-current-time', time);
};

function restorePlaybackFromLocalStorage() {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime !== null) {
    player.setCurrentTime(parseFloat(currentTime));
  }
}

const onPlay = throttle((event) => {
  saveCurrentTimeToLocalStorage(event.seconds);
}, 1000);

player.on('timeupdate', onPlay);

player.ready().then(() => {
  restorePlaybackFromLocalStorage();
});