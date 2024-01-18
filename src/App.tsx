import "./App.scss";
import "./shared/style/global.scss";
import dayjs from "dayjs";
import "dayjs/locale";

dayjs.locale("fr");

function App({ children }: { children: JSX.Element }) {
  return <>{children}</>;
}

export default App;
