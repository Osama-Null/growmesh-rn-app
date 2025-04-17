import instance from ".";

const profile = async (
  email,
  fistrname,
  lastname,
  dateOfbirth,
  ProfilePicture
) => {
  const response = await instance.post("/User/editprofile", {  });
  return response.data;
};
