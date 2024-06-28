import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";

function Header() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  return (
    <header className="shadow-lg mt-3 dark:bg-gray-800 dark:text-white">
      <div className="flex items-center justify-between">
        <a onClick={handleClick} className="">
          <h1 className="header hover:text-blue-700 hover:underline hover:cursor-pointer">
            See who's not following you back
          </h1>
        </a>
        <div className="font-bold">
          <p>Dark mode</p>
          <DarkMode />
        </div>
      </div>
    </header>
  );
}

export default Header;
