import { postType } from '@utils/type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  loginState: boolean;
  signupState: boolean;
  likePostState: [string?];
  detailID: string;
  detailType: string;
  sideMenu: boolean;
  setSideMenu: () => void;
  setDetailType: (type: string) => void;
  setDetailID: (id: string) => void;
  changeLikeState: (list: [string]) => void;
  changeLoginState: () => void;
  changeSignUpState: () => void;
  switchLoginSignUp: () => void;
  filterdData: [postType?];
  setFilterdData: (data: [postType?]) => void;
  clearState: () => void;
}

//모달창 상태 관리 및 매물 상태관리
const useStore = create<State>(set => ({
  loginState: false,
  signupState: false,
  likePostState: [],
  detailID: '',
  detailType: '',
  filterdData: [],
  sideMenu: false,
  setSideMenu: () => set(state => ({ sideMenu: !state.sideMenu })),
  setFilterdData: (data: [postType?]) => set(state => ({ filterdData: data })),
  setDetailType: (type: string) => set(state => ({ detailType: type })),
  setDetailID: (id: string) => set(state => ({ detailID: id })),
  changeLikeState: list => set(state => ({ likePostState: list })),
  changeLoginState: () => set(state => ({ loginState: !state.loginState })),
  changeSignUpState: () => set(state => ({ signupState: !state.signupState })),
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
      filterdData: [],
      sideMenu: false,
    })),
}));

export default useStore;
