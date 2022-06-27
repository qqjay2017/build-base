import "./App.css";
import DevDrawerDemo from "./demo/DevDrawerDemo";
import { EmptyDemo } from "./demo/Empty";
import CsmFileUploadDemo from "./demo/FileUpload";

function App() {
  return (
    <div className="App">
      <EmptyDemo />
      <DevDrawerDemo />
      <div>
        <CsmFileUploadDemo />
      </div>
    </div>
  );
}

export default App;
