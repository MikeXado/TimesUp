import Navbar from "./components/dashboard/navbar/Navbar";
import Sidebar from "./components/dashboard/sidebar/Sidebar";
export default function layout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 h-screen overflow-hidden">
        <Navbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="px-2 md:px-2 mx-auto w-full md:pt-24">
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
