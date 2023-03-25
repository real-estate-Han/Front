import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  loginState: boolean;
  signupState: boolean;
  changeLoginState: () => void;
  changeSignUpState: () => void;
  switchLoginSignUp: () => void;
}

const useStore = create<State>((set) => ({
  loginState: false,
  signupState: false,
  changeLoginState: () => set((state) => ({ loginState: !state.loginState })),
  changeSignUpState: () => set((state) => ({ signupState: !state.signupState })),
  switchLoginSignUp: () => set((state) => ({ loginState: !state.loginState, signupState: !state.signupState })),
}));

export default useStore;
