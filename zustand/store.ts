import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  loginState: boolean;
  signupState: boolean;
  detailState: boolean;
  detailID: string;
  detailType: string;
  setDetailType: (type: string) => void;
  setDetailID: (id: string) => void;
  changeDetailState: () => void;
  changeLoginState: () => void;
  changeSignUpState: () => void;
  switchLoginSignUp: () => void;
}

//모달창 상태 관리 및 매물 상태관리
const useStore = create<State>(set => ({
  loginState: false,
  signupState: false,
  detailState: false,
  detailID: '',
  detailType: '',
  setDetailType: (type: string) => set(state => ({ detailType: type })),
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
