import React from "react";
import MailingField from "./MailingField";

const App: React.FC = () => {
  const handleAddEmail = (email: string) => {
    console.log(`Adding email: ${email}`);
  };

  return (
    <div className="container">
      <br />
      <MailingField onAdd={handleAddEmail} />
    </div>
  );
};

export default App;
