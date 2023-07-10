export const isLoggedIn = () => {
  let data = localStorage.getItem("token");
  if (data != null) {
    return true;
  } else {
    return false;
  }
};

export const doLogin = (data, next) => {
  localStorage.setItem("user", JSON.stringify(data));
  next();
};

export const getToken = () => {
  if (isLoggedIn()) {
    return localStorage.getItem("token");
  } else {
    return null;
  }
};

export const doLogout = (next) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
  next();
};

export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return undefined;
  }
};
