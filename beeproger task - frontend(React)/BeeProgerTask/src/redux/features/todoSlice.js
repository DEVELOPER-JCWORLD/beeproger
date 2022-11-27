import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../Api/Client";

export const postTodo = createAsyncThunk(
  "posts/createTodo",
  async ({ values }, { rejectWithValue }) => {
    try {
      const response = await api.postTodo(values);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "posts/updateTodo",
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTodo(id);
      navigate("/");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleTodo = createAsyncThunk(
  "posts/getTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getSingleTodo(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
// export const fetchTodo = createAsyncThunk(
//   "posts/fetchTodo",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(POSTS_URL);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const deleteTodo = createAsyncThunk(
//   "posts/deleteTodo",
//   async ({ id, navigate }, { rejectWithValue }) => {
//     try {
//       const response = await api.removeTodo(id);
//       navigate("/");
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    data: null,
    posts: [],
    post: {},
    error: "",
    loading: false,
  },

  extraReducers: {
    [postTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [postTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = [action.payload];
      console.log(action.payload);
    },
    [postTodo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // [fetchTodo.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [fetchTodo.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.posts = action.payload;
    // },
    // [fetchTodo.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    [getSingleTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [getSingleTodo.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    [getSingleTodo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // [deleteTodo.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [deleteTodo.fulfilled]: (state, action) => {
    //   // state.loading = false;
    //   // const taskId = action.payload;
    //   const { id } = action.payload;
    //   const del = state.post.filter((post) => post.id !== id);
    //   state.post = del;

    //   // state.posts = state.posts.filter((item) => item.id !== taskId);
    // },
    // [deleteTodo.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    [updateTodo.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTodo.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action", action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.posts = state.posts.map((item) =>
          item?.data?.id === id ? action.payload : item
        );
      }
    },
    [updateTodo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default todoSlice.reducer;
