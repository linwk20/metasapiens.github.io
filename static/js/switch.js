let currentGroup = 0;  // Track the current group of videos
const videosPerGroup = 6;

const videoScenes = [
  {
    sources: ['./static/videos/bicycle_miniD.mp4', './static/videos/bicycle_L1.mp4', './static/videos/bicycle_FR.mp4',
              './static/videos/bicycle_L2.mp4', './static/videos/bicycle_L3.mp4', './static/videos/bicycle_L4.mp4'],
    fps: [12, 60, 85, 0, 0, 0]
  },
  {
    sources: ['./static/videos/room_miniD.mp4', './static/videos/room_L1.mp4', './static/videos/room_FR.mp4',
              './static/videos/room_L2.mp4', './static/videos/room_L3.mp4', './static/videos/room_L4.mp4'],
    fps: [13, 72, 86, 0, 0, 0]
  },
  {
    sources: ['./static/videos/drjohnson_miniD.mp4', './static/videos/drjohnson_L1.mp4', './static/videos/drjohnson_FR.mp4',
              './static/videos/drjohnson_L2.mp4', './static/videos/drjohnson_L3.mp4', './static/videos/drjohnson_L4.mp4'],
    fps: [21, 99, 133, 0, 0, 0]
  },
  {
    sources: ['./static/videos/truck_miniD.mp4', './static/videos/truck_L1.mp4', './static/videos/truck_FR.mp4',
              './static/videos/truck_L2.mp4', './static/videos/truck_L3.mp4', './static/videos/truck_L4.mp4'],
    fps: [13, 121, 135, 0, 0, 0]
  }
];

const labels = [
  'Mini-D',
  'Our-L1',
  'Our-FR',
  'Our-L2',
  'Our-L3',
  'Our-L4'
];

function switchGroup(direction) {
  // Ensure the group cycles between available scenes
  currentGroup = (currentGroup + direction + videoScenes.length) % videoScenes.length;

  const videoItems = document.querySelectorAll('.video-item video');
  const fpsLabels = document.querySelectorAll('.video-label');

  // Update all videos with new sources
  videoItems.forEach((video, index) => {
    const source = video.querySelector('source');
    source.src = videoScenes[currentGroup].sources[index];
    video.load();  // Reload the video with the new source
  });

  // Update only the first 3 labels
  for (let i = 0; i < 3; i++) {
    fpsLabels[i].textContent = `${labels[i]} (${videoScenes[currentGroup].fps[i]} FPS)`;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Get all video elements
  const videos = document.querySelectorAll('.video-item video');
  
  // Function to start all videos at the same time when Play All is clicked
  function playAllVideos() {
    videos.forEach(video => {
      video.currentTime = 0;  // Reset videos to start from the beginning
      video.play();           // Play each video
    });
  }

  // Expose the playAllVideos function globally for button click
  window.playAllVideos = playAllVideos;
});
