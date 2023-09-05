import { AccountBalanceWalletOutlined, ChevronLeft } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Navigation from "../../../components/Navigation";
import { responsive } from "../../../data/atom";
import ReusedTextField from "../../../utils/RedditText";
import ReusedButton from "../../../utils/ReusedButton";

const StoreWithDraw = () => {
  const responsived = useRecoilValue(responsive);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "From the menu select 'Value Added Services'",
    "Select 'Mobile'",
    "Select 'Withdrawals'",
    "Select 'uKheshe'",
    <span className="text-sm">
      Select 'the reference number'{" "}
      <span className="text-[#89CFF0] font-bold text-sm">1233456</span>
    </span>,
  ];
  const navigate = useNavigate();
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
              if (currentStep === 1) navigate("/wallet/withdraw");
              else setCurrentStep((step) => step - 1);
            }}
            className="flex pt-3 pl-2 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>Withdrawal at a store</div>
          </div>
          {currentStep === 1 ? (
            <div className="p-5 flex flex-col ">
              <div className="italic mt-5 mb-7 text-sm">
                Make a withdrawal at a Pick n Pay. We will create and SMS you a
                token numnber. &#40;Fee R10.00&#41;
              </div>
              <h2 className="font-semibold mb-5">
                How much would you like to withdraw?
              </h2>
              <ReusedTextField
                variant="filled"
                id="outlined-required"
                className="w-full"
                helperText="Minimum amount is R50.00, fee per transaction Rx.00"
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
              <div className="mt-20">
                <ReusedButton onClick={() => setCurrentStep(2)} text="Next" />
              </div>
            </div>
          ) : (
            <div className="flex p-5 flex-col items-center">
              <BsFillCalendarCheckFill size={50} color="#89CFF0" className="my-4" />
              <h2 className="font-bold leading-7 mb-5 max-w-[17rem] text-center">
                Your Pick n Pay token to the value of R250.00 is{" "}
                <span className="text-[#89CFF0]">1234567890</span>
              </h2>
              <div className="italic text-center mt-5 mb-7 text-sm">
                It expires on 17 Aug 23:59. If not claimed the amount will
                return to your available balance
              </div>
              <div className="flex w-full flex-col">
                <h1 className="text-[0.9rem] font-semibold">
                  Teller instructions:
                </h1>
                <div className="flex flex-col gap-1">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-1">
                      <div className="text-sm">{index + 1}.</div>
                      <div className="text-sm">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-32 w-full">
                <ReusedButton text="Done" />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default StoreWithDraw;
