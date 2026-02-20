import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inbox from "../src/Pages/Inbox";
import EmailPage from "../src/pages/EmailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inbox />} />


        <Route path="/emails/:id" element={<EmailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;