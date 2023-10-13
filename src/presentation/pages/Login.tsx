import { FormEvent, useState } from "react";
import useLogin from "@/presentation/hooks/useLogin";
import content from "@/presentation/assets/content.json";
import "./Login.scss";
import Input, { InputTypeEnum } from "../components/inputs/Input";
import Button from "../components/button/Button";
import { getValueFromEvent } from "../utils/shared.utils";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useLogin();

  const handlePasswordChange = (event: FormEvent) => {
    setPassword(getValueFromEvent(event));
  };

  const handleEmailChange = (event: FormEvent) => {
    setEmail(getValueFromEvent(event));
  };

  const handleLogin = () => {
    login({ email, password });
  };

  return (
    <main className="login__wrapper">
      <section className="hero">
        <h1 className="hero__title">{content.login.welcomeText}</h1>
        <div className="hero__image">
          <img
            src="src/presentation/assets/images/todo-render.png"
            alt={content.login.welcomeImage}
          />
        </div>
      </section>
      <section className="login">
        <form className="login__form">
          <h2>{content.login.logIn}</h2>
          <div className="login__form__group">
            <label className="login__form__label" htmlFor="email">
              {content.login.email}
            </label>
            <Input
              type={InputTypeEnum.EMAIL}
              value={email}
              onChange={handleEmailChange}
              placeholder={content.login.emailPlaceholder}
            />
          </div>
          <div className="login__form__group">
            <label className="login__form__label" htmlFor="password">
              {content.login.password}
            </label>
            <Input
              value={password}
              onChange={handlePasswordChange}
              type={InputTypeEnum.PASSWORD}
              placeholder={content.login.passwordPlaceholder}
            />
          </div>
          <div className="login__form__group">
            <Button onClick={handleLogin}>{content.login.loginButton}</Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
