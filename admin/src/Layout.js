import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <input type="checkbox" id="menu-toggle" hidden />

      <div className="container-scroller">
        <Header />

        <div className="container-fluid page-body-wrapper">
          <Sidebar />

          <div className="main-panel">
            <div className="content-area">
              <Outlet />
            </div>
          </div>
        </div>

        {/* ✅ FOOTER OUTSIDE main-panel */}
        <Footer />
      </div>
    </>
  );
}

export default Layout;