import { FC } from "react";

const Steppers: FC<{ step: number }> = ({ step }) => {
  let num = 5;
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="text-gray-500 text-sm">
        Step {step} of {num}
      </div>
      <div className="w-full bg-gray-300 h-1">
        <div
          className="bg-[#89CFF0] h-1"
          style={{ width: `${(step / num) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Steppers;
