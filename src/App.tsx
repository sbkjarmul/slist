import Background from "./presentation/components/background/Background";
import useLogin from "./presentation/hooks/useLogin";
import Login from "./presentation/pages/Login";
import Tasks from "./presentation/pages/Tasks";
import content from "./presentation/assets/content.json";
import Button from "./presentation/components/button/Button";
import "./App.scss";

function App() {
  const { isLogged, logout } = useLogin();

  return (
    <div className="app">
      <div className="structure structure--blur">
        <header className="structure__header">
          <h1 className="structure__header__logo">{content.logo}</h1>
          {isLogged && <Button onClick={logout}>{content.login.logout}</Button>}
        </header>
        {!isLogged && <Login />}
        {isLogged && <Tasks />}
      </div>
      <Background />
    </div>
  );
}

export default App;
