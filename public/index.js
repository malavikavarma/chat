const FBLogin = () => {
  FB.login(
    response => {
      axios
        .get(
          `http://localhost:3030/accesstoken?token=${
            response.authResponse.accessToken
          }`
        )
        .then(response => {
          console.log(response.data[0].token);
          Cookies.set('token', response.data[0].token, { expires: 3 });
          window.location.href = 'chat.html';
        });
    },
    { scope: 'email' }
  );
};

const FBLogout = () => {
  Cookies.remove('token');
};
