import { Button } from "@mui/material";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { MdManageAccounts, MdNoAccounts } from "react-icons/md";
import { useRecoilValue } from "recoil";
import Footer from "../../../components/Footer";
import Navigation from "../../../components/Navigation";
import { responsive } from "../../../data/atom";
import ReusedButton from "../../../utils/ReusedButton";

const ThereSomethingWithYourInfomation = () => {
  const responsived = useRecoilValue(responsive);
  const tips = [
    "Identity document uploaded",
    "Selfie with thumbs up uploaded",
    "Selfie match document's photo",
    "Personal information match document",
  ];
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
         
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ThereSomethingWithYourInfomation;
