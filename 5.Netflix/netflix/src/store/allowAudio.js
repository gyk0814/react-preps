import { create } from "zustand";

const useAllowAudioStore = create((set) => ({
  allowAudio: false,
  setAllowAudio: (allow) => set({ allowAudio: allow }),
}));
export default useAllowAudioStore;
