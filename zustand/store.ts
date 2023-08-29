import { postType } from '@utils/type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  isLogin: boolean;
  loginState: boolean;
  signupState: boolean;
  likePostState: string[];
  detailID: string;
  detailType: string;
  sideMenu: boolean;
  bannerState: boolean;
  setIsLogin: (data: boolean) => void;
  bannerToggle: () => void;
  setSideMenu: () => void;
  setDetailType: (type: string) => void;
  setDetailID: (id: string) => void;
  changeLikeState: (list?: string[]) => void;
  changeLoginState: (data: boolean) => void;
  changeSignUpState: (data: boolean) => void;
  switchLoginSignUp: () => void;
  clearState: () => void;
}

// 모달창 상태 관리 및 매물 상태관리
const useStore = create<State>(set => ({
  isLogin: false,
  loginState: false,
  signupState: false,
  likePostState: [],
  detailID: '',
  detailType: '',
  sideMenu: false,
  bannerState: false,
  setIsLogin: (data: boolean) => set(state => ({ isLogin: data })),
  bannerToggle: () => set(state => ({ bannerState: !state.bannerState })),
  setSideMenu: () => set(state => ({ sideMenu: !state.sideMenu })),
  setDetailType: (type: string) => set(state => ({ detailType: type })),
  setDetailID: (id: string) => set(state => ({ detailID: id })),
  changeLikeState: list => set(state => ({ likePostState: list })),
  changeLoginState: (data: boolean) => set(state => ({ loginState: data })),
  changeSignUpState: (data: boolean) => set(state => ({ signupState: data })),
  switchLoginSignUp: () =>
    set(state => ({
      loginState: !state.loginState,
      signupState: !state.signupState,
    })),
  clearState: () =>
    set(state => ({
      loginState: false,
      signupState: false,
      likePostState: [],
      detailID: '',
      detailType: '',
      sideMenu: false,
    })),
}));

export default useStore;
