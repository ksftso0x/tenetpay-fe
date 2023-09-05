import { AccountBalanceWalletOutlined, ChevronLeft } from "@mui/icons-material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../../components/Footer";
import Navigation from "../../../components/Navigation";
import { responsive } from "../../../data/atom";
import ReusedButton from "../../../utils/ReusedButton";
import { RiFolderAddFill } from "react-icons/ri";

const AtmTopUp = () => {
  const location = useLocation();
  const {from} = location.state || {from: {pathaname: "/"}}
  const steps = [
    "Find a Nedbank ATM",
    "Select to make a deposit",
    <span className="text-sm">
      Enter account number{" "}
      <span className="text-[#89CFF0] text-sm font-bold">1194567654</span>
    </span>,
    <span className="text-sm font-bold">
      src/pages/wallet/withdraw/eft.tsx Use your wallet number{" "}
      <span className="text-[#89CFF0] text-sm font-bold">123456</span> as the
      reference
    </span>,
  ];
  const responsived = useRecoilValue(responsive);
  const navigate = useNavigate();
  return (
    <div>
      <Navigation />
      <div className="min-h-screen xs:py-[5rem]  xs:pt-[9rem]  pb-[7rem] xs:bg-[#fbf8f8] overflow-x-hidden flex flex-col xs:justify-center ">
        <form
          style={
            responsived ? {} : { boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }
          }
          className="mx-auto  bg-white w-full xs:rounded-xl xs:max-w-md"
        >
          <div className="shadow w-full h-[5rem]"></div>
          <div
            onClick={() => {
              navigate(from.pathaname);
            }}
            className="flex pt-3 pl-2 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>Top-up at ATM</div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <RiFolderAddFill size={50} style={{ color: "#89CFF0" }} />
            <h2 className="font-bold max-w-[15rem] text-center text-sm">
              Deposit money at a Nedbank ATM to top up your wallet.
            </h2>
            <h2 className="font-bold mb-2 gap-2 flex items-center">
              <span className="text-sm">Use reference number</span>
              <span className="text-sm font-bold text-[#89CFF0]">123456</span>
            </h2>
            <div className="italic mb-3 text-sm">
              The amount will XXX reflect in your wallet &#40;Fee%&#41;.
            </div>
            <div className="flex flex-col px-5 gap-3">
              <h2 className="font-bold text-sm">
                Follow the steps below to deposit money at a Nedbank ATM.
              </h2>
              <div className="flex gap-2 mb-10 w-full items-start px-3 flex-col">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="text-sm">{index + 1}.</div>
                    <div className="text-sm">{step}</div>
                  </div>
                ))}
              </div>
              <div className="mb-7">
                <ReusedButton text="Done" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default AtmTopUp;
