import {
  AccessAlarmOutlined,
  AccountBalanceWalletOutlined,
  AddCircleOutlineOutlined,
  ChevronLeft,
  Close,
  MoreVertOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Transition } from "./manage";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  RadioGroup,
} from "@mui/material";
import Footer from "../../components/Footer";
import { prepareValue } from "../../components/Home";
import Navigation from "../../components/Navigation";
import PhysicalCard from "../../assets/physical_card.png";
import { useState } from "react";
import { IOSSwitch } from "../../utils/switch";
import { Link } from "react-router-dom";
import { BpRadio } from "../../utils/customRadio";
import ReusedButton from "../../utils/ReusedButton";
import { BiTransfer } from "react-icons/bi";
import { VscSortPrecedence } from "react-icons/vsc";

const Cards = () => {
  const wallet: any = { balance: 1345.234, available: 135334 };
  const [drop, setDrop] = useState(false);
  const [popup, setPopup] = useState(false);
  const [StopCard, setStopCard] = useState(false);
  const labels = [
    "Fraud",
    "Lost or stolen",
    "It is damage",
    "No longer need it",
  ];
  const labels2 = ["Create a new virtual card", "Withdrawal my wallet balance"];
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
            <div className="text-white font-bold">My Virtual Card</div>
            <div className="bg-white px-[2rem] shadow-md sm:px-[4rem] py-10 rounded-md flex flex-col gap-4">
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
                    color: "#f15a22",
                    padding: 32,
                    textTransform: "none",
                  }}
                  className="gap-5 rounded-md sm:min-w-[25rem] flex bg-white"
                >
                  <AddCircleOutlineOutlined />
                  <div className="font-bold ">Add your First Wallet</div>
                </Button>
              )}

              <div className="flex gap-3 flex-col items-center">
                <img src={PhysicalCard} className="w-[14rem]" />
                <div className="flex items-center gap-2 text-[#f15a22]">
                  <VisibilityOutlined />
                  <div className="font-bold">View card details</div>
                </div>
                <div className="w-full justify-between flex items-center">
                  <div></div>
                  <div className="flex my-5 items-center gap-2">
                    <div className="text-sm font-bold">Active</div>
                    <IOSSwitch />
                  </div>
                  <Dialog
                    open={popup}
                    onClose={() => setPopup(false)}
                    TransitionComponent={Transition as any}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <div>
                      <div className="flex justify-between">
                        <div
                          onClick={() => {
                            setPopup(false);
                            // setCurrentStep((step) => step - 1);
                          }}
                          className="flex pt-3 pl-2 cursor-pointer items-center"
                        >
                          <ChevronLeft />
                          <div>Stop my card</div>
                        </div>
                        <IconButton onClick={() => setPopup(false)}>
                          <Close />
                        </IconButton>
                      </div>
                    </div>
                    {!StopCard ? (
                      <DialogContent className="flex flex-col ">
                        <DialogTitle className="text-center">
                          Your are about to stop your card
                        </DialogTitle>
                        <DialogContentText
                          className="max-w-[22rem] text-center p-5"
                          id="alert-dialog-slide-description"
                        >
                          If your card has money on it you will have a choice to
                          transfer it to a new card or to your wallet.
                        </DialogContentText>
                        <AccountBalanceWalletOutlined
                          className="mx-auto mb-3"
                          sx={{ fontSize: 50, color: "#89CFF0" }}
                        />
                        <div className="mt-3">
                          <div className="font-bold">
                            Why would you like to stop your card?
                          </div>
                          <div className="flex flex-col">
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
                                  key={index}
                                  value={label}
                                  control={<BpRadio />}
                                  label={label}
                                />
                              ))}
                            </RadioGroup>
                          </div>
                          <div className="my-4">
                            <ReusedButton
                              text="Stop my card"
                              onClick={() => {
                                setStopCard(true);
                              }}
                            />
                          </div>
                        </div>
                      </DialogContent>
                    ) : (
                      <DialogContent className="flex flex-col ">
                        <AccountBalanceWalletOutlined
                          className="mx-auto mb-3"
                          sx={{ fontSize: 50, color: "#89CFF0" }}
                        />
                        <DialogTitle className="text-center">
                          Your card was stoped successfully
                        </DialogTitle>
                        <div className="text-center mb-2">
                          Your wallet balance is:
                        </div>
                        <h1 className="text-[#89CFF0] mb-5 text-3xl text-center font-bold">
                          R100.00
                        </h1>
                        <div className="mt-3">
                          <div className="font-bold">
                            Why would you like to stop your card?
                          </div>
                          <div className="flex flex-col">
                            <RadioGroup
                              defaultValue="female"
                              aria-labelledby="demo-customized-radios"
                              name="customized-radios"
                              onChange={(e) => {
                                // setIdentity(e.target.value);
                              }}
                            >
                              {labels2.map((label, index) => (
                                <FormControlLabel
                                  key={index}
                                  value={label}
                                  control={<BpRadio />}
                                  label={label}
                                />
                              ))}
                            </RadioGroup>
                          </div>
                          <div className="mt-3">
                            <ReusedButton text="Next" />
                          </div>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                  <div className="relative">
                    <IconButton onClick={() => setDrop(true)}>
                      <MoreVertOutlined />
                    </IconButton>
                    {drop && (
                      <div
                        style={{
                          boxShadow: "rgba(0, 0, 0, 0.13) 2px 2px 13px",
                        }}
                        className="absolute py-7 gap-3 flex flex-col min-w-[14rem] top-8 rounded-md right-0 bg-white "
                      >
                        <div
                          onClick={() => {
                            setPopup(true);
                          }}
                          className="font-semibold  cursor-pointer mx-5"
                        >
                          Cancel Card
                        </div>
                        <Link to="/" className="mx-5">
                          Change PIN
                        </Link>
                        <div className="absolute top-0 right-0">
                          <IconButton onClick={() => setDrop(false)}>
                            <Close />
                          </IconButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Link
                to="/wallet/top-up"
                style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
                className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
              >
                <VscSortPrecedence size={25} />
                <div>Top up</div>
              </Link>
              <Link
                to="/wallet/transfer"
                style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
                className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
              >
                <BiTransfer size={22} />
                <div>Transfer</div>
              </Link>
              <Link
                to="/wallet/withdraw"
                style={{ boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }}
                className="flex p-5 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
              >
                <VscSortPrecedence size={20}/>
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
export default Cards;
