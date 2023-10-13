import { FormEvent, useState } from "react";
import { ValidationError } from "yup";
import { AuthenticationParams } from "@/models/auth.model";
import content from "@/presentation/assets/content.json";
import Input, { InputTypeEnum } from "@/presentation/components/inputs/Input";
import Button from "@/presentation/components/button/Button";
import { getValueFromEvent } from "@/presentation//utils/shared.utils";
import { authSchema } from "@/presentation//validations/auth.validation";
import "./Login.scss";

interface LoginProps {
  login: ({ email, password }: AuthenticationParams) => Promise<void>;
}

const Login = ({ login }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handlePasswordChange = (event: FormEvent) => {
    setPassword(getValueFromEvent(event));
  };

  const handleEmailChange = (event: FormEvent) => {
    setEmail(getValueFromEvent(event));
  };

  const handleLogin = async () => {
    await login({ email, password });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    authSchema
      .validate({ email, password })
      .then(async () => {
        await handleLogin();
        setError("");
      })
      .catch((error: ValidationError) => {
        setError(error.message);
      });
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
        <form className="login__form" onSubmit={handleSubmit}>
          <h2>{content.login.logIn}</h2>
          <div className="login__form__group">
            <label className="login__form__label" htmlFor="email">
              {content.login.email}
            </label>
            <Input
              type={InputTypeEnum.TEXT}
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
            <Button>{content.login.loginButton}</Button>
          </div>
          <p className="login__form__error">{error}</p>
        </form>
      </section>
    </main>
  );
};

export default Login;
