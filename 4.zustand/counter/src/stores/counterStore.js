import { create } from "zustand";

const useCounterStore = create((set) => ({
  number: 0,
  value: 1,
  increment: () => set((state) => ({ number: state.number + state.value })),
  decrement: () => set((state) => ({ number: state.number - state.value })),
  setValue: (val) => set(() => ({ value: val })),
  reset: () => set({ number: 0, value: 1 }),
}));
export default useCounterStore;
