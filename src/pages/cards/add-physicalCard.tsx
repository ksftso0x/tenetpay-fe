import {
  AddCircleOutlineOutlined,
  CameraAltOutlined,
  ChevronLeft,
  GppGood,
} from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { responsive } from "../../data/atom";
import ButtonAdd from "../../utils/ButtonAdd";
import ReusedTextField from "../../utils/RedditText";
import ReusedButton from "../../utils/ReusedButton";

const AddPhysicalCard = () => {
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
  const responsived = useRecoilValue(responsive);
  const [currentStep, setCurrentStep] = useState(1);
  const takePicture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.objectPosition = "top";
    canvas.style.objectFit = "cover";
    canvas.getContext("2d")?.drawImage(videEl.current as any, 0, 0, 550, 400);
    return canvas.toDataURL("image/png");
  };
  const [QRImage, setQRImage] = useState<any>(null);
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
                  setCurrentStep((step) => step - 1);
                }}
                className="flex pt-3 pl-2 cursor-pointer items-center"
              >
                <ChevronLeft />
                <div>My physical card</div>
              </div>
              <div className="flex mt-8 items-center max-w-[20rem] mx-auto flex-col">
                <Button
                  style={{
                    border: "2px  dotted #89CFF0",
                    color: "#89CFF0",

                    borderRadius: "20px",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    setCurrentStep(2);
                  }}
                  variant="outlined"
                  className="flex flex-col"
                >
                  <div className="font-bold max-w-[10rem] text-center mx-4 mb-10 mt-16 ">
                    You haven't added a phyical yet
                  </div>
                  <div className="flex gap-2 mb-28 items-center">
                    <AddCircleOutlineOutlined />
                    <div>Add your card</div>
                  </div>
                </Button>
                <div className="font-bold mt-8">Need a card?</div>
                <div className="text-center mt-4 mb-10 text-gray-800">
                  Contact support 000 000 000 to order your card.
                </div>
              </div>
            </>
          ) : currentStep === 2 ? (
            <div className="px-7">
              <div
                onClick={() => {
                  setCurrentStep((step) => step - 1);
                }}
                className="flex my-5 cursor-pointer items-center"
              >
                <ChevronLeft />
                <div>My physical card</div>
              </div>
              <div className="font-bold max-w-[25rem]  my-10  ">
                Please complete the following information to register your card.
              </div>
              <ReusedButton
                onClick={() => {
                  openCamera();
                  setCurrentStep(3);
                }}
                text="Scan your card's QR code"
              />
              <div className="text-center font-bold text-sm">or</div>
              <ReusedTextField
                //   label="What is your mobile number"
                variant="filled"
                label="Enter the code below the QR"
                className="w-full"
                style={{ margin: "10px 0" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 28 },
                      "&.Mui-checked": { color: "#89CFF0" },
                    }}
                    name="terms"
                  />
                }
                label={
                  <div>
                    <span className="text-sm">I accept the my card's </span>
                    <span className="text-[#89CFF0] text-sm font-semibold ">
                      terms and conditions.
                    </span>
                  </div>
                }
              />
              <div className="font-bold text-center mt-8">Need a card?</div>
              <div className="text-center mt-4 mb-10 text-gray-800">
                Contact support 000 000 000 to order your card.
              </div>
            </div>
          ) : currentStep === 3 ? (
            <div className="p-5 flex flex-col items-center">
              <div className="relative mt-14 mb-32">
                <video autoPlay ref={videEl} width="300" className="mb-7" />
                <div className="absolute bottom-3 -left-4 border-l-4 border-b-4 w-12 h-12 border-[#89CFF0]"></div>
                <div className="absolute -top-4 rotate-90 -left-4 border-l-4 border-b-4 w-12 h-12 border-[#89CFF0]"></div>
                <div className="absolute -top-4 rotate-180 -right-4 border-l-4 border-b-4 w-12 h-12 border-[#89CFF0]"></div>
                <div className="absolute bottom-3 -rotate-90 -right-4 border-l-4 border-b-4 w-12 h-12 border-[#89CFF0]"></div>
              </div>
              <IconButton
                onClick={async (e) => {
                  // console.log('f')
                  setQRImage(takePicture());
                  await closeCamera();
                  setCurrentStep(4);
                }}
                style={{ background: "#89CFF0", color: "white", padding: 10 }}
              >
                <CameraAltOutlined />
              </IconButton>
            </div>
          ) : (
            <div className="flex xs:p-10 p-5 flex-col items-center py-7">
              <GppGood style={{ color: "#89CFF0" }} sx={{ fontSize: 54 }} />
              <h1 className="font-semibold text-center mt-7 mb-5 w-[14rem]">
                Your card was successfully registered
              </h1>
              <h2 className="text-center mb-7 w-[14rem]">
                You will receive an SMS with your PIN on your phone with the
                number **** **** 255
              </h2>
              <div className="mb-5 w-full">
                <ReusedButton
                  type="button"
                  onClick={() => {
                    // setCurrentStep(4);
                  }}
                  text="Done"
                />
              </div>
              <div className="font-bold text-center mt-8">Need your number?</div>
              <div className="text-center mt-4 mb-10 text-gray-800">
                Contact support 000 000 000 to order your card.
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default AddPhysicalCard;
