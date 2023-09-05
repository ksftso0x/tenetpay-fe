import { AccountBalanceWalletOutlined, ChevronLeft } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { MdPending } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../../components/Footer";
import Navigation from "../../../components/Navigation";
import { responsive } from "../../../data/atom";
import ReusedTextField from "../../../utils/RedditText";
import ReusedButton from "../../../utils/ReusedButton";
import { CardNumberCustom } from "../../cards/add";
import { BootstrapInput } from "../topup/linked";

const EftWithDraw = () => {
  const responsived = useRecoilValue(responsive);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState({
    accNumber: "",
  });
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
          {currentStep === 1 ? (
            <>
              <div
                onClick={() => {
                  if (currentStep === 1) navigate("/wallet/withdraw");
                }}
                className="flex pt-3 pl-2 cursor-pointer items-center"
              >
                <ChevronLeft />
                <div>EFT amount</div>
              </div>
              <div className="p-5 flex flex-col">
                <h2 className="font-semibold mt-4 mb-2 text-sm">
                  How much would you like to EFT?
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
                <div className="mt-24 mb-3">
                  <ReusedButton
                    type="button"
                    onClick={() => {
                      setCurrentStep(2);
                    }}
                    text="Continue"
                  />
                </div>
              </div>
            </>
          ) : currentStep === 2 ? (
            <>
              <div
                onClick={() => {
                  setCurrentStep((step) => step - 1);
                }}
                className="flex pt-3 pl-2 cursor-pointer items-center"
              >
                <ChevronLeft />
                <div>EFT bank details</div>
              </div>
              <div className="p-5 flex flex-col">
                <h2 className="font-semibold mt-4 mb-3 text-sm">
                  Enter the reciepient's bank details
                </h2>
                <div className="flex flex-col gap-4">
                  <ReusedTextField
                    variant="filled"
                    id="outlined-required"
                    className="w-full"
                    label="Name"
                  />
                  <FormControl
                    sx={{ m: 1 }}
                    className="w-full "
                    variant="standard"
                  >
                    <InputLabel id="demo-customized-select-label">
                      Bank
                    </InputLabel>
                    <Select
                      className="w-full"
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      input={<BootstrapInput />}
                    >
                      <MenuItem value={10}>Bank 1</MenuItem>
                      <MenuItem value={20}>Bank 2</MenuItem>
                      <MenuItem value={30}>Bank 3</MenuItem>
                    </Select>
                  </FormControl>
                  <ReusedTextField
                    variant="filled"
                    id="outlined-required"
                    className="w-full"
                    value={values.accNumber}
                    InputProps={{
                      inputComponent: CardNumberCustom as any,
                    }}
                    onChange={(e) =>
                      setValues({ ...values, accNumber: e.target.value })
                    }
                    label="Account Number"
                  />
                  <ReusedTextField
                    variant="filled"
                    id="outlined-required"
                    className="w-full"
                    label="Payment reference(Optional)"
                  />
                  <div className="w-full my-4">
                    <ReusedButton
                      onClick={() => {
                        setCurrentStep(3);
                      }}
                      text="Continue"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : currentStep === 3 ? (
            <>
              <div
                onClick={() => {
                  setCurrentStep((step) => step - 1);
                }}
                className="flex pt-3 pl-2 cursor-pointer items-center"
              >
                <ChevronLeft />
                <div>Confirm EFT</div>
              </div>
              <div className="flex flex-col p-7 items-center my-5">
                <BsCreditCard2Back size={40} style={{ color: "#89CFF0" }} />
                <h1 className="font-semibold mt-4 mb-2">
                  You are about to make an EFT
                </h1>
                <h2 className="font-semibold mb-3 mt-4">Amount</h2>
                <h1 className="font-bold text-[#89CFF0] text-xl">R100.00</h1>
                <div className="flex items-center flex-col gap-1 mt-7">
                  <h2 className="font-semibold">Amount</h2>
                  <h3 className="text-sm">Goods bought Ref 1234567</h3>
                </div>
                <div className="flex items-center flex-col gap-1 mt-7">
                  <h2 className="font-semibold">Bank account details</h2>
                  <h3 className="text-sm font-medium">S smith</h3>
                  <h3 className="text-sm font-medium">
                    Nedbank &#40;9874&#41;
                  </h3>
                  <h3 className="text-sm font-medium">Acc no. 1234567</h3>
                  <h3 className="text-sm font-medium">Cheque account</h3>
                </div>
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
                      setCurrentStep(3);
                    }}
                  >
                    Cancel
                  </Button>
                  <ReusedButton
                    onClick={() => {
                      setCurrentStep(4);
                    }}
                    type="button"
                    text="Continue"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  setCurrentStep((step) => step - 1);
                }}
                className="flex pt-3 pl-2 cursor-pointer items-center"
              >
                <ChevronLeft />
                <div>EFT Successful</div>
              </div>
              <div className="flex flex-col p-7 items-center my-5">
                <MdPending size={40} style={{ color: "#89CFF0" }} />
              </div>
              <div className="flex p-5 flex-col items-center">
                <div className=" mb-3 font-bold  text-lg">Payment Pending.</div>
                <div className="text-center max-w-[17rem]">
                  The payment will reflect in the reciepients account withing 24
                  - 48 hours on weekedays if the transaction is successfull.
                  Check your transaction history for updates.
                </div>
                <div className="my-10 w-full">
                  <ReusedButton text="Done" />
                </div>
              </div>
            </>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default EftWithDraw;
