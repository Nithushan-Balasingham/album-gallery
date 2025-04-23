import { Route, Routes } from "react-router";
import TableView from "./Components/TableView";
import PhotoViewer from "./Components/PhotoViewer";


function App() {

  return (
    <div className="p-1 w-full min-h-screen bg-blue-200">
      <Routes>
        <Route path="/" element={<TableView />} />
        <Route path="/:id" element={<PhotoViewer />} />
      </Routes>
    </div>
  );
}

export default App;
