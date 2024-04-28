import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoaders } from "./components/layout/Loaders";
import Dashboard from "./pages/admin/Dashboard";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const Usermanagement = lazy(() => import("./pages/admin/UserManagement"));
const Chatmanagement = lazy(() => import("./pages/admin/ChatManagement"));
const Messagemanagement = lazy(() => import("./pages/admin/MessageManagement"));
import axios from "axios";
import { server } from "./components/constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket";

function App() {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/users/profile`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        dispatch(userExist(res.data.userFound));
      })
      .catch((err) => {
        dispatch(userNotExist());
      });
  }, [dispatch]);

  return loader ? (
    <>
      <LayoutLoaders />
    </>
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Group />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/user-management" element={<Usermanagement />} />
          <Route path="/admin/group-management" element={<Chatmanagement />} />
          <Route
            path="/admin/message-management"
            element={<Messagemanagement />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
