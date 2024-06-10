import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/pages/Home.jsx";
import Dashboard from "../admin/Admin_panel.jsx";
import AdminLogin from "../admin/Admin_Login.jsx";
import ProtectedRoutes from "./component/ProtectedRoutes.jsx";
import Announcement from "../admin/Admincomponent/Announcement.jsx";
import ManagePost from "../admin/Admincomponent/ManagePost.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            index 
            element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>}>
          </Route>
          <Route path="/login" element={<AdminLogin />}></Route>
          <Route
            path="/managepost"
            element={
              <ProtectedRoutes>
                <ManagePost />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/announcement"
            element={
              <ProtectedRoutes>
                <Announcement />
              </ProtectedRoutes>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
