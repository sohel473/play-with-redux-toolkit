const configureStore = require("@reduxjs/toolkit").configureStore;
const videoSlice = require("../features/video/videoSlice");
const logger = require("redux-logger").default;

const store = configureStore({
  reducer: {
    video: videoSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

module.exports = store;
