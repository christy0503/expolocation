interface StationInfo {
  address: string;
  x: number;
  y: number;
 }
 
 
 interface Stations {
  stationInfo: StationInfo;
  setStationInfo: (stationInfo: StationInfo) => void;
 }
 
 
 interface AlarmSound {
  label: string;
  value: string;
  setLabel: (label: string) => void;
  setValue: (value: string) => void;
 }
 
 
 interface UserState {
  isTracking: boolean;
  setIsTracking: (isTrackling: boolean) => void;
 }
 
 
 export { Stations, AlarmSound, UserState };
 
 
 
 
 
 
 