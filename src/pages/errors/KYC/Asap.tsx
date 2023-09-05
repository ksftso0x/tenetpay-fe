import { MdManageAccounts } from "react-icons/md";
import { useRecoilValue } from "recoil";
import Footer from "../../../components/Footer";
import Navigation from "../../../components/Navigation";
import { responsive } from "../../../data/atom";
import ReusedButton from "../../../utils/ReusedButton";

const WeNeedToChat = () => {
  const responsived = useRecoilValue(responsive);
  return (
    <div>
      <Navigation />
      <div className="min-h-screen xs:py-[5rem]  xs:pt-[9rem]  pb-[7rem] xs:bg-[#fbf8f8] overflow-x-hidden flex flex-col xs:justify-center ">
        <div
          style={
            responsived ? {} : { boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }
          }
          className="mx-auto bg-white w-full xs:rounded-xl xs:max-w-md"
        >
          <div className="shadow w-full h-[5rem]"></div>
          <div className="flex p-5 items-center gap-20 flex-col">
            <div className="flex flex-col gap-3 items-center">
              <MdManageAccounts size={70} color="#bd12b7" />
              <div className="font-bold max-w-[13rem] text-center text-lg">
                We need to chat!
              </div>
              <div className="flex flex-col gap-4 items-center">
                <div className="text-sm font-medium text-[#185069]">
                  We've had a problem verifying your identity and would like to
                  do it though our support agents.
                </div>
              </div>
            </div>
            <div className="flex w-full gap-4 flex-col">
              <ReusedButton text="Contact support" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default WeNeedToChat;
