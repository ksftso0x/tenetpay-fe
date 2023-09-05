import {
  AccountBalanceWalletOutlined,
  AddCircleOutlineOutlined,
  CreditCardOutlined,
  DescriptionOutlined,
  PaymentsOutlined,
  QrCode2Outlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ButtonAdd from "../utils/ButtonAdd";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsBasket2 } from "react-icons/bs";

export const prepareValue = (value: number) => {
  let n = Math.floor(Math.floor(Math.log10(Number(value))) / 3) + 1;
  let str = "";
  for (let i = 0; i < n; i++) {
    let f = value
      .toString()
      .split(".")[0]
      .split("")
      .reverse()
      .slice(i * 3, i === n - 1 ? value.toString().length : 3 * (i + 1))
      .reverse()
      .join("");
    str = f + " " + str;
  }
  return (
    str +
    (value.toString().split(".")[1] ? "." + value.toString().split(".")[1] : "")
  );
};
const Home = () => {
  const wallet: any = null;
  const [virtualCard, setVirtualCard] = useState<any>(null);

  return (
    <div className="w-full flex items-center justify-center relative">
      <div className="absolute w-full top-0 flex flex-col justify-end h-[10rem] sm:h-[20rem] overflow-hidden z-0 min-w-[100rem]">
        <div className="w-full from-[#85c9e8] bg-gradient-to-r rounded-b-full to-[#cae7f6] min-h-[40rem]  "></div>
      </div>
      <div className="flex flex-col pt-4 gap-1 z-40 sm:px-0 px-5 sm:w-auto w-full">
        <div className="text-white font-bold">Home</div>
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
            <Link to="/wallet/create" className="w-full sm:min-w-[25rem]">
              <Button
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px",
                  color: "#89CFF0",
                  padding: 32,
                  textTransform: "none",
                }}
                className="gap-5 rounded-md w-full flex bg-white"
              >
                <AddCircleOutlineOutlined />
                <div className="font-bold ">Add your First Wallet</div>
              </Button>
            </Link>
          )}
          {virtualCard && wallet && (
            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
              className="p-5 gap-5 rounded-md sm:min-w-[25rem] flex bg-white"
            >
              <CreditCardOutlined />
              <div className="flex flex-col gap-1 w-full">
                <div className="font-semibold">My Virtual Card</div>
                <div className="flex w-full justify-between">
                  <div className="text-sm">Balance</div>
                  <div className="text-sm flex gap-1 items-center font-semibold">
                    <div className="text-sm">R</div>
                    <div className="text-sm">
                      {prepareValue(virtualCard.balance)}
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <div className="text-sm">Available</div>

                  <div className="text-sm font-semibold">
                    <div className="text-sm flex gap-1 items-center font-semibold">
                      <div className="text-sm">R</div>
                      {prepareValue(virtualCard.available)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Link
            to="qr/pay"
            style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
            className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
          >
            <QrCode2Outlined />
            <div>Pay a QR code</div>
          </Link>
          <Link
            to="qr/get-paid"
            style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
            className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
          >
            <PaymentsOutlined />
            <div>Get Paid with your QR code</div>
          </Link>
          <div
            style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
            className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
          >
            <PaymentsOutlined />
            <div>Make an EFT</div>
          </div>
          <Link
            to="vs/menu"
            style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
            className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
          >
            <BsBasket2 size={20}/>
            <div>Buy Airtime, Data or Electricity</div>
          </Link>
          <Link
            to="pay-bill"
            style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
            className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
          >
            <DescriptionOutlined />
            <div>Pay a Bill</div>
          </Link>
          <Link
            to="/transaction-history"
            style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
            className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
          >
            <AiOutlineFieldTime size={20}/>
            <div>Transaction History</div>
          </Link>
          {!virtualCard && (
            <Link to="/cards/create-virtual-card">
              <ButtonAdd
                onClick={() => setVirtualCard(wallet)}
                text="Add a Virtual Card"
              />
            </Link>
          )}
          <Link to="/cards/add-physical-card">
            <ButtonAdd
              // onClick={() => setPhysicalCard(true)}
              text="Add a Physical Card"
            />
          </Link>

          {wallet ? (
            <ButtonAdd text={"Add a Another Wallet"} />
          ) : (
            <Link to="/wallet/create" className="w-full sm:min-w-[25rem]">
              <ButtonAdd text={"Add a Wallet"} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
