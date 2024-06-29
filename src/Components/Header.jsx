import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";

function Header() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");

  return (
    <div className="shadow-lg dark:bg-gray-800 dark:text-white">
      <header className="">
        <div className="flex items-center justify-between">
          <a onClick={handleClick} className="">
            <h1 className="mt-3 header hover:text-blue-700 hover:underline hover:cursor-pointer">
              See who's not following you back
            </h1>
          </a>
          <div className="mt-3 font-bold">
            <p>Dark mode</p>
            <DarkMode />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
