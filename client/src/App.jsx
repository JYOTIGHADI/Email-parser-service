import { useState } from "react";
import EmailList from "../src/Pages/emailList";
import EmailDetails from "../src/Pages/emailDetails.";
import CreateEmail from "../src/Pages/CreateEmail";
import "./App.css";

function App() {
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const reloadEmails = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="layout">
      <div className="left-panel">
        <CreateEmail onEmailCreated={reloadEmails} />
        <EmailList
          onSelect={setSelectedEmailId}
          refresh={refresh}
        />
      </div>

      <EmailDetails emailId={selectedEmailId} />
    </div>
  );
}

export default App;