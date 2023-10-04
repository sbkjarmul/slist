import useLogin from "./hooks/useLogin";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

function App() {
  const { isLogged } = useLogin();
  return (
    <div className="app">
      {/* <div className="structure blur-2">
        <header className="structure__header">
          <h1 className="structure__header__logo">slist.</h1>
        </header>
        <footer className="structure__footer"></footer>
      </div> */}
      {!isLogged && <Login />}
      {isLogged && <Tasks />}
      <figure className="shape-1"></figure>
      <figure className="shape-2"></figure>
      <figure className="shape-3"></figure>
      <figure className="shape-4"></figure>
    </div>
  );
}

export default App;
