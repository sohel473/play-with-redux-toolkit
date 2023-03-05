const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");

// initial state
const initialState = {
  videos: [],
  error: "",
};

// create async thunk with axios
const fetchVideos = createAsyncThunk("video/fetchVideos", async () => {
  const response1 = await axios.get("http://localhost:9000/videos");

  const video = response1.data;
  const tags = video.tags.map((tag) => tag);
  const tagParams = tags.map((tag) => `tags_like=${tag}`).join("&");
  // console.log(tagParams);

  const response2 = await axios.get(
    `http://localhost:9000/videos?${tagParams}`
  );

  const videos = response2.data;

  // sort videos in descending order by view count
  videos.sort((a, b) => {
    const aViews = Number(a.views.replace(/[^\d.-]/g, ""));
    const bViews = Number(b.views.replace(/[^\d.-]/g, ""));
    return bViews - aViews;
  });

  // videos.forEach((video) => {
  //   console.log(video.views);
  // });

  // console.log(`http://localhost:9000/videos?${tagParams}`);
  // console.log(tags);

  return videos;
});

const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.pending, (state, action) => {
      state.error = "";
    });

    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.videos = action.payload;
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;
