/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreenBtn = player.querySelector(".fullscreen");

/* Toggle the videoplayer*/
function togglePlay() {
	video.paused ? video.play() : video.pause();
}
// with space key
document.addEventListener("keyup", (event) => {
	if (event.keyCode === 32) togglePlay();
});

// Update the button
function updateButton() {
	const icon = this.paused;
	toggle.textContent = icon ? "►" : "❙ ❙";
}

// Change volume
function updateRange() {
	video[this.name] = this.value;
}

// Skip btns
function handleSkipButtons() {
	video.currentTime += parseInt(this.dataset.skip);
}

// handle progress
function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

function fullscreenHandle() {
	if (!document.fullscreenElement) {
		player.requestFullscreen();
		fullscreenBtn.textContent = "[ x ]";
	} else {
		document.exitFullscreen();
		fullscreenBtn.textContent = "[   ]";
	}
}

// Hook up the events
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
ranges.forEach((range) => range.addEventListener("input", updateRange));
skipButtons.forEach((btn) => btn.addEventListener("click", handleSkipButtons));
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
fullscreenBtn.addEventListener("click", fullscreenHandle);
