import { AccountBalanceWalletOutlined, ChevronLeft } from "@mui/icons-material";
import { Button, FormControlLabel, RadioGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { responsive } from "../../data/atom";
import { BpRadio } from "../../utils/customRadio";
import ReusedTextField from "../../utils/RedditText";
import ReusedButton from "../../utils/ReusedButton";
import { IoWallet } from "react-icons/io5";
import { BsCalendar2CheckFill } from "react-icons/bs";

const CreateWallet = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [walletType, setWalletType] = useState<any>(null);
  const navigate = useNavigate();
  const labels = [
    {
      value: "virtual",
      label: "Vitrual Card Wallet",
    },
    {
      value: "only",
      label: "Wallet only",
    },
  ];
  const [nameOfWallet, setNameOfWallet] = useState("");
  const responsived = useRecoilValue(responsive);
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
              if (currentStep === 1) {
                navigate("/");
              } else setCurrentStep((step) => step - 1);
            }}
            className="flex pt-3 xs:pl-8 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>Create a wallet</div>
          </div>
          {currentStep === 1 ? (
            <div className="xs:px-10 px-5">
              <h2 className="font-semibold mt-4 text-sm">
                What kind of wallet would you like to create?
              </h2>
              <RadioGroup
                defaultValue="female"
                aria-labelledby="demo-customized-radios"
                name="customized-radios"
                className="mt-1 mb-5"
                onChange={(e) => {
                  setWalletType(e.target.value);
                }}
              >
                {labels.map((label, index) => (
                  <FormControlLabel
                    value={label.value}
                    control={<BpRadio />}
                    label={label.label}
                  />
                ))}
              </RadioGroup>
              <ReusedTextField
                //   label="What is your mobile number"
                variant="filled"
                label="Give your wallet a name"
                className="w-full"
                onChange={(e) => setNameOfWallet(e.target.value)}
                type="password"
                style={{ margin: "10px 0" }}
              />
              <div className="mt-3 mb-4">
                <ReusedButton
                  onClick={() => {
                    setCurrentStep(2);
                  }}
                  text="Next"
                />
              </div>
            </div>
          ) : currentStep === 2 ? (
            <div className="flex py-20 px-5 flex-col gap-5 items-center">
              <IoWallet color="#89CFF0" size={50} />
              <div className="font-semibold text-center">
                You're about to create a new {walletType} named &#123;
                {nameOfWallet}&#125;
              </div>
              <div className="flex mt-16 w-full gap-2 items-center">
                <Button
                  style={{
                    border: "2px solid #89CFF0",
                    color: "#89CFF0",
                    textTransform: "none",
                  }}
                  className="w-full h-[3.5rem]"
                  variant="outlined"
                  onClick={() => {
                    setCurrentStep(1);
                  }}
                >
                  Cancel
                </Button>
                <ReusedButton
                  onClick={() => {
                    setCurrentStep(3);
                  }}
                  type="button"
                  text="Continue"
                />
              </div>
            </div>
          ) : (
            <div className="flex py-20 px-5 flex-col gap-5 items-center">
              <BsCalendar2CheckFill style={{ color: "#89CFF0" }} size={50} />
              <h1 className="font-bold text-lg w-[14rem] text-center mt-3">
                We successfully created your wallet!
              </h1>
              <h2 className="font-semibold text-center">
                Your wallet is ready Next you can top-up your wallet to start
                transacting
              </h2>
              <div className="mt-10 w-full">
                <ReusedButton
                  onClick={() => {
                    setCurrentStep(3);
                  }}
                  type="button"
                  text="View my wallet"
                />
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default CreateWallet;
