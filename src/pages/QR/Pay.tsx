import {
  AccountBalanceWalletOutlined,
  AddCircle,
  CameraAltOutlined,
  ChevronLeft,
  QrCode2TwoTone,
} from "@mui/icons-material";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { responsive } from "../../data/atom";
import ReusedTextField from "../../utils/RedditText";
import ReusedButton from "../../utils/ReusedButton";

const PayQR = () => {
  const navigate = useNavigate();
  // codes to go back to the previous page
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const videEl = useRef<any>(null);
  const openCamera = async () => {
    const constraints = { video: true };
    await navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videEl.current.srcObject = stream;
      })
      .catch((err) => {
        alert("We can't access your camera");
      });
  };
  const closeCamera = async () => {
    const tracks = videEl.current.srcObject.getTracks();
    tracks.forEach((track: any) => track.stop());
    videEl.current.srcObjet = null;
  };
  const takePicture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.objectPosition = "top";
    canvas.style.objectFit = "cover";
    canvas.getContext("2d")?.drawImage(videEl.current as any, 0, 0, 550, 400);
    return canvas.toDataURL("image/png");
  };
  useEffect(() => {
    openCamera();
  }, []);
  const [QRImage, setQRImage] = useState<any>(null);
  const responsived = useRecoilValue(responsive);
  const [currentStep, setCurrentStep] = useState(1);
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
              if (currentStep === 1) navigate(from.pathname);
              else
                setCurrentStep((step) => {
                  if (step === 2) openCamera();
                  return step - 1;
                });
            }}
            className="flex pt-3 pl-2 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>Pay a QR Code</div>
          </div>
          {currentStep === 1 ? (
            <div className="flex flex-col items-center gap-4 mt-4">
              <div className="flex font-semibold items-center gap-3">
                <QrCode2TwoTone sx={{ fontSize: 40 }} />
                <div>Scan the QR code</div>
              </div>
              <div className="p-5 w-full flex flex-col bg-[#666] items-center">
                <div className="relative mt-14 mb-5">
                  <video autoPlay ref={videEl} width="300" className="mb-7" />
                  <div className="absolute bottom-3 -left-4 border-l-4 border-b-4 w-12 h-12 border-white"></div>
                  <div className="absolute -top-4 rotate-90 -left-4 border-l-4 border-b-4 w-12 h-12 border-white"></div>
                  <div className="absolute -top-4 rotate-180 -right-4 border-l-4 border-b-4 w-12 h-12 border-white"></div>
                  <div className="absolute bottom-3 -rotate-90 -right-4 border-l-4 border-b-4 w-12 h-12 border-white"></div>
                </div>
                <IconButton
                  onClick={(e) => {
                    // console.log('f')
                    setQRImage(takePicture());
                    closeCamera();
                    setCurrentStep(2);
                  }}
                  style={{ background: "#89CFF0", color: "white", padding: 10 }}
                >
                  <CameraAltOutlined />
                </IconButton>
              </div>
              <div className="text-[#89CFF0] font-bold my-5">Cancel</div>
            </div>
          ) : currentStep === 2 ? (
            <div className="w-full flex items-center flex-col py-5">
              <AccountBalanceWalletOutlined
                sx={{ fontSize: 50, color: "#89CFF0" }}
              />
              <h2 className="font-bold max-w-[15rem] mt-3 text-center">
                You're about to pay &#123;ABC Suppliers&#125;
              </h2>
              <div className="flex w-full mt-3 p-5 flex-col">
                <h2 className="font-semibold">How would you like to pay?</h2>
                <ReusedTextField
                  //   label="What is your mobile number"
                  variant="filled"
                  label="Select a wallet or card"
                  className="w-full"
                  //   onChange={(e) => setNameOfWallet(e.target.value)}
                  type="password"
                  style={{ margin: "10px 0" }}
                />
                <div className="flex text-[#89CFF0] gap-1 font-semibold items-center justify-end">
                  <AddCircle sx={{ fontSize: 20 }} />
                  <div className="text-sm">Top up</div>
                </div>
                <h2 className="font-semibold mb-4 mt-5">
                  With how much would you like to pay?
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
                <div className="mt-5">
                  <ReusedButton
                    onClick={() => {
                      setCurrentStep(3);
                    }}
                    text="Pay now"
                  />
                </div>
              </div>
            </div>
          ) : currentStep === 3 ? (
            <div className="w-full flex items-center flex-col py-5">
              <AccountBalanceWalletOutlined
                sx={{ fontSize: 50, color: "#89CFF0" }}
              />
              <h2 className="font-bold max-w-[15rem] mt-3 text-center">
                You're about to pay &#123;ABC Suppliers&#125;
              </h2>
              <div className="mt-7 mb-3 text-[#89CFF0] font-bold text-center text-4xl">
                R100.00
              </div>
              <div className="flex w-full mt-3 p-5 flex-col">
                <h2 className="font-semibold">How would you like to pay?</h2>
                <ReusedTextField
                  //   label="What is your mobile number"
                  variant="filled"
                  label="Select a wallet or card"
                  className="w-full"
                  //   onChange={(e) => setNameOfWallet(e.target.value)}
                  type="password"
                  style={{ margin: "10px 0" }}
                />
                <div className="flex text-[#89CFF0] gap-1 font-semibold items-center justify-end">
                  <AddCircle sx={{ fontSize: 20 }} />
                  <div className="text-sm">Top up</div>
                </div>
                <div className="mt-5">
                  <ReusedButton
                    onClick={() => {
                      setCurrentStep(4);
                    }}
                    text="Pay now"
                  />
                </div>
              </div>
            </div>
          ) : currentStep === 4 ? (
            <div className="w-full flex items-center flex-col py-5">
              <AccountBalanceWalletOutlined
                sx={{ fontSize: 50, color: "#89CFF0" }}
              />
              <h2 className="font-bold max-w-[17rem] text-lg mt-3 text-center">
                You're about to pay &#123;ABC Suppliers&#125;
              </h2>
              <div className="mt-7 mb-6 text-[#89CFF0] font-bold text-center text-4xl">
                R100.00
              </div>
              <div className="text-center font-semibold">
                Would you like to add a tip?
              </div>
              <div className="flex justify-center gap-3 my-3 items-center">
                <Button
                  style={{
                    background: "#89CFF0",
                    padding: "3px",
                    borderRadius: 50,
                  }}
                  variant="contained"
                >
                  0%
                </Button>
                <Button
                  style={{
                    borderColor: "#89CFF0",
                    color: "#89CFF0",
                    padding: "3px",
                    borderRadius: 50,
                  }}
                  variant="outlined"
                >
                  10%
                </Button>
                <Button
                  style={{
                    borderColor: "#89CFF0",
                    color: "#89CFF0",
                    padding: "3px",
                    borderRadius: 50,
                  }}
                  variant="outlined"
                >
                  15%
                </Button>
                <Button
                  style={{
                    borderColor: "#89CFF0",
                    color: "#89CFF0",
                    padding: "3px",
                    borderRadius: 50,
                  }}
                  variant="outlined"
                >
                  20%
                </Button>
              </div>
              <div className="flex w-full p-5 flex-col">
                <hr className="h-2 w-full" />

                <div className="justify-between flex items-center mt-4 mb-7 ">
                  <div className="font-semibold">Total</div>
                  <div className="text-[#89CFF0] font-bold text-3xl">
                    R100.00
                  </div>
                </div>
                <h2 className="font-semibold">How would you like to pay?</h2>
                <ReusedTextField
                  //   label="What is your mobile number"
                  variant="filled"
                  label="Select a wallet or card"
                  className="w-full"
                  //   onChange={(e) => setNameOfWallet(e.target.value)}
                  type="password"
                  style={{ margin: "10px 0" }}
                />
                <div className="flex text-[#89CFF0] gap-1 font-semibold items-center justify-end">
                  <AddCircle sx={{ fontSize: 20 }} />
                  <div className="text-sm">Top up</div>
                </div>
                <div className="mt-5">
                  <ReusedButton
                    onClick={() => {
                      setCurrentStep(5);
                    }}
                    text="Pay now"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex items-center flex-col py-5">
              <AccountBalanceWalletOutlined
                sx={{ fontSize: 50, color: "#89CFF0" }}
              />
              <h2 className="font-bold max-w-[15rem] mt-3 text-center">
                You're about to pay &#123;ABC Suppliers&#125;
              </h2>
              <div className="flex w-full mt-3 p-5 flex-col">
                <h2 className="font-semibold">How would you like to pay?</h2>
                <ReusedTextField
                  //   label="What is your mobile number"
                  variant="filled"
                  label="Select a wallet or card"
                  className="w-full"
                  //   onChange={(e) => setNameOfWallet(e.target.value)}
                  type="password"
                  style={{ margin: "10px 0" }}
                />
                <div className="flex text-[#89CFF0] gap-1 font-semibold items-center justify-end">
                  <AddCircle sx={{ fontSize: 20 }} />
                  <div className="text-sm">Top up</div>
                </div>
                <h2 className="font-semibold mb-4 mt-5">
                  With how much would you like to pay?
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
                <div className="mt-5">
                  <ReusedButton
                    onClick={() => {
                      setCurrentStep(3);
                    }}
                    text="Pay now"
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default PayQR;
