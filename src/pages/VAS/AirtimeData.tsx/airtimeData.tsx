import { ChevronLeft } from "@mui/icons-material";
import { FormControlLabel, RadioGroup } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Navigation from "../../../components/Navigation";
import { responsive } from "../../../data/atom";
import { BpRadio } from "../../../utils/customRadio";
import ReusedTextField from "../../../utils/RedditText";
import ReusedButton from "../../../utils/ReusedButton";
import VodcomLogo from "../../../assets/vodcom_logo.jpg";

const BuyAirtimeAndData = () => {
  const navigate = useNavigate();
  const responsived = useRecoilValue(responsive);
  const location = useLocation();
  const {from} = location.state as any || {from: {pathname: "/"}}
  const labels = [
    {
      label: "My own number",
      value: "own",
    },
    {
      label: "Someone else's number",
      value: "someone",
    },
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const vodcoms = [
    "Promotions",
    "Airtime",
    "Data Bundle",
    "Voice Bundle",
    "SMS Bundle",
  ];
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
            <div>Buy Airtime or Data</div>
          </div>
          {currentStep === 1 ? (
            <div className="mt-5 p-5 flex flex-col gap-3">
              <div className="font-bold">Who are you buying for?</div>
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
              <ReusedTextField
                //   label="What is your mobile number"
                variant="filled"
                label="Enter the phone number"
                className="w-full"
                style={{ margin: "10px 0" }}
              />
              <ReusedButton
                onClick={() => {
                  setCurrentStep(2);
                }}
                text="Next"
              />
            </div>
          ) : (
            <div className="mt-5 p-5 flex flex-col gap-3">
              <div className="font-bold">
                Select the Vodacom product you would like to buy
              </div>
              <div className="flex mb-4 flex-col gap-3">
                {vodcoms.map((vodcom, index) => (
                  <Link
                    to={vodcom.split(" ").join("-").toLowerCase()}
                    key={index}
                    style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
                    className="flex p-5 gap-5 items-center rounded-md sm:min-w-[25rem]  bg-white"
                  >
                    <img className="w-10" src={VodcomLogo} />
                    <div className="font-semibold">{vodcom}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default BuyAirtimeAndData;
