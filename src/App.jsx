import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import List from './Components/List';
import Header from './Components/Header';
import Upload from './Components/Upload';
import AccountsTable from './Components/AccountsTable';
import './styles/tailwind.css';

function App() {

  const [hasError, setHasError] = useState(false);

  return (
    <section className="mx-12">
      <Router>
        <Header/>
        <Routes>
          <Route
              path="/" element={
                <>
                  <Upload setHasError={setHasError}/>
                  <List hasError={hasError}/>
                </>
              }
            />
          <Route path="/accounts" element={<AccountsTable />} />
        </Routes>
      </Router>
    </section>
  );
}

export default App;