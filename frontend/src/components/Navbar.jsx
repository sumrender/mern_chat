import useLogout from "../hooks/useLogout";
import useRootContext from "../hooks/useRootContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useRootContext();

  return (
    <>
      <nav>
        <a className="heading" href="/">
          chatsapp
        </a>
        <div className="links">
          <a href="/register">register</a>
          <a href="/login">login</a>
          {user && <a href="/chats">chats</a>}
          {user && (
            <div>
              <img className="dp" src={user.pic} alt="dp" />
            </div>
          )}
          {user && (
            <button className="logout" onClick={logout}>
              logout
            </button>
          )}
        </div>
      </nav>
      <div className="line"></div>
    </>
  );
}
