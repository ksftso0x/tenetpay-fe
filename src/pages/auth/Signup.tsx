import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import SampleSelfie from "../../assets/position.jpg";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  LinearProgress,
  RadioGroup,
} from "@mui/material";
import ReusedButton from "../../utils/ReusedButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import OtpField from "react-otp-field";
import Steppers from "../../utils/stepper";
import { BpRadio } from "../../utils/customRadio";
import {
  CameraAltOutlined,
  DeleteOutlineOutlined,
  Done,
  ThumbUpAlt,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import ReusedTextField from "../../utils/RedditText";
import { useRecoilValue } from "recoil";
import { responsive } from "../../data/atom";
import { BsFillPersonCheckFill } from "react-icons/bs";
import api from "../../lib/axios";
import Shake from "react-reveal/Shake";
import MuiPhoneNumber from "material-ui-phone-number";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { MdManageAccounts, MdNoAccounts } from "react-icons/md";
import jwtDecode from "jwt-decode";
export const RedditTextField = styled((props: TextFieldProps) => (
  <MuiPhoneNumber
    defaultCountry={"za"}
    value={props.value}
    onChange={props.onChange as any}
    InputLabelProps={{ style: { color: "gray" } }}
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #89CFF0",
    overflow: "hidden",
    borderRadius: 4,
    background: "#dddbe88a",
    color: "black",
    fontWeight: "semibold",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },
}));
const Signup = () => {
  const [idImage, setIdImage] = useState<null | string>(null);
  const [selfie, setSelfie] = useState<null | string>(null);
  const [step, setStep] = useState<number | null>(null);
  const searchParam = useSearchParams();
  useEffect(() => {
    if (searchParam[0].get("step")) setStep(Number(searchParam[0].get("step")));
    else if (searchParam[0]) setStep(1);
  }, [searchParam]);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [identity, setIdentity] = useState<string | null>(null);
  const labels = [
    {
      value: "NATIONAL_ID",
      label: "South African ID",
    },
    {
      value: "LOCAL_PASSPORT",
      label: "Valid South African passport",
    },
    {
      value: "DRIVERS_LICENSE",
      label: "Valid SA driver's license",
    },
    {
      value: "FOREIGN_PASSPORT",
      label: "Valid foreign passport",
    },
    {
      value: "ASYLUM_DOCUMENT",
      label: "Valid asylum document",
    },
  ];

  const thumbsData = [
    "Stand in front of a plain, light-coloured wall.",
    <div className="flex items-center gap-2">
      <span>
        Give us thumbs up
        <ThumbUpAlt style={{ color: "#89CFF0", margin: "8px" }} />
        close to your face
      </span>
    </div>,
    "Check that your face and thumb are in focus and not blurry",
  ];

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
    canvas.width = 540;
    canvas.height = 400;
    canvas.style.objectPosition = "top";
    canvas.style.objectFit = "cover";
    canvas.getContext("2d")?.drawImage(videEl.current as any, 0, 0, 550, 400);
    return canvas.toDataURL("image/png");
  };
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  useEffect(() => {
    const changeStep = (): number => {
      if (step === 1) {
        return 1;
      } else if (step === 2) {
        return 3;
      } else if (step === 3) {
        return 5;
      } else if (step === 4) {
        return 9;
      } else if (step === 5) {
        return 12;
      } else if (step === 6) {
        return 12;
      } else return 1;
    };
    setCurrentStep(changeStep());
  }, [step]);

  const [confirmPassword, setConfirmPassword] = useState("");
  const responsived = useRecoilValue(responsive);
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spier, setSpier] = useState(false);
  const [secondsPassed, setSecondsPassed] = useState(0);
  useEffect(() => {
    if (secondsPassed === 4) {
      setError(null);
    } else if (secondsPassed === 0) {
      setTimeout(() => {
        setSpier(!spier);
      }, 5);
    }
  }, [secondsPassed]);
  useEffect(() => {
    if (error) {
      setSecondsPassed(0);
      setSpier(!spier);
      const interval = setInterval(() => {
        setSecondsPassed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [error]);
  useEffect(() => {
    document.title = "Tenete Pay - Signup";
    setOtp("");
  }, []);
  const submitPhoneNumber = async () => {
    try {
      if (phoneNumber.length < 10) {
        setSecondsPassed(0);
        setError("Please enter a valid phone number");
        return;
      }
      if (!acceptTerms) {
        setSecondsPassed(0);
        setError("Please accept the terms and conditions");
        return;
      }
      setLoading(true);
      await api.post("/v1/users/signup/register-phone-number", {
        phoneNumber: phoneNumber.split(" ").join(""),
        getNotifications,
      });
      setError(null);
      setCurrentStep(2);
    } catch (error: any) {
      setSecondsPassed(0);
      setError(
        error.response.data.message !== "Server Error"
          ? error.response.data.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  const [ticket, setTicket] = useState<string | null>(null);
  const navigate = useNavigate();
  const [finalValues, setFinalValues] = useState<any>({
    fullname: "",
    surname: "",
    identityNumber: "",
    expiryDate: Date.now(),
  });
  const uploadImage = async (type: string, image: string) => {
    try {
      setLoading(true);
      if (type === "identity") {
        let data = await api.put(
          "/v1/users/signup/upload-identity-document?type=" + identity,
          {
            identity: image,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else if (type === "selfie") {
        let data = await api.put(
          "/v1/users/signup/upload-selfie",
          {
            selfie: image,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      return true;
    } catch (error) {
      setSecondsPassed(0);
      setError("unable to upload your identity");
      return false;
    } finally {
      setLoading(false);
    }
  };
  const submitOtp = async () => {
    try {
      setLoading(true);
      let data = await api.post("/v1/users/signup/verify-phone-number", {
        phoneNumber: phoneNumber.split(" ").join(""),
        code: otp,
      });
      setTicket(data.data.data.token);
      localStorage.setItem("ticket", data.data.data.token);
      setError(null);
      navigate("/signup?step=2");
      setCurrentStep(3);
      setOtp("");
    } catch (error: any) {
      setSecondsPassed(0);
      setError(
        error.response.data.message !== "Server Error"
          ? error.response.data.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (otp.length === 4) {
      submitOtp();
    }
  }, [otp]);
  const [showPassword, setShowPassword] = useState(false);
  const [getNotifications, setGetNotifications] = useState(false);
  for (let i = 0; i < document.forms.length; i++) {
    document.forms.item(i)?.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
  const createUserWithPassword = async () => {
    try {
      if (password === confirmPassword) {
        setLoading(true);
        let ticketToken = localStorage.getItem("ticket");
        const data = await api.put(
          "/v1/users/signup/create-user-password",
          {
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${ticket || ticketToken}`,
            },
          }
        );
        localStorage.removeItem("ticket");
        localStorage.setItem("token", data.data.data.token);
        setError(null);
        setCurrentStep(5);
        navigate("/signup?step=3");
      } else {
        setSecondsPassed(0);
        setError("Passwords do not match");
      }
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const [analyzedErrors, setAnalyzedErrors] = useState<string[] | null>(null);
  const [unknownError, setUnknownError] = useState(false);
  const submitFinalData = async () => {
    try {
      setLoading(true);
      finalValues.expiryDate = finalValues.expiryDate.toString();
      await api.put(
        "/v1/users/signup/upload-personal-information",
        finalValues,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await api.get("/v1/users/signup/analyze-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.setItem("token", data.data.data.token);
      setCurrentStep(13);
    } catch (error: any) {
      if (error.response.data.data) {
        localStorage.setItem("token", error.response.data.data.token);
        setAnalyzedErrors([...error.response.data.data.errors]);
      } else {
        setUnknownError(true);
      }
    } finally {
      setLoading(false);
    }
  };
  const [notification, setNotification] = useState<any>(null);
  const tips = [
    { label: "Identity document uploaded", value: "NO_IDENTITY" },
    { label: "Selfie with thumbs up uploaded", value: "NO_SELFIE" },
    { label: "Selfie match document's photo", value: "FACE_MISMATCH" },
    {
      label: "Personal information match document",
      value: "PERSONAL_INFO_MISMATCH",
    },
  ];
  const checkErrorCondition = (index: number) => {
    if (analyzedErrors) {
      return !analyzedErrors.includes(tips[index].value);
    } else {
      return true;
    }
  };
  return step && currentStep ? (
    <div className="min-h-screen flex flex-col xs:justify-center xs:py-12">
      <div
        style={
          responsived ? {} : { boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }
        }
        className="mx-auto relative bg-white rounded-xl w-full xs:max-w-lg"
      >
        {analyzedErrors ? (
          <>
            <div className="shadow w-full h-[5rem]"></div>

            <div className="flex p-5 items-center gap-10 flex-col">
              <div className="flex flex-col gap-2 items-center">
                <MdNoAccounts size={70} color="#bd12b7" />
                <div className="font-bold max-w-[13rem] text-center text-lg">
                  Something doesn't look right.
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm font-medium text-[#185069]">
                    Please check your information and try again.
                  </div>
                  <div className="flex flex-col mt-5 gap-5">
                    {tips.map((tip, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {checkErrorCondition(index) ? (
                          <AiOutlineCheckCircle size={25} color="green" />
                        ) : (
                          <AiOutlineCloseCircle size={25} color="red" />
                        )}
                        <div className="text-sm">{tip.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-4 flex-col">
                <ReusedButton
                  text="Try again"
                  onClick={() => {
                    let someData: any = jwtDecode(
                      localStorage.getItem("token")!
                    );
                    setAnalyzedErrors(null);
                    navigate("/signup?step=" + someData?.completedSteps);
                  }}
                />
                <Button variant="text" style={{ color: "#85c9e8" }}>
                  Contact support
                </Button>
              </div>
            </div>
          </>
        ) : unknownError ? (
          <>
            <div className="shadow w-full h-[5rem]"></div>
            <div className="flex p-5 items-center gap-20 flex-col">
              <div className="flex flex-col gap-3 items-center">
                <MdManageAccounts size={70} color="#bd12b7" />
                <div className="font-bold max-w-[13rem] text-center text-lg">
                  We need to chat!
                </div>
                <div className="flex flex-col gap-4 items-center">
                  <div className="text-sm font-medium text-[#185069]">
                    We've had a problem verifying your identity and would like
                    to do it though our support agents.
                  </div>
                </div>
              </div>
              <div className="flex w-full gap-4 flex-col">
                <ReusedButton text="Contact support" />
              </div>
            </div>
          </>
        ) : (
          <>
            {loading && (
              <div className="absolute w-full h-full z-50 bg-[#0000ff54] flex flex-col justify-between">
                <LinearProgress />
                <LinearProgress />
              </div>
            )}
            <div className="shadow w-full h-[5rem]"></div>
            {error && (
              <div className="max-w-[30rem] mt-5 mx-auto">
                <Shake spy={spier}>
                  <Alert severity="error">{error}</Alert>
                </Shake>
              </div>
            )}
            {notification && (
              <div className="max-w-[30rem] mt-5 mx-auto">
                <Shake spy={spier}>
                  <Alert severity="success">{notification}</Alert>
                </Shake>
              </div>
            )}
            {currentStep === 1 ? (
              <form className="xs:p-10 p-5 ">
                <h1 className="font-bold text-4xl  mb-3">Hey There!</h1>
                <h2 className="font-semibold">Let's sign you up.</h2>
                <RedditTextField
                  label="What is your mobile number"
                  variant="filled"
                  className="w-full"
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value as unknown as string);
                  }}
                  style={{ margin: "30px 0" }}
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={acceptTerms}
                        onChange={(e) => {
                          setAcceptTerms(!acceptTerms);
                        }}
                        sx={{
                          "& .MuiSvgIcon-root": { fontSize: 28 },
                          "&.Mui-checked": { color: "#89CFF0" },
                        }}
                        name="terms"
                      />
                    }
                    label={
                      <div>
                        <span className="text-sm">I accept the </span>
                        <span className="text-[#89CFF0] text-sm font-semibold ">
                          terms and conditions
                        </span>
                      </div>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": { fontSize: 28 },
                          "&.Mui-checked": { color: "#89CFF0" },
                        }}
                        checked={getNotifications}
                        onChange={(e) => {
                          setGetNotifications(!getNotifications);
                        }}
                        name="terms"
                      />
                    }
                    label={
                      <span className="text-sm">
                        Keep me in the loop with information and promotions
                      </span>
                    }
                  />
                </FormGroup>
                <div className="my-5">
                  <ReusedButton
                    onClick={(_e) => {
                      submitPhoneNumber();
                    }}
                    type="button"
                    text="Let's go"
                  />
                </div>
                <div className="flex justify-center gap-2">
                  <div className="text-sm">Already have an account?</div>
                  <Link
                    to="/login"
                    className="text-[#89CFF0] text-sm font-semibold"
                  >
                    Login
                  </Link>
                </div>
              </form>
            ) : currentStep === 2 ? (
              <form className="xs:p-10 p-5">
                <div className="flex flex-col max-w-[20rem] xs:max-w-full mx-auto">
                  <h1 className="font-bold text-4xl w-32 leading-[2.7rem] mb-3">
                    Just to verify
                  </h1>
                  <h2 className="font-semibold mb-7 text-sm">
                    Please enter the code sent to you by SMS to{" "}
                    {phoneNumber.slice(0, 3)}******
                    {phoneNumber.slice(
                      phoneNumber.length - 4,
                      phoneNumber.length
                    )}
                    .
                  </h2>
                  {/* OTP */}
                  <OtpField
                    value={otp}
                    onChange={(value: string) => {
                      setOtp(value);
                    }}
                    numInputs={4}
                    onChangeRegex={/^([0-9]{0,})$/}
                    autoFocus
                    isTypeNumber
                    classNames="flex mb-20 items-center w-full justify-between gap-4"
                    inputProps={{
                      className:
                        "otp-field__input w-[4rem] xs:w-[4rem] text-center font-bold xs:p-4 p-4  outline-none border-[1.7px] rounded border-gray-400",
                      disabled: false,
                      type: "text",
                    }}
                  />
                </div>
                <div className="flex my-5 justify-center gap-2">
                  <div className="text-sm">Didn't receive the code? </div>
                  <div
                    onClick={async () => {
                      try {
                        setLoading(true);
                        await api.put("/v1/users//resend/signup-otp", {
                          phoneNumber,
                        });
                        setSecondsPassed(0);
                        setNotification("Code was resent to your phone number");
                      } catch (error: any) {
                        setError("Unable to resend the code");
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="text-sm cursor-pointer text-[#89CFF0] font-semibold"
                  >
                    Resend it
                  </div>
                </div>
                <div className="flex justify-center gap-2">
                  <div className="text-sm">Wrong phone number? </div>
                  <div
                    onClick={() => {
                      setCurrentStep(1);
                    }}
                    className="text-sm cursor-pointer text-[#89CFF0] font-semibold"
                  >
                    Go back
                  </div>
                </div>
              </form>
            ) : currentStep === 3 ? (
              <form className="xs:p-10 p-5">
                <div className="flex flex-col max-w-[20rem] xs:max-w-full mx-auto">
                  <h1 className="font-bold text-4xl w-[13rem] leading-[2.7rem] mb-3">
                    Let's keep you safe!
                  </h1>
                  <h2 className="font-semibold mb-7 text-sm">
                    Create your Password
                  </h2>
                  <div className="relative w-full">
                    <ReusedTextField
                      type={showPassword ? "text" : "password"}
                      className="w-full"
                      label="Create your Password"
                      onChange={(e) => setPassword(e.target.value)}
                      variant="filled"
                      value={password}
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer top-0 right-0 mt-5 mr-5"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </div>
                  </div>
                  <div className="mt-5 mb-5">
                    <ReusedButton
                      onClick={() => {
                        setShowPassword(false);
                        setCurrentStep(4);
                      }}
                      type="button"
                      text="Next"
                    />
                  </div>
                </div>
              </form>
            ) : currentStep === 4 ? (
              <form className="xs:p-10 p-5">
                <div className="flex flex-col max-w-[20rem] xs:max-w-full mx-auto">
                  <h1 className="font-bold text-4xl leading-[2.7rem] mb-3">
                    And Confirm
                  </h1>
                  <h2 className="font-semibold mb-7 text-sm">
                    Confirm your Passcode
                  </h2>
                  <div className="relative w-full">
                    <ReusedTextField
                      type={showPassword ? "text" : "password"}
                      className="w-full"
                      label="Confirm your Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      variant="filled"
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute cursor-pointer top-0 right-0 mt-5 mr-5"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </div>
                  </div>
                  <div className="mt-4">
                    <ReusedButton
                      onClick={() => {
                        createUserWithPassword();
                      }}
                      text="Next"
                      type="button"
                    />
                  </div>
                  <div className="flex mb-5 mt-16 justify-center gap-2">
                    <div className="text-sm">
                      Can't remember your password?{" "}
                    </div>
                    <div
                      onClick={() => {
                        setCurrentStep(3);
                      }}
                      className="text-sm cursor-pointer text-[#89CFF0] font-semibold"
                    >
                      Go back
                    </div>
                  </div>
                </div>
              </form>
            ) : currentStep === 5 ? (
              <form className="xs:p-10 p-5">
                <Steppers step={2} />
                <h1 className="font-bold text-4xl w-[15rem] mt-5 leading-[2.7rem] mb-3">
                  We need to authenticate your identity.
                </h1>
                <h2 className="font-semibold mb-7 text-[0.9rem]">
                  Which document would you like to use to verify your identity?
                </h2>
                <RadioGroup
                  defaultValue="female"
                  aria-labelledby="demo-customized-radios"
                  name="customized-radios"
                  onChange={(e) => {
                    setIdentity(e.target.value);
                  }}
                >
                  {labels.map((label, index) => (
                    <FormControlLabel
                      key={index}
                      defaultChecked={index === 0}
                      value={label.value}
                      control={<BpRadio />}
                      label={label.label}
                    />
                  ))}
                </RadioGroup>
                <div className="my-2">
                  <ReusedButton
                    text="Next"
                    onClick={() => {
                      if (!identity) {
                        setSecondsPassed(0);
                        setError("Please enter your identity type");
                      } else {
                        setError(null);
                        setCurrentStep(6);
                      }
                    }}
                    type="button"
                  />
                </div>
              </form>
            ) : currentStep === 6 ? (
              <div className="xs:p-10 p-5">
                <Steppers step={3} />
                <h1 className="font-bold text-4xl mt-10 w-[16rem] leading-[2.7rem] mb-3">
                  Take a photo of your{" "}
                  {labels.find((label) => label.value === identity)?.label}.
                </h1>
                <h2 className="font-semibold mb-5 max-w-[20rem] text-sm">
                  Make sure your name, all numbers and photo are clear and
                  visible
                </h2>
                <div className="mb-10">
                  <ReusedButton
                    text="Let's go"
                    onClick={() => {
                      setCurrentStep(7);
                      openCamera();
                    }}
                    type="button"
                  />
                </div>
              </div>
            ) : currentStep === 7 ? (
              <div className="xs:p-10 p-5 flex flex-col items-center">
                <div className="relative mt-14 mb-32">
                  <video autoPlay ref={videEl} width="300" className="mb-7" />
                  <div className="absolute bottom-3 -left-4 border-l-4 border-b-4 w-12 h-12 border-[#89CFF0]"></div>
                  <div className="absolute -top-4 rotate-90 -left-4 border-l-4 border-b-4 w-12 h-12 border-[#89CFF0]"></div>
                  <div className="absolute -top-4 rotate-180 -right-4 border-l-4 border-b-4 w-12 h-12 border-[#89CFF0]"></div>
                  <div className="absolute bottom-3 -rotate-90 -right-4 border-l-4 border-b-4 w-12 h-12 border-[#89CFF0]"></div>
                </div>

                <IconButton
                  onClick={(e) => {
                    setIdImage(takePicture());
                    closeCamera();
                    setCurrentStep(8);
                  }}
                  style={{
                    background: "#89CFF0",
                    color: "white",
                    padding: 10,
                  }}
                >
                  <CameraAltOutlined />
                </IconButton>
              </div>
            ) : currentStep === 8 ? (
              <div className="xs:p-10 p-5">
                <Steppers step={3} />
                <h1 className="font-semibold my-5 max-w-[20rem] text-sm">
                  Upload your document
                </h1>
                <div className="border-2 border-gray-400 rounded-md my-5 p-10">
                  <img src={idImage!} />
                </div>
                <div
                  onClick={() => {
                    openCamera();
                    setCurrentStep(7);
                    setIdImage(null);
                  }}
                  className="flex  my-6 cursor-pointer justify-center font-bold text-[#89CFF0] items-start"
                >
                  <DeleteOutlineOutlined />
                  <span>Delete and upload another image</span>
                </div>
                <ReusedButton
                  onClick={async () => {
                    const uploaded = await uploadImage(
                      "identity",
                      idImage as string
                    );
                    if (uploaded) {
                      setCurrentStep(9);
                      navigate("/signup?step=4");
                    } else {
                      return;
                    }
                  }}
                  text="Upload my document"
                  type="button"
                />
              </div>
            ) : currentStep === 9 ? (
              <div className="xs:p-10 mt-2 p-5">
                <Steppers step={4} />
                <h1 className="font-bold text-4xl w-[15rem] leading-[2.7rem] my-3">
                  Upload your selfie.
                </h1>
                <h1 className="font-semibold my-5 max-w-[20rem] text-sm">
                  Please take a selfie with a thumbs up close to your face.
                </h1>
                <div className="w-full flex flex-col gap-5">
                  {thumbsData.map((data, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <IconButton
                        style={{ border: "2px solid #89CFF0" }}
                        sx={{ width: 20, height: 20 }}
                        className="w-fit"
                      >
                        <Done
                          className="text-[#89CFF0]"
                          sx={{ fontSize: 12 }}
                        />
                      </IconButton>
                      <div className="text-gray-800">{data}</div>
                    </div>
                  ))}
                </div>
                <h1 className="font-semibold my-5 max-w-[20rem] text-sm">
                  See the example below
                </h1>
                <img src={SampleSelfie} className="w-[20rem] mx-auto mb-5" />
                <ReusedButton
                  text="Let's do it"
                  type="button"
                  onClick={() => {
                    openCamera();
                    setCurrentStep(10);
                  }}
                />
              </div>
            ) : currentStep === 10 ? (
              <div className="xs:p-10 p-5 flex flex-col items-center">
                <video
                  autoPlay
                  ref={videEl}
                  width="400"
                  className="mt-5 mb-14"
                />
                <IconButton
                  onClick={async () => {
                    setSelfie(takePicture());
                    await closeCamera();
                    setCurrentStep(11);
                  }}
                  style={{
                    background: "#89CFF0",
                    color: "white",
                    padding: 10,
                    marginTop: 25,
                  }}
                >
                  <CameraAltOutlined />
                </IconButton>
              </div>
            ) : currentStep === 11 ? (
              <div className="xs:p-10 p-5 mx-auto bg-white rounded-xl w-full xs:max-w-md">
                <Steppers step={4} />
                <h1 className="font-semibold my-5 max-w-[20rem] text-sm">
                  Upload your document
                </h1>
                <div className="border-2 border-gray-400 rounded-md my-5 p-10">
                  <img src={selfie!} className="object-cover object-top " />
                </div>
                <div
                  onClick={() => {
                    setSelfie(null);
                    openCamera();
                    setCurrentStep(10);
                  }}
                  className="flex my-6 cursor-pointer justify-center font-bold text-[#89CFF0] items-start"
                >
                  <DeleteOutlineOutlined />
                  <span>Delete and upload another image</span>
                </div>
                <ReusedButton
                  onClick={async () => {
                    const uploaded = await uploadImage(
                      "selfie",
                      selfie as string
                    );
                    if (uploaded) {
                      navigate("/signup?step=5");
                      setCurrentStep(12);
                    } else return;
                  }}
                  text="Upload my selfie"
                  type="button"
                />
              </div>
            ) : currentStep === 12 ? (
              <div className="xs:p-10 p-5">
                <Steppers step={5} />
                <h1 className="font-bold text-4xl  leading-[2.7rem] my-3">
                  Almost done with your verfication!
                </h1>
                <h1 className="font-semibold mt-5 mb-2 max-w-[20rem] text-sm">
                  Please complete the following personal information.
                </h1>
                <ReusedTextField
                  className="w-full"
                  label="Your fullname(s) as on your ID"
                  variant="filled"
                  value={finalValues.fullname}
                  onChange={(e) =>
                    setFinalValues({ ...finalValues, fullname: e.target.value })
                  }
                  style={{ margin: "10px 0" }}
                />
                <ReusedTextField
                  className="w-full"
                  label="Your surname as on your ID"
                  variant="filled"
                  value={finalValues.surname}
                  onChange={(e) => {
                    setFinalValues({
                      ...finalValues,
                      surname: e.target.value,
                    });
                  }}
                  style={{ margin: "10px 0" }}
                />
                <ReusedTextField
                  className="w-full"
                  label="Your identity number"
                  variant="filled"
                  value={finalValues.identityNumber}
                  onChange={(e) =>
                    setFinalValues({
                      ...finalValues,
                      identityNumber: e.target.value,
                    })
                  }
                  style={{ margin: "10px 0" }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="The expiry of the document"
                    inputFormat="MM/DD/YYYY"
                    className="w-full"
                    value={finalValues.expiryDate}
                    onChange={(value) =>
                      setFinalValues({ ...finalValues, expiryDate: value! })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <div className="mt-4">
                  <ReusedButton
                    text="Done"
                    onClick={() => {
                      submitFinalData();
                    }}
                    type="button"
                  />
                </div>
              </div>
            ) : (
              <div className="xs:p-10 p-5">
                <div className="w-full justify-center flex">
                  <BsFillPersonCheckFill
                    style={{ color: "#89CFF0" }}
                    size={50}
                  />
                </div>
                <h1 className="font-bold text-4xl mt-10 leading-[2.7rem] mb-2 w-[16rem]">
                  Your account is ready
                </h1>
                <h1 className="font-semibold mb-7 max-w-[20rem] text-sm">
                  Next you can add your wallets and cards
                </h1>
                <div className="mb-10">
                  <ReusedButton
                    text="Done"
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Signup;
