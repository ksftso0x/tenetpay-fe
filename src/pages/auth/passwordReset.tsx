import { ChevronLeft, Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import OtpField from "react-otp-field";
import { useRecoilState } from "recoil";
import { responsive } from "../../data/atom";
import ReusedTextField from "../../utils/RedditText";
import ReusedButton from "../../utils/ReusedButton";
import { BsShieldFillCheck, BsShieldLockFill } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { RedditTextField } from "./Signup";
import api from "../../lib/axios";
import { Alert, LinearProgress } from "@mui/material";
import Shake from "react-reveal/Shake";
import { Link, useNavigate } from "react-router-dom";

const Reset = () => {
  const [otp, setOtp] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    if (otp.length === 4) {
      submitOtp();
    }
  }, [otp]);
  useEffect(() => {
    setOtp("");
  }, []);
  const submitOtp = async () => {
    try {
      setLoading(true);
      const response = await api.post(
        "v1/users/reset-password/verify-phone-number",
        {
          code: otp,
          phoneNumber,
        }
      );
      localStorage.setItem("token", response.data.data.token);
      setCurrentStep(2);
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const [responsived, setResponsive] = useRecoilState(responsive);
  const [run, setRun] = useState(false);
  const [error, setError] = useState<any>(null);
  const [spier, setSpier] = useState(false);
  const [secondsPassed, setSecondsPassed] = useState(0);
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
    if (secondsPassed === 4) {
      setError(null);
      setNotification(null);
    } else if (secondsPassed === 0) {
      setTimeout(() => {
        setSpier(!spier);
      }, 5);
    }
  }, [secondsPassed]);
  const change = () => {
    if (window.innerWidth < 600) {
      setResponsive(true);
    } else {
      setResponsive(false);
    }
  };

  useEffect(() => {
    if (!run) change();
    setRun(true);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", change);
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const sendCode = async () => {
    try {
      setLoading(true);
      if (phoneNumber.length < 8) {
        setSecondsPassed(0);
        setError("Enter valid phone number");
        return;
      }
      const response = await api.post("/v1/users/reset-password", {
        phoneNumber,
        code: otp,
      });
      setCurrentStep(1);
    } catch (error: any) {
      setSecondsPassed(0);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const [notification, setNotification] = useState<any>(null);
  useEffect(() => {
    if (error || notification) {
      setSecondsPassed(0);
      setSpier(!spier);
      const interval = setInterval(() => {
        setSecondsPassed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [error, notification]);
  useEffect(() => {
    if (secondsPassed === 4) {
      setError(null);
    } else if (secondsPassed === 0) {
      setTimeout(() => {
        setSpier(!spier);
      }, 5);
    }
  }, [secondsPassed]);
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const resend = async () => {
    try {
      await api.put("/v1/users/resend/reset-otp", {
        phoneNumber,
      });
      setSecondsPassed(0);
      setNotification("Code was resent to your phone number");
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const submitNewPassword = async () => {
    if (values.newPassword !== values.confirmPassword) {
      setError("Confirm your Password");
      return;
    }
    try {
      setLoading(true);
      await api.put(
        "/v1/users/reset-passwrod/update",
        {
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCurrentStep(4);
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col xs:justify-center xs:py-12">
      {currentStep !== 4 && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto bg-white relative rounded-xl w-full xs:max-w-md"
          style={
            responsived ? {} : { boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }
          }
        >
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
          <div className="xs:p-10 p-5">
            {currentStep === 0 ? (
              <div className="flex flex-col items-center py-7">
                <h2 className="font-semibold mb-7">Reset your password</h2>
                <h2 className="font-semibold">Tell us your phone number</h2>
                <RedditTextField
                  label="What is your mobile number"
                  variant="filled"
                  className="w-full"
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(
                      (value as unknown as string).split(" ").join("")
                    );
                  }}
                  style={{ margin: "30px 0" }}
                />
                <ReusedButton text="Send code" onClick={sendCode} />
                <div className="flex my-5 justify-center gap-2">
                  <div className="text-sm">Still remember your password</div>
                  <Link
                    to="/login"
                    className="text-sm text-[#89CFF0] font-semibold"
                  >
                    Login here
                  </Link>
                </div>
                <div className="flex justify-center gap-2">
                  <div className="text-sm">Is your account not set up yet?</div>
                  <Link
                    to="/signup"
                    className="text-sm text-[#89CFF0] font-semibold"
                  >
                    Register here
                  </Link>
                </div>
              </div>
            ) : currentStep === 1 ? (
              <>
                <div className="flex flex-col items-center py-7">
                  <h2 className="font-semibold mb-7">Reset your password</h2>
                  <BsShieldLockFill color="#89CFF0" size={54} />
                  <h2 className="font-semibold mt-14 text-sm">
                    Please enter the OTP sent to your via SMS to +27****354
                  </h2>
                  <OtpField
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    onChangeRegex={/^([0-9]{0,})$/}
                    autoFocus
                    isTypeNumber
                    classNames="flex mt-5 items-center w-full justify-between"
                    inputProps={{
                      className:
                        "otp-field__input w-[4rem] xs:w-[4rem] text-center font-bold xs:p-4 p-4  outline-none border-[1.7px] rounded border-gray-400",
                      disabled: false,
                      type: "text",
                    }}
                  />
                </div>
                <div className="flex justify-center gap-2">
                  <div className="text-sm">Didn't recieve the SMS?</div>
                  <div
                    onClick={resend}
                    className="text-[#89CFF0] cursor-pointer text-sm font-semibold"
                  >
                    Resend Code
                  </div>
                </div>
              </>
            ) : currentStep === 2 ? (
              <div className="flex flex-col items-center py-7">
                <h2 className="font-semibold mb-7 w-[13rem]">
                  Verification successfull. Set your new password
                </h2>
                <MdPassword color="#89CFF0" size={54} />
                <div className="mt-7 relative w-full">
                  <ReusedTextField
                    //   label="What is your mobile number"
                    variant="filled"
                    label="Create your Password"
                    className="w-full"
                    value={values.newPassword}
                    onChange={(e) => {
                      setValues({ ...values, newPassword: e.target.value });
                    }}
                    type={showPassword ? "text" : "password"}
                    style={{ margin: "10px 0" }}
                  />
                  <div
                    className="absolute cursor-pointer top-0 right-0 mt-8 mr-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </div>
                </div>
                <div className="mb-5 mt-1 w-full">
                  <ReusedButton
                    type="button"
                    onClick={() => {
                      setCurrentStep(3);
                      setShowPassword(false);
                    }}
                    text="Next"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-7">
                <h2 className="font-semibold mb-7 w-[13rem]">
                  Confirm your password
                </h2>
                <MdPassword color="#89CFF0" size={54} />
                <div className="mt-7 relative w-full">
                  <ReusedTextField
                    //   label="What is your mobile number"
                    variant="filled"
                    label="Confirm your Password"
                    className="w-full"
                    value={values.confirmPassword}
                    onChange={(e) => {
                      setValues({ ...values, confirmPassword: e.target.value });
                    }}
                    type={showPassword ? "text" : "password"}
                    style={{ margin: "10px 0" }}
                  />
                  <div
                    className="absolute cursor-pointer top-0 right-0 mt-8 mr-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </div>
                </div>
                <div className="mb-5 mt-1 w-full">
                  <ReusedButton
                    type="button"
                    onClick={() => {
                      submitNewPassword();
                    }}
                    text="Next"
                  />
                </div>
                <div className="flex my-5 justify-center gap-2">
                  <div className="text-sm">Can't remember your passowrd?</div>
                  <div
                    onClick={() => {
                      setCurrentStep(2);
                    }}
                    className="text-sm cursor-pointer text-[#89CFF0] font-semibold"
                  >
                    Go back
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      )}
      {currentStep === 4 && (
        <form
          className="mx-auto bg-white rounded-xl w-full xs:max-w-md"
          style={
            responsived ? {} : { boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }
          }
        >
          <div className="shadow w-full h-[5rem]"></div>
          <div className="flex xs:p-10 p-5 flex-col items-center py-7">
            <BsShieldFillCheck color="#89CFF0" size={54} />
            <h2 className="font-semibold text-center my-7 w-[14rem]">
              Your new password was set successfully.
            </h2>
            <div className="mb-5 w-full">
              <ReusedButton
                type="button"
                onClick={() => {
                  navigate("/");
                  // setCurrentStep(4);
                }}
                text="Done"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
export default Reset;
