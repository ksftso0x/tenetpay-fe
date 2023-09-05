import { AccountBalanceWalletOutlined, ChevronLeft } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
} from "@mui/material";
import { useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import { MdFactCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";
import Navigation from "../../../components/Navigation";
import { BpRadio } from "../../../utils/customRadio";
import ReusedTextField from "../../../utils/RedditText";
import ReusedButton from "../../../utils/ReusedButton";
import { RedditTextField } from "../../auth/Signup";
import { BootstrapInput } from "../topup/linked";

const Transfer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const labels = [
    {
      label: "One of my own wallets",
      value: "own",
    },
    {
      label: "Someone else's wallet",
      value: "someone",
    },
  ];
  const navigate = useNavigate();
  return (
    <div>
      <Navigation />
      <div className="min-h-screen xs:py-[5rem]  xs:pt-[9rem]  pb-[7rem] xs:bg-[#fbf8f8] overflow-x-hidden flex flex-col xs:justify-center ">
        <form className="mx-auto bg-white shadow-md w-full xs:rounded-xl xs:max-w-md">
          <div className="shadow w-full h-[5rem]"></div>
          <div className="p-7 flex flex-col">
            <div
              onClick={() => {
                if (currentStep === 1) {
                  navigate("/wallet");
                } else setCurrentStep((step) => step - 1);
              }}
              className="flex mb-5 cursor-pointer items-center"
            >
              <ChevronLeft sx={{ fontSize: 25 }} />
              <div>Wallet Transfer</div>
            </div>
            {currentStep === 1 ? (
              <div className="flex flex-col">
                <h2 className="font-semibold">
                  To whose wallet are making a transfer?
                </h2>
                <RadioGroup
                  defaultValue="female"
                  aria-labelledby="demo-customized-radios"
                  name="customized-radios"
                  onChange={(e) => {
                    // setIdentity(e.target.value);
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
                <h2 className="font-semibold mb-3 text-sm">From</h2>
                <div className="w-full pl-3">
                  <FormControl className="w-full" variant="standard">
                    <InputLabel id="demo-customized-select-label">
                      Select your wallet
                    </InputLabel>
                    <Select
                      className="w-full"
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      input={<BootstrapInput />}
                    >
                      <MenuItem value={10}>Wallet 1</MenuItem>
                      <MenuItem value={20}>Wallet 2</MenuItem>
                      <MenuItem value={30}>Wallet 3</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <h2 className="font-semibold my-4 text-sm">To</h2>
                <div className="pl-3 w-full">
                  <FormControl className="w-full" variant="standard">
                    <InputLabel id="demo-customized-select-label">
                      Select your wallet
                    </InputLabel>
                    <Select
                      className="w-full"
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      input={<BootstrapInput />}
                    >
                      <MenuItem value={10}>Wallet 1</MenuItem>
                      <MenuItem value={20}>Wallet 2</MenuItem>
                      <MenuItem value={30}>Wallet 3</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <h2 className="font-semibold my-4 text-sm">
                  With how much would you like to transfer?
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
                <div className="my-5 ">
                  <ReusedTextField
                    label="Payment reference (optional)"
                    variant="filled"
                    className="w-full"
                  />
                </div>
                <div className="w-full mb-4">
                  <ReusedButton
                    onClick={() => {
                      setCurrentStep(2);
                    }}
                    text="Next"
                  />
                </div>
              </div>
            ) : currentStep === 2 ? (
              <div className="flex flex-col p-7 items-center my-5">
                <MdFactCheck size={40} style={{ color: "#89CFF0" }} />
                <h1 className="font-semibold mt-4 mb-2">
                  You are about to transfer
                </h1>

                <h1 className="font-bold text-[#89CFF0] text-3xl">R100.00</h1>
                <h1 className="font-semibold text-center mt-4 mb-2">
                  from your &#123;Ukheshe Wallet &#125; to your &#123;Card
                  Wallet &#125;
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
              <div className="flex py-20 px-5 flex-col gap-3 items-center">
                <MdFactCheck
                  style={{ color: "#89CFF0" }}
                  size={50}
                />
                <h1 className="font-bold text-lg mt-3">Transfer successfull</h1>
                <h2 className="font-semibold text-center">
                  Your &#123;Ukheshe wallet&#125; balance is
                </h2>
                <h1 className="font-bold text-[#89CFF0] text-4xl">R100.00</h1>
                <h2>Available balance R80.34</h2>
                <div className="mt-10 w-full">
                  <ReusedButton
                    onClick={() => {
                      // setCurrentStep(3);
                    }}
                    type="button"
                    text="Done"
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default Transfer;
