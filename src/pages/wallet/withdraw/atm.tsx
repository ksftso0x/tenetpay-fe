  import { ChevronLeft } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../../components/Footer";
import Navigation from "../../../components/Navigation";
import { responsive } from "../../../data/atom";
import ReusedTextField from "../../../utils/RedditText";
import ReusedButton from "../../../utils/ReusedButton";

const AtmWithdraw = () => {
  const responsived = useRecoilValue(responsive);
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "Find your nearest Cash Express ATM",
    "Select cardless transactions",
    <div className="text-sm">
      Enter the OTP{" "}
      <span className="text-[#89CFF0] text-sm font-bold">1356478</span>, the
      amount as well as your phone number
    </div>,
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
          <div className="flex flex-col">
            <div
              onClick={() => {
                if (currentStep === 1) navigate("/wallet/withdraw");
                else setCurrentStep((step) => step - 1);
              }}
              className="flex pt-3 pl-2 cursor-pointer items-center"
            >
              <ChevronLeft />
              <div className="text-sm font-medium">
                Withdrawal at a Cash Express ATM
              </div>
            </div>

            {currentStep === 1 ? (
              <div className="flex flex-col p-5">
                <div className="text-sm italic mt-4">
                  To make the withdrawal find a Cash Express ATM. We will create
                  and SMS a one-time pin&#40;OTP&#41;.&#40;Fees: R10 for R50 -
                  R500, R20 for R1000, R30 for R15000 & R40 for R2000&#41;.
                </div>
                <h2 className="font-semibold mb-5 mt-10">
                  How much would you like to withdraw?
                </h2>
                <ReusedTextField
                  variant="filled"
                  id="outlined-required"
                  className="w-full"
                  helperText="Min R50, Max R2000"
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
                <div className="my-10">
                  <ReusedButton
                    onClick={() => {
                      setCurrentStep(2);
                    }}
                    text="Next"
                  />
                </div>
              </div>
            ) : (
              <div className="flex p-5 flex-col items-center">
                <BsCreditCard2Back
                  size={40}
                  style={{ color: "#89CFF0", margin: "25px 0" }}
                />
                <div className="font-semibold my-5 text-center">
                  Your Cash Express ATM one-time pin &#40;OTP&#41; to the value
                  or R250.000 is{" "}
                  <span className="text-[#89CFF0] font-semibold">
                    145654345
                  </span>
                </div>
                <div className="italic text-center text-sm">
                  It expires on 17 June 2021 20:00. If not claimed the amount
                  will be returned to your available balance.
                </div>
                <div className="flex w-full gap-5 mt-8 flex-col">
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
                <div className="my-7 w-full">
                  <ReusedButton text="Done" />
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex justify-center">
            <Link
              to="find"
              className="w-fit mb-10 text-[#89CFF0] font-bold text-sm"
            >
              Find a Cash Express ATM near you
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default AtmWithdraw;
