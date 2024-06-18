import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://testapi.demoserver.biz/api/users/login", {
        email: values.email,
        password: values.password,
      });
      const token = response.data.data;
      localStorage.setItem("token", token);
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return token;
    } catch (error) {
      toast.error('Login failed. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  name: "",
  role: "",
  token: localStorage.getItem("token") || "",
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getUser(state, action) {
      state.role = action.payload;
      console.log(state.role, "state.rolestate.rolestate.rolestate.role");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});

export const { getUser } = loginSlice.actions;
export default loginSlice.reducer;
