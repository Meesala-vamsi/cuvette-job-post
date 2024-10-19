import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-10">
      <div className="flex justify-between items-center  gap-3 ">
        <div className="col-span-1 w-[30%]">
          <h1 className="text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </h1>
        </div>
          <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
