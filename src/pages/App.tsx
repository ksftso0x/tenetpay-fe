import { CircularProgress } from "@mui/material";
import { useRecoilValue } from "recoil";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Navigation from "../components/Navigation";
import { User } from "../data/atom";

const App = () => {
  const user = useRecoilValue(User);
  return (
    <div>
      <Navigation />
      {user ? (
        <>
          <div className="sm:py-[5rem] min-h-screen sm:pt-[5rem]  pb-[7rem] bg-[#fbf8f8] overflow-x-hidden">
            <div className="shadow  sm:hidden bg-white w-full h-[5rem]"></div>
            <Home />
          </div>
          <Footer />
        </>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};
export default App;
