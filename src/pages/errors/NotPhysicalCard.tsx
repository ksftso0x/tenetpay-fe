import { Error } from "@mui/icons-material";
import { Button } from "@mui/material";
import { BiCreditCardAlt } from "react-icons/bi";
import { BsShieldExclamation } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { responsive } from "../../data/atom";
import ReusedButton from "../../utils/ReusedButton";

const PhysicalCardNotActivated = () => {
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
              <BiCreditCardAlt size={70} color="#bd12b7" />
              <div className="font-bold max-w-[13rem] text-center text-lg">
                You haven't activated your physical card
              </div>
              <div className="flex flex-col gap-4 items-center">
                <div className="text-center text-sm">
                  Follow these easy steps to activated and start using your
                  card.
                </div>
                <div className="text-center text-sm flex gap-3">
                  <span className="text-sm"> Don't have a card? </span>
                  <div className="text-[#85c9e8] text-sm font-semibold">
                    Contact support
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full gap-4 flex-col">
              <ReusedButton text="Activate my card" />
              <Button style={{ color: "#85c9e8" }} variant="text">
                No thanks, not now.
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default PhysicalCardNotActivated;
