import { AccountBalanceWalletOutlined, ChevronLeft } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../../components/Footer";
import Navigation from "../../../components/Navigation";
import { responsive } from "../../../data/atom";
import ReusedButton from "../../../utils/ReusedButton";
import { RiFolderAddFill } from "react-icons/ri";

const EftTopUp = () => {
  const steps = [
    "Log into your online or mobile banking app",
    "Create a beneficiary using the account details below",
    "IMPORTANT: use your unique wallet number {12345} as the beneficiary reference",
    "Your number will always be the same",
    "The money will reflect in your wallet within",
    "48 hours on weekends",
  ];
  const bankDetails = [
    {
      label: "Bank name",
      value: "Nedbank",
    },
    {
      label: "Bank Code",
      value: "1111",
    },
    {
      label: "Account number",
      value: "1234567",
    },
    {
      label: "Account name",
      value: "{PWA Account}",
    },
    {
      label: "Reference number",
      value: "1234567",
    },
  ];
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
          className="mx-auto bg-white w-full xs:rounded-xl xs:max-w-md"
        >
          <div className="shadow w-full h-[5rem]"></div>
          <div
            onClick={() => {
              navigate("/wallet");
            }}
            className="flex pt-3 pl-2 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>EFT wallet top-up</div>
          </div>
          <div className="flex p-5 flex-col  items-center">
            <RiFolderAddFill
              size={50}
              style={{ color: "#89CFF0" }}
            />
            <h2 className="font-semibold mb-5 max-w-[12rem] text-lg text-center">
              Follow these steps to top up your wallet
            </h2>
            <span className="mb-3 text-gray-700 text-sm font-medium ">
              &#40;Fee R0.00&#41;
            </span>
            <div className="flex gap-2 px-2 flex-col">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex gap-2 items-start ${
                    index === 2 ? "text-[#89CFF0]" : "text-gray-700"
                  }  `}
                >
                  <div
                    className={`text-sm ${
                      index === 2 ? "font-bold" : "font-medium"
                    }`}
                  >
                    {index + 1}.
                  </div>
                  <div
                    className={`text-sm ${
                      index === 2 ? "font-bold" : "font-medium"
                    }`}
                  >
                    {step + "."}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 text-sm font-bold text-center">
              Use the following bank details:
            </div>
            <div className="flex flex-col w-full gap-7">
              {bankDetails.map((detail, index) => (
                <div
                  key={index}
                  className="w-full justify-between flex items-center"
                >
                  <div className="flex flex-col">
                    <div className="text-gray-500 font-semibold text-sm">
                      {detail.label}
                    </div>
                    <div
                      className={`font-semibold ${
                        index === 4 && "text-[#89CFF0]"
                      }`}
                    >
                      {detail.value}
                    </div>
                  </div>
                  <Button variant="outlined" style={{ color: "#89CFF0" }}>
                    Copy
                  </Button>
                </div>
              ))}
            </div>
            <div className="my-7 w-full">
              <ReusedButton text="Done" />
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default EftTopUp;
