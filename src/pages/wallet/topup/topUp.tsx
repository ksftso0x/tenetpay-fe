import {
  AccountBalanceWalletOutlined,
  ChevronLeft,
  CreditCard,
} from "@mui/icons-material";
import Footer from "../../../components/Footer";
import { prepareValue } from "../../../components/Home";
import Navigation from "../../../components/Navigation";
import {
  BsArrowLeftRight,
  BsBank2,
  BsBasket2,
  BsPrinter,
} from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { responsive } from "../../../data/atom";
const TopUp = () => {
  const location = useLocation();
  const { from } = (location.state as any) || { from: { pathaname: "/" } };
  const wallet: any = { balance: 1345.234, available: 135334 };
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
              navigate(from.pathaname);
              // setCurrentStep((step) => step - 1);
            }}
            className="flex pt-3 px-5 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>Top-Up</div>
          </div>
          <div className="flex p-7 flex-col gap-5 items-center">
            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
              className="p-5 gap-5 w-full rounded-md sm:min-w-[25rem] flex bg-white"
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
            <h2 className="font-semibold">
              How would you like to top up your wallet?
            </h2>
            <Link
              to="eft"
              style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
              className="flex items-center w-full p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
            >
              <BsBank2 size={15} />
              <div>EFT</div>
            </Link>
            <Link
              to="linked"
              style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
              className="flex items-center w-full p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
            >
              <CreditCard sx={{ fontSize: 18 }} />
              <div>Linked Bank Card</div>
            </Link>
            <Link
              to="store"
              style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
              className="flex items-center p-5 w-full gap-5 rounded-md sm:min-w-[25rem]  bg-white"
            >
              <BsBasket2 size={17} />
              <div>Cash at a Store</div>
            </Link>
            <Link
              to="atm"
              style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
              className="flex items-center p-5 gap-5 rounded-md w-full sm:min-w-[25rem]  bg-white"
            >
              <BsPrinter size={17} />
              <div>ATM</div>
            </Link>
            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
              className="flex w-full items-center p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
            >
              <BsArrowLeftRight size={17} />
              <div>Transfer Wallet to Wallet</div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default TopUp;
