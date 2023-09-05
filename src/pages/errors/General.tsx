import { Error } from "@mui/icons-material";
import { Button } from "@mui/material";
import { BsShieldExclamation, BsShieldFillExclamation } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { responsive } from "../../data/atom";
import ReusedButton from "../../utils/ReusedButton";

const GeneralError = () => {
  const responsived = useRecoilValue(responsive);
  return (
    <div>
      <Navigation />
      <div className="min-h-screen xs:py-[5rem]  xs:pt-[9rem]  pb-[7rem] xs:bg-[#fbf8f8] overflow-x-hidden flex flex-col xs:justify-center ">
        <div
          style={
            responsived ? {} : { boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }
          }
          className="mx-auto bg-white w-full xs:rounded-xl xs:max-w-md"
        >
          <div className="shadow w-full h-[5rem]"></div>
          <div className="flex p-5 items-center gap-20 flex-col">
            <div className="flex flex-col gap-3 items-center">
              <BsShieldExclamation size={50} color="#bd12b7" />
              <div className="font-bold text-lg">Oh no!</div>
              <div className="text-sm">Something went wrong</div>
            </div>
            <div className="flex w-full gap-4 flex-col">
              <ReusedButton text="Please try again" />
              <Button style={{ color: "#85c9e8" }} variant="text">Contact support</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default GeneralError;
