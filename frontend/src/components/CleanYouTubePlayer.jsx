import React from 'react';

const CleanYouTubePlayer = ({ url, title }) => {
  const getEmbedUrl = (url) => {
    let videoId = '';
    let listId = '';
    
    // Handle Playlists
    if (url.includes('list=')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      listId = urlParams.get('list');
      if (listId) {
        return `https://www.youtube.com/embed?listType=playlist&list=${listId}&modestbranding=1`;
      }
    }

    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1];
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/embed/')) {
      return url;
    }

    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`;
  };

  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
        Invalid YouTube URL
      </div>
    );
  }

  return (
    <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={embedUrl}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CleanYouTubePlayer;
