import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

function Header() {

  const navigate = useNavigate();
  const handleClick = () => navigate('/');

    return(
        <header className="shadow-lg mt-3">
          <a onClick={handleClick} className="">
            <h1 className="header">See who's not following you back</h1>
          </a>
      </header>
    );
}

export default Header;