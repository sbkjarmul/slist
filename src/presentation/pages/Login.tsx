import { ChangeEvent, useState } from "react";
import useLogin from "@/presentation/hooks/useLogin";
import content from "@/presentation/assets/content.json";

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
    <main className="structure__main">
      <section className="right">
        <h1 className="right__title">{content.login.welcomeText}</h1>
        <div className="right__image">
          <img
            src="src/presentation/assets/images/todo-render.png"
            alt={content.login.welcomeImage}
          />
        </div>
      </section>
      <section className="login">
        <form className="login__form">
          <h2 className="h1">{content.login.logIn}</h2>
          <div className="login__form__group">
            <label htmlFor="email">{content.login.email}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="login__form__group">
            <label className="login__form__label" htmlFor="password">
              {content.login.password}
            </label>
            <input
              id="password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
          </div>
          <button className="button" onClick={handleLogin}>
            {content.login.loginButton}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
