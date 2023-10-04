import { ChangeEvent, useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useLogin();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleLogin = () => {
    login({ email, password });
  };

  return (
    <div className="structure blur-2">
      {/* <header className="structure__header">
        <h1 className="structure__header__logo">slist.</h1>
      </header> */}
      <main className="structure__main">
        <section className="right">
          <h1 className="right__title">Write Everything.</h1>
          <div className="right__image">
            <img src="src/assets/todo-render.png" alt="" />
          </div>
        </section>
        <section className="login">
          <form className="login__form">
            <h2 className="h1">Log In</h2>
            <div className="login__form__group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="login__form__group">
              <label className="login__form__label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
              />
            </div>
            <button className="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </section>
      </main>
      <footer className="structure__footer"></footer>
    </div>
  );
};

export default Login;
