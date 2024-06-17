import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminRouter from "./routes/admin-route";
import ClientRouter from "./routes/client-route";
// import AdminRouter from "./components/Admin/adminRoutes";
// import ClientRouter from "./components/Client/clientRoutes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/*" element={<ClientRouter />} />
      </Routes>
    </Router>
  );
};

export default App;
