const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");

// initial state
const initialState = {
  tags: [],
  videosWithTag: [],
  error: "",
};

// create async thunk with axios
const fetchVideoTags = createAsyncThunk("video/fetchVideos", async () => {
  try {
    const response1 = await axios.get("http://localhost:9000/videos");

    const video = response1.data;
    const tags = video.tags.map((tag) => tag);

    return tags;
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    throw error;
  }
});

const fetchVideoswithTags = createAsyncThunk(
  "video/fetchVideoswithTags",
  async (tags) => {
    try {
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
    } catch (error) {
      console.error("Error fetching videos:", error.message);
      throw error;
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideoTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
    builder.addCase(fetchVideoTags.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(fetchVideoswithTags.fulfilled, (state, action) => {
      state.videosWithTag = action.payload;
    });
    builder.addCase(fetchVideoswithTags.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideoTags = fetchVideoTags;
module.exports.fetchVideoswithTags = fetchVideoswithTags;
