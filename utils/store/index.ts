import { create } from "zustand";
import { Stations, AlarmSound, UserState } from "@/utils/interface";


const useStationStore = create<Stations>((set) => ({
 stationInfo: { address: "", x: 0, y: 0 },
 setStationInfo: (stationInfo) => set({ stationInfo }),
}));


const useSelectedAlarmStore = create<AlarmSound>((set) => ({
 label: "sound1",
 value: "sound1.mp3",
 setLabel: (label: string) => set({ label }),
 setValue: (value: string) => set({ value }),
}));


const useTrackingStore = create<UserState>((set) => ({
 isTracking: false,
 setIsTracking: (isTracking: boolean) => set({ isTracking }),
}));


export { useStationStore, useSelectedAlarmStore, useTrackingStore };




