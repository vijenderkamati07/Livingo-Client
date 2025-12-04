//External Imports
import { Outlet, Link } from "react-router-dom";

//Local Imports
import Nav from '../Components/Nav.jsx';
import Footer from '../Components/Footer.jsx';

export default function MainLayout() {
  return (
    <>      
       <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
