import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import List from "./Components/List";
import ListGeneric from "./Components/ListGeneric";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Upload from "./Components/Upload";
import AccountsTable from "./Components/AccountsTable";
import LegalNotes from "./Components/LegalNotes";
import "./styles/tailwind.css";
import DarkMode from "./Components/DarkMode";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="dark:bg-gray-800 dark:text-white">
      <section className="mx-12">
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Upload setHasError={setHasError} />
                  <ListGeneric hasError={hasError} />
                </>
              }
            />
            <Route path="/accounts" element={<AccountsTable />} />
            <Route path="/legal" element={<LegalNotes />} />
          </Routes>
          <Footer />
          <Analytics />
        </Router>
      </section>
    </div>
  );
}

export default App;
