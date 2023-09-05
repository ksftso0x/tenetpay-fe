import {
  AccountBalanceWalletOutlined,
  AddCircle,
  AddCircleOutlineOutlined,
  ChevronLeft,
} from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  InputAdornment,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../../components/Footer";
import Navigation from "../../../components/Navigation";
import { responsive } from "../../../data/atom";
import { BpRadio } from "../../../utils/customRadio";
import ReusedTextField from "../../../utils/RedditText";
import ReusedButton from "../../../utils/ReusedButton";

const PayAirtime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const responsived = useRecoilValue(responsive);
  const [currentStep, setCurrentStep] = useState(1);
  const labels = ["My Wallet", "Linked card"];
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
              navigate(from.pathname);
            }}
            className="flex pt-3 pl-2 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>Buy Vodacom Airtime</div>
          </div>
          {currentStep === 1 ? (
            <div className="w-full flex items-center flex-col p-5">
              <AccountBalanceWalletOutlined
                sx={{ fontSize: 50, color: "#89CFF0" }}
              />
              <h2 className="font-bold max-w-[15rem] mt-3 text-xl text-center">
                You're about to pay &#123;ABC Suppliers&#125;
              </h2>
              <div className="flex w-full mt-3 p-5 flex-col">
                <h2 className="font-semibold mb-2">Select the amount</h2>
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
                <h2 className="font-semibold mt-5 mb-2">
                  How would you like to pay?
                </h2>
                <RadioGroup
                  defaultValue="female"
                  aria-labelledby="demo-customized-radios"
                  name="customized-radios"
                  onChange={(e) => {
                    //   setIdentity(e.target.value);
                  }}
                >
                  {labels.map((label, index) => (
                    <FormControlLabel
                      key={index}
                      value={label}
                      control={<BpRadio />}
                      label={label}
                    />
                  ))}
                </RadioGroup>
                <h2 className="font-semibold mt-5">
                  Which card would you like to use?
                </h2>
                <ReusedTextField
                  //   label="What is your mobile number"
                  variant="filled"
                  label="Select a wallet or card"
                  className="w-full"
                  //   onChange={(e) => setNameOfWallet(e.target.value)}
                  type="password"
                  style={{ margin: "10px 0" }}
                />
                <div className="flex justify-between">
                  <div className="w-10"></div>
                  <Link
                    to="/cards/add"
                    className="flex cursor-pointer text-[#89CFF0] font-bold items-center gap-1"
                  >
                    <AddCircleOutlineOutlined />
                    Add a card
                  </Link>
                  <Link
                    to="/cards/manage"
                    className="font-bold cursor-pointer text-[#89CFF0]"
                  >
                    Mange my cards
                  </Link>
                </div>
                <div className="mt-5">
                  <ReusedButton
                    onClick={() => {
                      setCurrentStep(3);
                    }}
                    text="Next"
                  />
                </div>
              </div>
            </div>
          ) : currentStep === 2 ? (
            <div className="flex flex-col p-7 items-center my-5">
              <BsCreditCard size={40} style={{ color: "#89CFF0" }} />
              <h1 className="font-semibold mt-4 mb-2">
                You are about to transfer
              </h1>

              <h1 className="font-bold text-[#89CFF0] text-3xl">R100.00</h1>
              <h1 className="font-semibold text-center mt-4 mb-2">
                Telkom Mobile airtime for 082 2345 5421.
              </h1>
              <div className="flex mt-16 w-full gap-4 items-center">
                <Button
                  style={{
                    border: "2px solid #89CFF0",
                    color: "#89CFF0",
                    textTransform: "none",
                  }}
                  className="w-full h-[3.5rem]"
                  variant="outlined"
                  onClick={() => {
                    setCurrentStep(2);
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
            <div className="flex flex-col pt-10 px-5 gap-28 pb-7 items-center">
              <div className="flex gap-4 items-center flex-col">
                <BsCreditCard size={50} />
                <div className="font-bold text-lg">Purchase succeessful!</div>
              </div>
              <ReusedButton text="Done" />
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default PayAirtime;
