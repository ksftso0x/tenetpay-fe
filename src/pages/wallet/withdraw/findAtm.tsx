import { AccountBalanceWalletOutlined, ChevronLeft } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../../components/Footer";
import Navigation from "../../../components/Navigation";
import { responsive } from "../../../data/atom";
import ReusedButton from "../../../utils/ReusedButton";
import { BootstrapInput } from "../topup/linked";
import { BsFillCalculatorFill } from "react-icons/bs";
const FindAtm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const responsived = useRecoilValue(responsive);
  const steps = [
    "Powersave Express",
    "Engen Randburg",
    "CJ Service Station",
    "Engen Golden Harvest ",
    "The Haze",
    "Caltex Waterfront2",
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
              if (currentStep === 1) navigate("/wallet/withdraw/atm");
              else setCurrentStep((step) => step - 1);
            }}
            className="flex pt-3 px-5 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>Find a Cash Express ATMs near you</div>
          </div>
          {currentStep === 1 ? (
            <div className="flex items-center px-7 flex-col pt-4">
              <BsFillCalculatorFill
                color="#89CFF0"
                className="my-3"
                size={70}
              />
              <h2 className="font-semibold mt-2 mb-5">
                Find a Cash Express ATMs near you
              </h2>
              <FormControl sx={{ m: 1 }} className="w-[90%]" variant="standard">
                <InputLabel id="demo-customized-select-label">
                  Select your province
                </InputLabel>
                <Select
                  className="w-full"
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  input={<BootstrapInput />}
                >
                  <MenuItem value={10}>Province 1</MenuItem>
                  <MenuItem value={20}>Province 2</MenuItem>
                  <MenuItem value={30}>Province 3</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} className="w-[90%]" variant="standard">
                <InputLabel id="demo-customized-select-label">
                  Enter your city or area
                </InputLabel>
                <Select
                  className="w-full"
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  input={<BootstrapInput />}
                >
                  <MenuItem value={10}>Card 1</MenuItem>
                  <MenuItem value={20}>Card 2</MenuItem>
                  <MenuItem value={30}>Card 3</MenuItem>
                </Select>
              </FormControl>
              <div className="mb-3 mt-4 w-full">
                <ReusedButton
                  onClick={() => {
                    setCurrentStep(2);
                  }}
                  text="View ATMs"
                />
              </div>
              <div className="mb-3">
                <Button style={{ color: "#89CFF0" }}>Back</Button>
              </div>
            </div>
          ) : currentStep === 2 ? (
            <div className="flex items-center px-7 flex-col pt-4">
              <BsFillCalculatorFill
                className="my-2"
                size={70}
                color={"#89CFF0"}
              />
              <h2 className="font-semibold mt-2 mb-5">ATMs near you</h2>
              <div className="flex flex-col gap-1 w-full">
                {steps.map((step, index) => (
                  <div key={index} className="flex w-full gap-3 items-center">
                    <div>{index + 1}.</div>
                    <div>{step}</div>
                  </div>
                ))}
              </div>
              <div className="mb-3 mt-8 w-full">
                <ReusedButton
                  onClick={() => {
                    setCurrentStep(3);
                  }}
                  text="Done"
                />
              </div>
              <div className="mb-3">
                <Button style={{ color: "#89CFF0" }}>Back</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center px-7 flex-col pt-4">
              <BsFillCalculatorFill
                className="my-5"
                color="#89CFF0"
                size={70}
              />
              <h2 className="font-semibold mt-2 mb-5">
                Unfortunately, there is no Cash Express ATMs near you. Please
                try a different area
              </h2>
              <div className="mb-3 mt-8 w-full">
                <ReusedButton
                  onClick={() => {
                    // setCurrentStep(2);
                  }}
                  text="Try a Different Area"
                />
              </div>
              <div className="mb-3">
                <Button style={{ color: "#89CFF0" }}>Cancel</Button>
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default FindAtm;
