import dayjs from "dayjs";
import "dayjs/locale";
import "./App.scss";
import Navbar from "./shared/components/navbar/navbar.component";
import "./shared/style/global.scss";

dayjs.locale("fr");

function App({ children }: { children: JSX.Element }) {
  return (
    <>
      {" "}
      <Navbar />
      <div className="children">{children}</div>{" "}
    </>
  );
}

export default App;
