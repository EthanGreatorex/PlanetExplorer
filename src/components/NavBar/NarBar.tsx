import "./NavBar.scss";
import { useNavigate } from "react-router-dom";

function NavBar() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

  return (
    <nav className="navbar">
      <button className="navbar__button" onClick={handleClick}>
        Home
      </button>
    </nav>
  );
}

export default NavBar;
