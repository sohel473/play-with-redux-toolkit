const store = require("./rtk/app/store");
const { fetchVideos } = require("./rtk/features/video/videoSlice");

store.subscribe(() => {
  // console.log(store.getState());
});

store.dispatch(fetchVideos());
