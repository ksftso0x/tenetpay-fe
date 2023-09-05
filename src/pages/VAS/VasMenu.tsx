import { ChevronLeft, PaymentsOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { responsive } from "../../data/atom";
import { useLocation } from "react-router-dom";
const VasMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state as any || { from: { pathname: "/" } };
  const responsived = useRecoilValue(responsive);
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
              navigate(from.pathname);
            }}
            className="flex pt-3 pl-2 cursor-pointer items-center"
          >
            <ChevronLeft />
            <div>Buy Airtime, Data, Electricity or Water</div>
          </div>
          <div className="flex mb-10 p-5 gap-4 flex-col">
            <div className="text-center mb-3 font-bold text-lg">
              What would you like to buy?
            </div>
            <Link
              to="airtime-data"
              style={{ boxShadow: "rgba(0, 0, 0, 0.13) 2px 2px 13px" }}
              className="flex p-7 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
            >
              <PaymentsOutlined />
              <div>Get Paid with your QR code</div>
            </Link>
            <Link
              to="electricity"
              style={{ boxShadow: "rgba(0, 0, 0, 0.13) 2px 2px 13px" }}
              className="flex p-7 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
            >
              <PaymentsOutlined />
              <div>Electricity</div>
            </Link>
            <Link
              to="airtime"
              style={{ boxShadow: "rgba(0, 0, 0, 0.13) 2px 2px 13px" }}
              className="flex p-7 gap-5 rounded-md sm:min-w-[25rem]  bg-white"
            >
              <PaymentsOutlined />
              <div>Water</div>
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default VasMenu;
