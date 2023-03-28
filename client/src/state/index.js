import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setRelics: (state, action) => {
        state.relics = action.payload.relics;
      },
      setRelic: (state, action) => {
        const updatedRelics = state.relics.map((relic) => {
          if (relic._id === action.payload.relic._id) return action.payload.relic;
          return relic;
        });
        state.relics = updatedRelics;
      },
      setJobs: (state, action) => {
        state.jobs = action.payload.jobs;
      },
      setJob: (state, action) => {
        const updatedJobs = state.jobs.map((job) => {
          if (job._id === action.payload.job._id) return action.payload.job;
          return job;
        });
        state.jobs = updatedJobs;
      },
      setEncounters: (state, action) => {
        state.encounters = action.payload.encounters;
      },
      setEncounter: (state, action) => {
        const updatedEncounters = state.encounters.map((encounter) => {
          if (encounter._id === action.payload.encounter._id) return action.payload.encounter;
          return encounter;
        });
        state.encounters = updatedEncounters;
      },
  },
});

export const { setMode, setLogin, setLogout,setPosts, setPost,setRelics,setRelic, setJobs, setJob, setEncounters, setEncounter } =
  authSlice.actions;
export default authSlice.reducer;