import { atom, RecoilState } from "recoil";

export const responsive: RecoilState<boolean> = atom({
  key: "responsive",
  default: false,
});

export const User: RecoilState<any> = atom({
  key: "user",
  default: null,
});
