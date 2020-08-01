// import axios from "axios";
// import { UPDATE_SUCCESS } from "./type";

// // Update profile
// export const updateProfile = ({
//   name,
//   username,
//   email,
//   profileImg,
//   bio,
//   gender,
// }) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({
//     name,
//     username,
//     email,
//     profileImg,
//     bio,
//     gender,
//   });

//   try {
//     const res = await axios.put("/api/profile", body, config);

//     dispatch({
//       type: UPDATE_SUCCESS,
//     });
//   } catch (err) {
//     dispatch({
//       type: UPDATE_FAIL,
//       payload: err.response.data.errors[0].msg,
//     });
//   }
// };
