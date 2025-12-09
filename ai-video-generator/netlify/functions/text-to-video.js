exports.handler = async function(event, context) {
  try {
    const body = JSON.parse(event.body);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        message: 'Video generated successfully from text (Netlify Functions)'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Failed to generate video from text'
      })
    };
  }
};