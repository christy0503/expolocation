import { create } from "zustand";
import { Stations } from "@/utils/interface";

const useStationStore = create<Stations>((set) => ({
  stationInfo: { address: "", x: 0, y: 0 },
  setStationInfo: (stationInfo) => set({ stationInfo }),
}));

export default useStationStore;
