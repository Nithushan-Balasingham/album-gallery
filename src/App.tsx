import { Route, Routes } from "react-router";
import TableView from "./Components/TableView";
import PhotoViewer from "./Components/PhotoViewer";
import MyCollection from "./Components/MyCollection";
import OwnCollection from "./Components/OwnCollection";


function App() {

  return (
    <div className="p-1 w-full min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<TableView />} />
        <Route path="/mycollection" element={<MyCollection />} />
        <Route path="/collection/:id" element={<OwnCollection />} />
        <Route path="/:id" element={<PhotoViewer />} />
      </Routes>
    </div>
  );
}

export default App;
