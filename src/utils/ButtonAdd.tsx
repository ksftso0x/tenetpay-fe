import { Add, AddCircleOutlineOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import type { FC } from "react";

const ButtonAdd: FC<{
  text: string | Element;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ text, onClick }) => {
  return (
    <Button
      style={{
        border: "0.2px  dotted #89CFF0",
        color: "#89CFF0",
        padding: "10px 0",
        textTransform: "none",
      }}
      onClick={onClick}
      className="w-full"
      variant="outlined"
    >
      <div
        className={`flex items-center min-w-[13rem] ${
          text === "Add a Wallet" ? "gap-5" : "gap-2"
        }`}
      >
        <AddCircleOutlineOutlined />
        <div>{text as string}</div>
      </div>
    </Button>
  );
};
export default ButtonAdd;
