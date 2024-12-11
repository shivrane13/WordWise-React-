import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParms] = useSearchParams();
  const lat = searchParms.get("lat");
  const lng = searchParms.get("lng");

  return [lat, lng];
}
