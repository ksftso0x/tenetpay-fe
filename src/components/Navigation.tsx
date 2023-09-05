import {
  AccountBalanceWalletOutlined,
  AccountCircle,
  CreditCardOutlined,
  HomeOutlined,
  MoreVertOutlined,
  PaymentsOutlined,
  Settings,
} from "@mui/icons-material";
import { Popover } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useHref, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { responsive, User } from "../data/atom";
import Logo from "../data/logo";
import api from "../lib/axios";
import { getUserHome } from "../services/user.service";

const Navigation = () => {
  const setResponsive = useSetRecoilState(responsive);
  const [user, setUser] = useRecoilState(User);
  const { data, isError, isLoading }: any = useQuery("user", getUserHome, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  let runf = false;
  const check = async () => {
    try {
     const data =  await api.get("/v1/users/signup/analyze-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
    } catch (error) {
      
      // localStorage.setItem()
    }
  };
  useEffect(() => {
    if (runf === false) {
      runf = true;
      setUser(data);
    }
    if (isError) {
      navigate("/login");
    }
    if (data) {
      if (data?.completedSteps < 6) {
        navigate("/signup?step=" + data?.completedSteps);
      } else if (data?.completedSteps === 6) {
        check();
      }
    }
  }, [data, isError]);
  const [run, setRun] = useState(false);
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
  const href = useHref("", { relative: undefined });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return !isLoading && data && !data.step ? (
    <div className="fixed z-50 bottom-0 h-fit sm:top-0 py-5 text-gray-700 text-sm shadow  sm:px-24 px-2 items-center  bg-white w-full  justify-between flex">
      <Logo />
      <div className="flex items-center sm:justify-start justify-between sm:w-auto w-full sm:px-0 px-5 sm:gap-12 ">
        <Link
          to="/"
          className={`${
            href === "/" && "text-[#1d83b3] font-semibold"
          } hover:text-[#1d83b3] font-medium flex items-center flex-col`}
        >
          <HomeOutlined sx={{ fontSize: 25 }} />
          <div className="sm:text-base text-sm">Home</div>
        </Link>
        <Link
          to="/wallet"
          className={`${
            href === "/wallet" && "text-[#1d83b3] font-semibold"
          } hover:text-[#1d83b3] font-medium flex items-center flex-col`}
        >
          <AccountBalanceWalletOutlined />
          <div className="sm:text-base text-sm">My Wallet</div>
        </Link>
        <Link
          to="/cards"
          className={`${
            href === "/cards" && "text-[#1d83b3] font-semibold"
          } hover:text-[#1d83b3] font-medium flex items-center flex-col`}
        >
          <CreditCardOutlined />
          <div className="sm:text-base text-sm">My Cards</div>
        </Link>
        <Link
          to="/transact"
          className={`${
            href === "/transact" && "text-[#1d83b3] font-semibold"
          }   hover:text-[#1d83b3] font-medium flex items-center flex-col`}
        >
          <PaymentsOutlined />
          <div className="sm:text-base text-sm">Transact</div>
        </Link>
        <div className="hover:text-[#1d83b3]  font-medium">
          <div
            className="flex cursor-pointer flex-col items-center"
            onClick={handleClick}
          >
            <MoreVertOutlined />
            <div className="sm:text-base text-sm">More</div>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            className="p-5"
          >
            <Link
              to="/profile"
              className="flex hover:bg-[#1d83b3] hover:text-white p-2 items-center gap-2"
            >
              <AccountCircle />
              <div className=" whitespace-nowrap text-lg font-medium">
                {user?.fullname}
              </div>
            </Link>
            <Link
              to="/settings"
              className="flex font-medium hover:text-white cursor-pointer hover:bg-[#1d83b3] ho gap-1 p-2  items-center"
            >
              <Settings />
              <div>Settings</div>
            </Link>
            <div
              onClick={logout}
              className="p-2 hover:bg-[#1d83b3] font-medium cursor-pointer hover:text-white"
            >
              <div>Logout</div>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Navigation;
