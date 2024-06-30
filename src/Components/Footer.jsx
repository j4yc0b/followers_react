import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/legal");

  return (
    <div className="flex items-end justify-end shadow-lg dark:bg-gray-800 dark:text-white">
      <a onClick={handleClick} className="link">
        <p className="font-bold">Legal notes</p>
      </a>
    </div>
  );
}

export default Footer;
