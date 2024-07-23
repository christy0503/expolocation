interface StationInfo {
  address: string;
  x: number;
  y: number;
}

interface Stations {
  stationInfo: StationInfo;
  setStationInfo: (stationInfo: StationInfo) => void;
}

export { Stations };
