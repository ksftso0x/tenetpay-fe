import {
  AccountBalanceWalletOutlined,
  AddCircleOutlineOutlined,
  ChevronLeft,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { useState } from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../../components/Footer";
import Navigation from "../../../components/Navigation";
import { responsive } from "../../../data/atom";
import ReusedTextField from "../../../utils/RedditText";
import ReusedButton from "../../../utils/ReusedButton";
import { BiCreditCardAlt } from "react-icons/bi";
import { MdFactCheck } from "react-icons/md";

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #89CFF0",
    overflow: "hidden",
    background: "#f7e5de8a",
    color: "black",

    width: "100%",
    fontWeight: "bold",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },
  marginTop: "1px",

  "&.Mui-focused": {
    marginTop: "-1px",
  },
  "& .MuiInputBase-input": {
    margin: "0 -10px",
    borderRadius: 4,
    border: "1px solid #ced4da",
    padding: "20px 8px",
    marginTop: "-5px",
  },
}));

const TopUpLinked = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const responsived = useRecoilValue(responsive);
  const navigate = useNavigate();

  return (
    <div>
      <Navigation />
      <div className="min-h-screen xs:py-[5rem]  xs:pt-[9rem]  pb-[7rem] xs:bg-[#fbf8f8] overflow-x-hidden flex flex-col xs:justify-center ">
        <form
          style={
            responsived ? {} : { boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }
          }
          className="mx-auto bg-white  w-full xs:rounded-xl xs:max-w-md"
        >
          <div className="shadow w-full h-[5rem]"></div>
          <div className="p-7 flex flex-col">
            <div
              onClick={() => {
                if (currentStep === 1) navigate(-1);
                else setCurrentStep((step) => step - 1);
              }}
              className="flex mb-5 cursor-pointer items-center"
            >
              <ChevronLeft sx={{ fontSize: 25 }} />
              <div>Top up with a linked bank card</div>
            </div>
            {currentStep === 1 ? (
              <div className="flex flex-col">
                <h2 className="font-bold mb-2 text-sm">
                  Which card would you like to use?
                </h2>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <InputLabel id="demo-customized-select-label">
                    Select a card
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
                <h2 className="font-bold text-sm mt-10 mb-2">
                  How much do you want to top up your wallet?
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
                <div className="my-5">
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
                <BiCreditCardAlt   size={50} style={{ color: "#89CFF0" }} />
                <h1 className="font-semibold mt-4 mb-2">
                  You are about top up your card with
                </h1>
                <h1 className="font-bold text-[#89CFF0] my-3 text-4xl">
                  R100.00
                </h1>
                <h2 className="font-semibold">
                  Using your &#123;Nedbank Gold &#125; card
                </h2>
                <h2 className="font-semibold text-center mt-7">
                  You will be redirected to Confirm this transaction with 3D
                  secure.
                </h2>

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
            ) : (
              <div className="flex py-20 px-5 flex-col gap-3 items-center">
                <MdFactCheck
                  style={{ color: "#89CFF0" }}
                  size={50}
                />
                <h1 className="font-bold text-lg mt-3">Top up successfull</h1>
                <h2 className="font-semibold text-center">
                  Your &#123;wallet&#125; balance is
                </h2>
                <h1 className="font-bold text-[#89CFF0] text-4xl">R100.00</h1>
                <h2>Available balance R80.34</h2>
                <div className="mt-10 w-full">
                  <ReusedButton
                    onClick={() => {
                      setCurrentStep(3);
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

export default TopUpLinked;
