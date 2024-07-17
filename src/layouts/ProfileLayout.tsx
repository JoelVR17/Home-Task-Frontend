import Tabs from "@/components/profle/Tabs";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
};

export default ProfileLayout;
