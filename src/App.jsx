import React, { useEffect, useState } from "react";
import "./App.css";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "./store/userActions";
import { login, logout } from "./store/authSlice";
import { useToast } from "@chakra-ui/react";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await dispatch(getUser());
        const user = userData?.payload?.data;
        if (user) {
          dispatch(login({ user }));
          toast({
            title: `Welcome, ${user.fullName}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        } else {
          dispatch(logout());
          toast({
            description: 'Kindly join the website',
            duration: 5000,
            isClosable: true,
          })
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch,toast]);

  return (
    <>
      <Header />
      <main>
      {loading
        ?<LoadingPage/>
        :<Outlet />
      }
      </main>
      <Footer />
    </>
  );
}

export default App;
