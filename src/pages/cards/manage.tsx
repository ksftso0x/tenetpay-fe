import {
  AccountBalanceWalletOutlined,
  ChevronLeft,
  Close,
  Delete,
} from "@mui/icons-material";
import { forwardRef, useState } from "react";
import { useRecoilValue } from "recoil";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { responsive } from "../../data/atom";
import VisaCard from "../../assets/visa_card.jpg";
import NormalCard from "../../assets/normal_card.jpg";
import ReusedButton from "../../utils/ReusedButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
export const Transition = forwardRef(function Transition(props, ref) {
  return <Slide children={<></>} direction="down" ref={ref} {...props} />;
});
const ManageCards = () => {
  const hashValue = (value: string) => {
    return "*** **** 123";
  };
  const [popup, setPopup] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const responsived = useRecoilValue(responsive);
  const cards = [
    { type: "normal", name: "Nedbank Gold", value: "12346363453" },
    { type: "visa", name: "Absa", value: "12346363453" },
    { type: "normal", name: "Savings Card", value: "12346363453" },
  ];
  const [approve, setApprove] = useState(false);
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
              setCurrentStep((step) => step - 1);
            }}
            className="flex pt-3 pl-2 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>My linked cards</div>
          </div>
          <Dialog
            open={popup}
            onClose={() => setPopup(false)}
            TransitionComponent={Transition as any}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            {approve ? (
              <DialogContent className="flex flex-col items-center">
                <AccountBalanceWalletOutlined
                  sx={{ fontSize: 50, color: "#89CFF0" }}
                />
                <DialogTitle className="max-w-[20rem] text-center">
                  Your card was successfully deleted
                </DialogTitle>
                <DialogActions className="ml-auto">
                  <Button
                    onClick={() => {
                      setPopup(false);
                      setApprove(false);
                    }}
                    style={{ color: "#89CFF0" }}
                  >
                    Done
                  </Button>
                </DialogActions>
              </DialogContent>
            ) : (
              <DialogContent>
                <DialogTitle className="flex max-w-[22rem] items-center">
                  Are you sure you want to delete your linked bank card?
                </DialogTitle>
                <DialogContentText
                  className="max-w-[22rem] p-5"
                  id="alert-dialog-slide-description"
                >
                  Your card will be permanently deleted, but you can link it
                  again at any time
                </DialogContentText>
                <DialogActions>
                  <Button
                    style={{ color: "#89CFF0" }}
                    onClick={() => setPopup(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setApprove(true)}
                    style={{ color: "#89CFF0" }}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </DialogContent>
            )}
          </Dialog>
          <div className="p-5">
            <h2 className="font-semibold mb-5">Manage your linked cards</h2>
            <div className="flex flex-col gap-5">
              {cards.map((card, index) => (
                <div key={index} className="flex justify-between">
                  <div className="flex gap-3 items-start">
                    <img
                      className="w-12"
                      src={card.type === "normal" ? NormalCard : VisaCard}
                    />
                    <div className="flex flex-col">
                      <div className="text-sm">{card.name}</div>
                      <div className="text-sm">{hashValue(card.value)}</div>
                    </div>
                  </div>
                  <IconButton
                    onClick={() => {
                      setPopup(true);
                    }}
                  >
                    <Close sx={{ fontSize: 17, color: "#89CFF0" }} />
                  </IconButton>
                </div>
              ))}
            </div>
            <div className="mt-32">
              <ReusedButton text="Add a card" />
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default ManageCards;
