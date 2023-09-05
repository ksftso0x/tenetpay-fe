import { AccountBalanceWalletOutlined, ChevronLeft } from "@mui/icons-material";
import Footer from "../../../components/Footer";
import ReusedTextField from "../../../utils/RedditText";
import Navigation from "../../../components/Navigation";
import { InputAdornment } from "@mui/material";
import ReusedButton from "../../../utils/ReusedButton";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { responsive } from "../../../data/atom";
import {RiFolderAddFill} from "react-icons/ri"
const StoreTopUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "From the menu select 'Value Added Services'",
    "Select deposit",
    "Select 'Deposits'",
    "Select 'uKhese",
    <div className=" flex gap-1">
      <span className="text-sm">Insert the reference number</span>
      <span className="text-[#89CFF0] font-bold text-sm">123456</span>
    </div>,
  ];
  const responsived = useRecoilValue(responsive);
  return (
      <div>
        <Navigation />
        <div className="min-h-screen xs:py-[5rem]  xs:pt-[9rem]  pb-[7rem] xs:bg-[#fbf8f8] overflow-x-hidden flex flex-col xs:justify-center ">
          <form
            style={
              responsived ? {} : { boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }
            }
            className="mx-auto bg-white w-full xs:rounded-xl xs:max-w-md"
          >
            <div className="shadow w-full h-[5rem]"></div>
            <div
              onClick={() => {
                setCurrentStep((step) => step - 1);
              }}
              className="flex pt-3 pl-2 cursor-pointer items-center"
            >
              <ChevronLeft />
              <div>Top-up at a store</div>
            </div>
          {currentStep === 1 ? (
            <div className="px-5 mt-5">
              <div className="italic mb-12 text-sm">
                Top up your wallet at a Pick n Pay we will create and SMS you a
                token number &#40;Fee R6.00&#41;
              </div>
              <h2 className="font-semibold mb-3">
                How much would you like to top up?
              </h2>
              <ReusedTextField
                variant="filled"
                id="outlined-required"
                className="w-full"
                helperText="Minimum is 50.00"
                label="Amount"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">0.00</InputAdornment>
                  ),
                }}
              />
              <div className="mt-32 mb-5">
                <ReusedButton onClick={() => setCurrentStep(2)} text="Next" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <RiFolderAddFill
              size={50}
              style={{ color: "#89CFF0" }}
            />
              <h2 className="font-bold max-w-[15rem] text-center text-sm">
                Please give R250.00 to the teller with reference number{" "}
                <span className="text-[#89CFF0]">123456</span>
              </h2>

              <div className="italic text-sm">
                The amount will immeditely reflect in your wallet
              </div>
              <div className="flex flex-col w-full px-4 gap-3">
                <h2 className="font-bold text-sm">
                  Follow the steps below to deposit money at a Nedbank ATM.
                </h2>
                <div className="flex px-3 w-full flex-col items-start mb-12 gap-2">
                  {steps.map((step, index) => (
                    <div key={index} className="flex">
                      <div className="text-sm pr-2">{index + 1}.</div>
                      <div className="text-sm">{step}</div>
                    </div>
                  ))}
                </div>
                <div className="mb-7">
                  <ReusedButton text="Done" />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default StoreTopUp;
