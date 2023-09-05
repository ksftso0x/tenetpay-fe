import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { responsive } from "../../data/atom";
import ReusedTextField from "../../utils/RedditText";
import ReusedButton from "../../utils/ReusedButton";
import api from "../../lib/axios";
import { useState } from "react";
import { RedditTextField } from "./Signup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, LinearProgress } from "@mui/material";
import Shake from "react-reveal/Shake";
import { useEffect } from "react";
const Login = () => {
  const responsived = useRecoilValue(responsive);
  const [values, setValues] = useState({
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState<any>(null);
  const [spier, setSpier] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secondsPassed, setSecondsPassed] = useState(0);
  const login = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (values.phoneNumber.length < 10) {
        setSecondsPassed(0);
        setError("Enter valid phone number");
        return;
      }
      const response = await api.post("/v1/users/login", values);
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error: any) {
      setSecondsPassed(0);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
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
    } else if (secondsPassed === 0) {
      setTimeout(() => {
        setSpier(!spier);
      }, 5);
    }
  }, [secondsPassed]);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex flex-col xs:justify-center xs:py-12">
      <form
        style={
          responsived ? {} : { boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }
        }
        onSubmit={login}
        className="mx-auto bg-white relative rounded-xl w-full xs:max-w-md"
      >
        {loading && (
          <div className="absolute w-full h-full z-50 bg-[#0000ff54] flex flex-col justify-between">
            <LinearProgress />
            <LinearProgress />
          </div>
        )}
        <div className="shadow w-full h-[5rem]"></div>
        <div className="xs:p-10 p-5">
          <h1 className="font-bold w-32 leading-10 text-3xl mb-3">
            Welcome Back!
          </h1>
          <h2 className="font-semibold mb-4 text-sm">
            Sign in with your username and password
          </h2>
          {error && (
            <div className="max-w-[30rem] mt-5 mx-auto">
              <Shake spy={spier}>
                <Alert severity="error">{error}</Alert>
              </Shake>
            </div>
          )}

          <RedditTextField
            //   label="What is your mobile number"
            variant="filled"
            label="Phone number"
            className="w-full"
            value={values.phoneNumber}
            onChange={(value) =>
              setValues({
                ...values,
                phoneNumber: (value as unknown as string).split(" ").join(""),
              })
            }
            style={{ margin: "10px 0" }}
          />
          <div className="w-full relative">
            <ReusedTextField
              variant="filled"
              label="Password"
              onChange={(e) => {
                setValues({ ...values, password: e.target.value });
              }}
              type={showPassword ? "text" : "password"}
              className="w-full"
              style={{ margin: "10px 0" }}
            />
            <div
              className="absolute cursor-pointer top-0 right-0 mt-8 mr-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>
          <div className="my-1">
            <ReusedButton text="Next" type="submit" onClick={login} />
          </div>
          <div className="flex my-5 justify-center gap-2">
            <div className="text-sm">Forgot your username or password? </div>
            <Link to="/reset" className="text-sm text-[#89CFF0] font-semibold">
              Reset it here
            </Link>
          </div>
          <div className="flex justify-center gap-2">
            <div className="text-sm">Is your account not set up yet?</div>
            <Link to="/signup" className="text-sm text-[#89CFF0] font-semibold">
              Register here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
