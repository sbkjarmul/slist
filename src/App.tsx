import Background from "./components/Background";
import useLogin from "./hooks/useLogin";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

function App() {
  const { isLogged, logout } = useLogin();

  return (
    <div className="app">
      <div className="structure blur-2">
        <header className="structure__header">
          <h1 className="structure__header__logo">slist.</h1>
          {isLogged && (
            <button className="button" onClick={logout}>
              Logout
            </button>
          )}
        </header>
        {!isLogged && <Login />}
        {isLogged && <Tasks />}
        <footer className="structure__footer"></footer>
      </div>
      <Background />
    </div>
  );
}

export default App;
