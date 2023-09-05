import { ChevronLeft, Search } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { responsive } from "../data/atom";
import { BootstrapInput } from "./wallet/topup/linked";

const Transact = () => {

  const responsived = useRecoilValue(responsive);
  const navigate = useNavigate();
  const descriptions = [
    { date: "2 March 2021", money: "R345.34" },
    { date: "2 March 2021", money: "R345.34" },
    { date: "2 March 2021", money: "R345.34" },
    { date: "2 March 2021", money: "R345.34" },
  ];
  return (
    <div>
      <Navigation />
      <div className="min-h-screen xs:py-[5rem]  xs:pt-[9rem]  pb-[7rem] xs:bg-[#fbf8f8] overflow-x-hidden flex flex-col xs:justify-center ">
        <div
          style={
            responsived ? {} : { boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }
          }
          className="mx-auto bg-white w-full xs:rounded-xl xs:max-w-md"
        >
          <div className="shadow w-full h-[5rem]"></div>
          <div className="flex flex-col">
            <div
              onClick={() => {
                navigate("/wallet/withdraw");
              }}
              className="flex pt-3 pl-2 cursor-pointer items-center"
            >
              <ChevronLeft />
              <div className="text-sm font-medium">Transaction history</div>
            </div>
            <div className="px-10 pt-10 pb-5">
              <FormControl className="w-full" variant="standard">
                <InputLabel id="demo-customized-select-label">
                  Virtual card wallet
                </InputLabel>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  input={<BootstrapInput />}
                >
                  <MenuItem value={10}>Virtual card 1</MenuItem>
                  <MenuItem value={20}>Virtual card 2</MenuItem>
                  <MenuItem value={30}>Virtual card 3</MenuItem>
                </Select>
              </FormControl>
              <div className="flex justify-between mt-5 w-full">
                <div className="font-semibold">Latest transactions</div>
                <Search />
              </div>
            </div>
            <div className="bg-[#deecf1] font-semibold pl-4 py-2">Pending</div>
            <div className="bg-white flex flex-col">
              {descriptions.map((description, index) => (
                <div
                  className="flex py-2 px-4 justify-between w-full bg-white border-b-2 border-b-[#deecf1] border-solid"
                  key={index}
                >
                  <div className="flex text-[#175064] font-medium flex-col gap-2">
                    <div className="text-sm">Description</div>
                    <div className="text-sm">{description.date}</div>
                  </div>
                  <div className="text-sm font-bold">{description.money}</div>
                </div>
              ))}
            </div>
            <div className="bg-[#deecf1] font-semibold pl-4 py-2">March</div>
            <div className="bg-white flex flex-col">
              {descriptions.map((description, index) => (
                <div
                  className="flex py-2 px-4 justify-between w-full bg-white border-b-2 border-b-[#deecf1] border-solid"
                  key={index}
                >
                  <div className="flex text-[#175064] font-medium flex-col gap-2">
                    <div className="text-sm">Description</div>
                    <div className="text-sm">{description.date}</div>
                  </div>
                  <div className="text-sm font-bold">{description.money}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Transact;
