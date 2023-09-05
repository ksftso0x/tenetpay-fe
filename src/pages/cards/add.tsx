import { AccountBalanceWalletOutlined, ChevronLeft } from "@mui/icons-material";
import { forwardRef, JSXElementConstructor, Ref, useState } from "react";
import { useRecoilValue } from "recoil";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { responsive } from "../../data/atom";
import ReusedButton from "../../utils/ReusedButton";
import BlankCard from "../../assets/blank_card.jpg";
import validCard from "../../assets/valid_card.jpg";
import ReusedTextField from "../../utils/RedditText";
import { InputAdornment, TextField } from "@mui/material";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IMaskInput } from "react-imask";
import { ReactElement } from "react-imask/dist/mixin";
import { MdFactCheck } from "react-icons/md";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const DateOfBirthCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00-00-0000"
        inputRef={ref as any}
        onAccept={(value: any) => {
          return onChange({ target: { name: props.name, value } });
        }}
        overwrite
      />
    );
  }
);

export const CardNumberCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0000-0000-0000"
        inputRef={ref as any}
        onAccept={(value: any) => {
          return onChange({ target: { name: props.name, value } });
        }}
        overwrite
      />
    );
  }
);

export const CVVCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0000"
        inputRef={ref as any}
        onAccept={(value: any) => {
          return onChange({ target: { name: props.name, value } });
        }}
        overwrite
      />
    );
  }
);
export const CardWalletNumber = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000000000000"
        inputRef={ref as any}
        onAccept={(value: any) => {
          return onChange({ target: { name: props.name, value } });
        }}
        overwrite
      />
    );
  }
);

export const ThruCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00/00"
        inputRef={ref as any}
        onAccept={(value: any) => {
          return onChange({ target: { name: props.name, value } });
        }}
        overwrite
      />
    );
  }
);

const AddCard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const responsived = useRecoilValue(responsive);
  const [values, setValues] = useState({
    card_number: "",
    cvv: "",
    thru: "",
    walletN: "",
  });
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
          {currentStep !== 1 && (
            <div
              onClick={() => {
                setCurrentStep((step) => step - 1);
              }}
              className="flex pt-3 pl-2 cursor-pointer items-center"
            >
              <ChevronLeft />
              <div>Link a bank card</div>
            </div>
          )}
          {currentStep === 1 ? (
            <div className="flex py-20 px-5 flex-col gap-5 items-center">
              <AccountBalanceWalletOutlined
                style={{ color: "#89CFF0" }}
                sx={{ fontSize: 50 }}
              />
              <h1 className="font-bold text-lg max-w-[17rem] text-center mt-3">
                You don't have a linked bank card yet.
              </h1>
              <h2 className="font-semibold text-center">
                Secure link your Mastercard or Visa bank card to top-up your
                wallet instantly.
              </h2>
              <div className="mt-10 w-full">
                <ReusedButton
                  type="button"
                  text="Link my bank card"
                  onClick={() => {
                    setCurrentStep(2);
                  }}
                />
              </div>
            </div>
          ) : currentStep === 2 ? (
            <div className="p-5">
              <img className="w-[17rem] my-4 mx-auto" src={BlankCard} />
              <h2 className="my-5 text-center font-semibold">
                Add your card details
              </h2>
              <ReusedTextField
                variant="filled"
                value={values.card_number}
                label="Card number"
                onChange={(e) => {
                  setValues({ ...values, card_number: e.target.value });
                }}
                className="w-full"
                InputProps={{
                  inputComponent: CardNumberCustom as any,
                }}
              />
              <div className="mt-32 mb-5">
                <ReusedButton
                  onClick={() => setCurrentStep(3)}
                  text="Link my bank card"
                />
              </div>
            </div>
          ) : currentStep === 3 ? (
            <div className="p-5">
              <img
                className="w-[20rem] rounded-xl my-4 mx-auto"
                src={validCard}
              />
              <div className="flex gap-5 flex-col">
                <h2 className="font-semibold text-center">
                  Add your card details
                </h2>
                <ReusedTextField
                  variant="filled"
                  id="outlined-required"
                  className="w-full"
                  label="1235644325434"
                  onChange={(e) => {
                    setValues({ ...values, walletN: e.target.value });
                  }}
                  value={values.walletN}
                  InputProps={{
                    inputComponent: CardWalletNumber as any,
                    endAdornment: (
                      <InputAdornment position="end">
                        <BsFillCheckCircleFill
                          size={20}
                          style={{ color: "#89CFF0" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                <ReusedTextField
                  variant="filled"
                  id="outlined-required"
                  className="w-full"
                  label="Name on card"
                />
                <div className="flex gap-2">
                  <ReusedTextField
                    variant="filled"
                    id="outlined-required"
                    className="w-full"
                    label="Valid Thru (MMYY)"
                    value={values.thru}
                    onChange={(e) => {
                      setValues({ ...values, thru: e.target.value });
                    }}
                    InputProps={{
                      inputComponent: ThruCustom as any,
                    }}
                  />
                  <ReusedTextField
                    variant="filled"
                    id="outlined-required"
                    className="w-full"
                    value={values.cvv}
                    onChange={(e) => {
                      setValues({ ...values, cvv: e.target.value });
                    }}
                    InputProps={{
                      inputComponent: CVVCustom as any,
                    }}
                    label="CVV"
                  />
                </div>
                <ReusedTextField
                  variant="filled"
                  id="outlined-required"
                  className="w-full"
                  label="Give this card a name"
                />
                <ReusedButton
                  onClick={() => setCurrentStep(4)}
                  text="Link my bank card"
                />
              </div>
            </div>
          ) : (
            <div className="flex py-20 px-5 flex-col gap-5 items-center">
              <MdFactCheck style={{ color: "#89CFF0" }} size={50} />
              <h1 className="font-bold text-lg max-w-[17rem] text-center mt-3">
                Your card is now securly linked and ready to use
              </h1>

              <div className="mt-10 w-full">
                <ReusedButton
                  type="button"
                  text="Done"
                  onClick={() => {
                    setCurrentStep(2);
                  }}
                />
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default AddCard;
