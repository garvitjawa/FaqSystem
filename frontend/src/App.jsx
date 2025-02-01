import { Route, Routes } from "react-router-dom";

import CreateFaq from "./components/CreateFaq.jsx";
import UpdateFaq from "./components/UpdateFaq.jsx";
import Navbar from "./components/Navbar.jsx";
import Admin from "./components/Admin.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<CreateFaq />} />
        <Route path="/admin/update/:id" element={<UpdateFaq />} />
      </Routes>
    </>
  );
}

export default App;
