const Login = () => {
  return (
    <div className="structure blur-2">
      <header className="structure__header">
        <h1 className="structure__header__logo">slist.</h1>
      </header>
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
              <input id="email" type="email" />
            </div>
            <div className="login__form__group">
              <label className="login__form__label" htmlFor="password">
                Password
              </label>
              <input id="password" type="password" />
            </div>
            <button className="button" type="submit">
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
