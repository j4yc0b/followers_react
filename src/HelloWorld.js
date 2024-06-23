import React, { useState, useEffect } from 'react';
import axios from 'axios';


function NavigationBar() {
    // TODO: Actually implement a navigation bar
    return <h1>React test</h1>;
  }
  
function HelloWorld() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api_get_message/hello-world/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>{message}</p>
      root.render(<NavigationBar />);
    </div>
  );
}


export default HelloWorld;