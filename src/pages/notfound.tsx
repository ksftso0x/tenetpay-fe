import { useRecoilValue } from "recoil";
import { responsive } from "../data/atom";

const NotFound = () => {
  const responsived = useRecoilValue(responsive);
  return (
    <div>
      <div className="min-h-screen xs:py-[5rem]  xs:pt-[9rem]  pb-[7rem] xs:bg-[#fbf8f8] overflow-x-hidden flex flex-col xs:justify-center ">
        <form
          style={
            responsived ? {} : { boxShadow: "rgba(0, 0, 0, 0.10) 2px 2px 13px" }
          }
          className="mx-auto  bg-white w-full xs:rounded-xl xs:max-w-md"
        >
          <div className="shadow w-full h-[5rem]"></div>
          <div className="min-h-[20rem] flex items-center justify-center font-bold text-7xl">
            <div>This page is not found</div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NotFound;
