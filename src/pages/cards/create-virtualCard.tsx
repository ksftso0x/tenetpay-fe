import { AccountBalanceWalletOutlined, ChevronLeft } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { responsive } from "../../data/atom";
import ReusedTextField from "../../utils/RedditText";
import ReusedButton from "../../utils/ReusedButton";
import { IOSSwitch } from "../../utils/switch";
import { BootstrapInput } from "../wallet/topup/linked";
import { DateOfBirthCustom } from "./add";

const CreateVirtualCard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();
  const { from } = (location.state as any) || { from: { pathname: "/" } };
  const responsived = useRecoilValue(responsive);
  const navigate = useNavigate();
  const [values, setValues] = useState<{ dob: Dayjs | null }>({ dob: null });
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
                navigate(from.pathname);
              } else setCurrentStep((step) => step - 1);
            }}
            className="flex pl-3 pt-3 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>Create a Virtual card</div>
          </div>
          {currentStep === 1 ? (
            <div className="flex py-7 px-5 flex-col gap-5 items-center">
              <AccountBalanceWalletOutlined
                style={{ color: "#89CFF0" }}
                sx={{ fontSize: 50 }}
              />
              <h1 className="font-bold text-lg w-[14rem] text-center mt-3">
                You don't have a virtual card.
              </h1>
              <h2 className="font-medium text-sm text-center">
                Use your virtual card to shop online securely, pay QR codes or
                to tap and pay with your phone. <br /> <br />
                Easily top up your card using your wallet.
              </h2>
              <div className="mt-10 w-full">
                <ReusedTextField
                  variant="filled"
                  label="Name your virtual card wallet"
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <ReusedButton
                  onClick={() => {
                    setCurrentStep(2);
                  }}
                  type="button"
                  text="Create my virtual card"
                />
              </div>
            </div>
          ) : currentStep === 2 ? (
            <div className="flex flex-col gap-3 p-7">
              <h1 className="font-bold  text-center mt-3">
                Please complete the following information
              </h1>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date of Birth"
                  inputFormat="MM/DD/YYYY"
                  value={values.dob}
                  onChange={(e) => setValues({ ...values, dob: e })}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel id="demo-customized-select-label">
                  Gender
                </InputLabel>
                <Select
                  className="w-full"
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  input={<BootstrapInput />}
                >
                  <MenuItem value={10}>Male</MenuItem>
                  <MenuItem value={20}>Female</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel id="demo-customized-select-label">
                  Marital status
                </InputLabel>
                <Select
                  className="w-full"
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  input={<BootstrapInput />}
                >
                  <MenuItem value={10}>Marital status 1</MenuItem>
                  <MenuItem value={20}>Marital status 2</MenuItem>
                  <MenuItem value={30}>Marital status 3</MenuItem>
                </Select>
              </FormControl>
              <h1 className="font-bold  text-center mt-3">
                Please complete your address details
              </h1>
              <div className="flex gap-3 mb-7 justify-center items-center">
                <div className="text-sm">Is your address in a block/estate</div>
                <IOSSwitch />
              </div>
              <ReusedTextField
                variant="filled"
                label="Block/Estate name and unit number"
                className="w-full"
              />
              <ReusedTextField
                variant="filled"
                label="Street name and number"
                className="w-full"
              />
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel id="demo-customized-select-label">
                  Province
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
              <ReusedTextField
                variant="filled"
                label="Street code"
                className="w-full"
              />
              <div className="flex gap-2 items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "&.Mui-checked": { color: "#89CFF0" },
                      }}
                      name="terms"
                    />
                  }
                  label={
                    <div>
                      <span className="text-sm">I accept the my card's </span>
                      <span className="text-[#89CFF0] text-sm font-semibold ">
                        terms and conditions.
                      </span>
                    </div>
                  }
                />
              </div>
              <ReusedButton onClick={() => setCurrentStep(3)} text="Next" />
            </div>
          ) : (
            <div className="flex py-20 px-5 flex-col gap-5 items-center">
              <AccountBalanceWalletOutlined
                style={{ color: "#89CFF0" }}
                sx={{ fontSize: 50 }}
              />
              <h1 className="font-bold text-lg max-w-[17rem] text-center mt-3">
                Your card was created successfully
              </h1>
              <h2 className="font-medium text-sm text-center">
                Next you can top up your card and start making payments using
                your virtual card.
              </h2>
              <div className="mt-10 w-full">
                <ReusedButton
                  type="button"
                  text="View My Card"
                  onClick={() => {
                    // setCurrentStep(2);
                  }}
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
export default CreateVirtualCard;
