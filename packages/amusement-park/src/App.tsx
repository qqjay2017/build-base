import "./App.css";
import { EmptyDemo } from "./demo/Empty";
import CsmFileUploadDemo from "./demo/FileUpload";

function App() {
  return (
    <div className="App">
      <EmptyDemo />
      <div>
        <CsmFileUploadDemo />
      </div>
    </div>
  );
}

export default App;
