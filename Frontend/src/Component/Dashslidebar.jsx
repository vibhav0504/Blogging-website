import { Sidebar } from "flowbite-react";
import React from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useState , useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/User/userSlice";
import { useDispatch } from "react-redux";

const Dashslidebar = () => {
  const location = useLocation();
  const dispatch=useDispatch();
  const [tab, setTab] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabfromurl = urlParams.get("tab");
    if (tabfromurl) {
      setTab(tabfromurl);
    }
  }, [location.search]);
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Link to="/dashboard?tab=profile">
          <Sidebar.Item active={tab==="profile"} icon={HiUser} label={"User"} labelColor="dark" as="div">
            Profile
          </Sidebar.Item>
          </Link>
          <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
            Sign-Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default Dashslidebar;
