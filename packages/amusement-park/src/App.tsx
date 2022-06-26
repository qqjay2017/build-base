import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { EmptyDemo } from "./demo/Empty";
import CsmFileUploadDemo from "./demo/FileUpload";

function App() {
  return (
    <div className="App">
      <EmptyDemo />
      <CsmFileUploadDemo />
    </div>
  );
}

export default App;
