const store = require("./rtk/app/store");
const {
  fetchVideoTags,
  fetchVideoswithTags,
} = require("./rtk/features/video/videoSlice");

store.subscribe(() => {
  // console.log(store.getState());
});

store
  .dispatch(fetchVideoTags())
  .then(() => {
    const tags = store.getState().video.tags;
    // console.log("Tags:", tags);
    return store.dispatch(fetchVideoswithTags(tags));
  })
  .catch((error) => {
    console.error("Error fetching tags and videos:", error.message);
  });
