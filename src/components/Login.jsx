import React from "react";
import { auth, provider } from "./Firebase.jsx";
import { useStateValue } from "./StateProvider.jsx";
import { actionTypes } from "./reducer.jsx";
// import { Button } from "@material-ui/core";
function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
          alt="Whatsapp"
        />
        <div className="login_text">
          <h1>Sign In To Whatsapp</h1>
        </div>
        <button onClick={signIn} className="login_button">
          <span> Sign In With Google</span>
        </button>
      </div>
    </div>
  );
}
export default Login;
