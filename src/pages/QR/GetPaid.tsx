import {
  AccountBalanceWalletOutlined,
  AddCircle,
  ChevronLeft,
  QrCode2,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { responsive } from "../../data/atom";
import ReusedTextField from "../../utils/RedditText";
import ReusedButton from "../../utils/ReusedButton";
import banks from "../../assets/banks.jpg";

const GetPaidWithQR = () => {
  const responsived = useRecoilValue(responsive);
  const [currentStep, setCurrentStep] = useState(1);
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
              if (currentStep === 1) navigate(-1);
              else setCurrentStep((step) => step - 1);
            }}
            className="flex pt-3 pl-2 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>Pay a QR Code</div>
          </div>
          {currentStep === 1 ? (
            <div className="w-full flex  flex-col p-5">
              <h2 className="font-semibold">How would you like to pay?</h2>
              <ReusedTextField
                //   label="What is your mobile number"
                variant="filled"
                label="Select a wallet or card"
                className="w-full"
                //   onChange={(e) => setNameOfWallet(e.target.value)}
                type="password"
                style={{ margin: "10px 0" }}
              />
              <h2 className="font-semibold mb-4 mt-5">
                With how much would you like to pay?
              </h2>
              <ReusedTextField
                variant="filled"
                id="outlined-required"
                className="w-full"
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
              <div className="mt-4">
                <ReusedTextField
                  variant="filled"
                  id="outlined-required"
                  className="w-full"
                  label="Payment reference (optional)"
                />
              </div>
              <div className="mt-5">
                <ReusedButton
                  onClick={() => {
                    setCurrentStep(2);
                  }}
                  text="Generate QR code"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <div className="font-bold text-2xl mt-5">Scan to pay</div>
              <div className="text-[#89CFF0] mb-2 text-3xl font-bold">
                R50.00
              </div>
              <QrCode2 sx={{ fontSize: 150 }} />
              <div className="font-bold text-[#237297] mb-14"> 1233456</div>
              <div className="flex w-full items-center gap-5 px-5">
                <div className="h-2 w-full border-b border-[#89CFF0]"></div>
                <div className=" whitespace-nowrap font-semibold text-[#89CFF0]">
                  Pay with
                </div>
                <div className="h-2 w-full border-b border-[#89CFF0]"></div>
              </div>
              <img className="mb-3" src={banks} />
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default GetPaidWithQR;
