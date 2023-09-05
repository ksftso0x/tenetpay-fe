import { Check, ChevronLeft } from "@mui/icons-material";
import { useRecoilValue } from "recoil";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { responsive, User } from "../data/atom";
import SampleId from "../assets/sample_id.jpg";
import SampleSelfie from "../assets/sample_selfie.jpg";
import { useQuery } from "react-query";
import { getProfileData } from "../services/user.service";
import { useContext } from "react";
import { CircularProgress } from "@mui/material";
import { BsCheckCircleFill } from "react-icons/bs";

const Profile = () => {
  const responsived = useRecoilValue(responsive);
  interface IUserData {
    [key: string]: string | string[];
  }
  const user = useRecoilValue(User);
  const { data }: any = useQuery("profileData", getProfileData, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

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
          <div className="flex flex-col">
            <div
              // onClick={() => {
              //   if (currentStep === 1) navigate("/wallet/withdraw");
              //   else setCurrentStep((step) => step - 1);
              // }}
              className="flex pt-3 pl-2 cursor-pointer items-center"
            >
              <ChevronLeft />
              <div className="font-medium">Profile</div>
            </div>
            <div className="flex p-5 flex-col">
              <div className="font-bold text-lg">
                Hi {user?.fullname} <br />
                here's your personal details
              </div>
              <div className="my-5 font-semibold">
                Your identity verification status
              </div>
              <div className="mb-5 gap-2 flex items-center">
                <BsCheckCircleFill size={20} color="#89CFF0" />
                <div>KYC completed</div>
              </div>
              <div className="mb-3 font-bold ">Your personal details</div>
              {!data ? (
                <CircularProgress />
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    {data.gender && (
                      <div className="flex flex-col">
                        <div className="text-gray-600">Title</div>
                        <div>{data.gender}</div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <div className="text-gray-600">Firstname</div>
                      <div>
                        {data.fullname
                          .split(" ")
                          .slice(0, data.fullname.split(" ").length - 1)
                          .join(" ")}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <div className="text-gray-600">Lastname</div>
                        <div>{data.surname}</div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-gray-600">Contact Number</div>
                      <div>{data.phoneNumber}</div>
                    </div>
                    {data.email && (
                      <div className="flex flex-col">
                        <div className="text-gray-600">Email address</div>
                        <div>{data.email}</div>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className="text-gray-600">ID/Passport number</div>
                      <div>{data.identityNumber}</div>
                    </div>
                    {data.address && (
                      <div className="flex flex-col gap-2">{/* address */}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-5">
                    <img
                      src={data!.identity.picture}
                      alt="id"
                      className="h-[10rem] border-2 border-gray-400 py-5 px-3"
                    />
                    <img
                      src={data!.selfie}
                      alt="selfie"
                      className="h-[10rem] border-2 border-gray-400 py-5 px-3"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Profile;
