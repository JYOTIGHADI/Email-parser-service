
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmailList from "../src/Pages/EmailList ";
import EmailDetails from "../src/Pages/EmailDetails";
import CreateEmail from "../src/Pages/CreateEmail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmailList />} />

        <Route path="/create" element={<CreateEmail />} />

        <Route path="/emails/:id" element={<EmailDetails />} />

        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;