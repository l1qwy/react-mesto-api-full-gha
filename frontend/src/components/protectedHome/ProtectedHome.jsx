import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";

export default function ProtectedHome({ userEmail, ...props }) {
  return (
    <>
      <Header userData={userEmail} />
      <Main name="main" {...props} />
      <Footer name="footer" />
    </>
  );
}
