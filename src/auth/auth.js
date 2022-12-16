export const authenticate = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const isAuthenticated = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};
