import { Error } from "@mui/icons-material";
import { Button } from "@mui/material";
import { BiCreditCardAlt } from "react-icons/bi";
import { BsShieldExclamation, BsShieldFillExclamation } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { responsive } from "../../data/atom";
import ReusedButton from "../../utils/ReusedButton";

const NoVirtualCardError = () => {
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
              <BiCreditCardAlt size={50} color="#bd12b7" />
              <div className="font-bold text-lg">
                You don't have a virtual card.
              </div>
              <div className="flex flex-col gap-4 items-center">
                <div className="text-center text-sm">
                  Use your virtual card to pay QR codes, shop online securely or
                  to tap and pay with your phone.
                </div>
                <div className="text-center text-sm">
                  Easily top up your card using wallet.
                </div>
              </div>
            </div>
            <div className="flex w-full gap-4 flex-col">
              <ReusedButton text="Create my virtual card" />
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
export default NoVirtualCardError;
