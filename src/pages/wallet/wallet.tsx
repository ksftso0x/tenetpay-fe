import {
  AccessAlarmOutlined,
  AccountBalanceWalletOutlined,
  AddCircleOutlineOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { prepareValue } from "../../components/Home";
import Navigation from "../../components/Navigation";
import { VscSortPrecedence } from "react-icons/vsc";
import { BiTransfer } from "react-icons/bi";

const Wallet = () => {
  const wallet: any = { balance: 1345.234, available: 135334 };

  return (
    <div>
      <Navigation />
      <div className="sm:py-[5rem] min-h-screen sm:pt-[5rem] pb-[7rem] bg-[#fbf8f8] overflow-x-hidden">
        <div className="shadow sm:hidden bg-white w-full h-[5rem]"></div>
        <div className="w-full flex items-center justify-center relative">
          <div className="absolute w-full top-0 flex flex-col justify-end h-[10rem] sm:h-[20rem] overflow-hidden z-0 min-w-[100rem]">
            <div className="w-full from-[#85c9e8] bg-gradient-to-r rounded-b-full to-[#cae7f6] min-h-[40rem]  "></div>
          </div>
          <div className="flex flex-col pt-4 gap-1 z-40 sm:px-0 px-5 sm:w-auto w-full">
            <div className="text-white font-bold">My Wallet</div>
            <div className="bg-white shadow-md px-[2rem] sm:px-[4rem] py-10 rounded-md flex flex-col gap-4">
              {wallet ? (
                <div
                  style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
                  className="p-5 gap-5 rounded-md sm:min-w-[25rem] flex bg-white"
                >
                  <AccountBalanceWalletOutlined />
                  <div className="flex flex-col gap-1 w-full">
                    <div className="font-semibold">My Wallet</div>
                    <div className="flex w-full justify-between">
                      <div className="text-sm">Balance</div>
                      <div className=" font-semibold flex items-center gap-1">
                        <div className="text-sm">R</div>
                        <div className="text-sm">
                          {prepareValue(wallet?.balance)}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="text-sm">Available</div>
                      <div className="text-sm font-semibold flex items-center gap-1">
                        <div className="text-sm">R</div>
                        <div className="text-sm">
                          {prepareValue(wallet?.available)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px",
                    color: "#89CFF0",
                    padding: 32,
                    textTransform: "none",
                  }}
                  className="gap-5 rounded-md sm:min-w-[25rem] flex bg-white"
                >
                  <AddCircleOutlineOutlined />
                  <div className="font-bold ">Add your First Wallet</div>
                </Button>
              )}
              <Link
                to="top-up"
                style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
                className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
              >
                <VscSortPrecedence  size={20}/>
                <div>Top up</div>
              </Link>
              <Link
                to="transfer"
                style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
                className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
              >
                <BiTransfer  size={20}/>
                <div>Transfer</div>
              </Link>
              <Link
                to="withdraw"
                style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
                className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
              >
                <VscSortPrecedence size={20} />
                <div>Withdraw</div>
              </Link>
              <div
                style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
                className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
              >
                <AccessAlarmOutlined />
                <div>Transaction History</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Wallet;
