import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  modalState: boolean;
  changeModalState: () => void;
}

const useStore = create<State>((set) => ({
  modalState: false,
  changeModalState: () => set((state) => ({ modalState: !state.modalState })),
}));

export default useStore;
