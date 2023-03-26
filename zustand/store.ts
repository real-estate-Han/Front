import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  loginState: boolean;
  signupState: boolean;
  detailState: boolean;
  detailID: string;
  setDetailID: (id: string) => void;
  changeDetailState: () => void;
  changeLoginState: () => void;
  changeSignUpState: () => void;
  switchLoginSignUp: () => void;
}

const useStore = create<State>(set => ({
  loginState: false,
  signupState: false,
  detailState: false,
  detailID: "",
  setDetailID: (id: string) => set(state => ({ detailID: id })),
  changeDetailState: () => set(state => ({ detailState: !state.detailState })),
  changeLoginState: () => set(state => ({ loginState: !state.loginState })),
  changeSignUpState: () => set(state => ({ signupState: !state.signupState })),
  switchLoginSignUp: () =>
    set(state => ({
      loginState: !state.loginState,
      signupState: !state.signupState,
    })),
}));

export default useStore;
