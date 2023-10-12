import { ChangeEvent, useState } from "react";
import useLogin from "@/presentation/hooks/useLogin";
import content from "@/presentation/assets/content.json";
import "./Login.scss";
import Input, { InputTypeEnum } from "../components/inputs/Input";
import Button from "../components/button/Button";

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
    <main className="login__wrapper">
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
            <Input
              id="email"
              type={InputTypeEnum.EMAIL}
              value={email}
              onChange={handleEmailChange}
              data-testid="email-input"
            />
          </div>
          <div className="login__form__group">
            <label className="login__form__label" htmlFor="password">
              {content.login.password}
            </label>
            <Input
              id="password"
              value={password}
              onChange={handlePasswordChange}
              type={InputTypeEnum.PASSWORD}
              data-testid="password-input"
            />
          </div>
          <Button onClick={handleLogin}>{content.login.loginButton}</Button>
        </form>
      </section>
    </main>
  );
};

export default Login;
