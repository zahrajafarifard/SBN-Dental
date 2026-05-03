export const loginRequest = (token, capcha) => {
  return {
    type: "LOGIN",
    token: token,
  };
};

export const login = (mobile, password) => {
  return async (dispatch) => {
    let data, res;

    try {
      res = await fetch(`${process.env.REACT_APP_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
          password,
        }),
      });

      if (res.status === 403) {
        // alert("ایمیل یا رمز عبور اشتباه است. لطفا دوباره تلاش کنید!");
        return dispatch(
          loginFailed("ایمیل یا رمز عبور اشتباه است. لطفا دوباره تلاش کنید!")
        );
      }
      if (res.status === 200) {
        data = await res.json();

        return dispatch(loginRequest(data?.token));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginFailed = (err) => {
  return {
    type: "LOGIN_FAILED",
    error: err,
  };
};
export const Logout = () => {
  return {
    type: "LOGOUT",
  };
};
