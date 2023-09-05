import { Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { responsive } from "../data/atom";
const ReusedButton: FC<{
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ text, type = "button", onClick }) => {
  const setResponsive = useSetRecoilState(responsive);
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
  return (
    <Button
      onClick={onClick}
      type={"button"}
      style={{
        background: "#89CFF0",
        color: "white",
        textTransform: "none",
        fontSize: 15,
      }}
      className="w-full h-[3.5rem]"
    >
      {text}
    </Button>
  );
};

export default ReusedButton;
