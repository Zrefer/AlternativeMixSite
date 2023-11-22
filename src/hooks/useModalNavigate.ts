import { To, useLocation, useNavigate } from "react-router";

import LocationState from "../types/locationState";

const useModalNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as LocationState | undefined;
  const modalBackground = locationState && locationState.modalBackground;

  const modalNavigate = (to: To) => {
    const state: LocationState = {
      modalBackground: modalBackground ?? location,
    };
    navigate(to, { replace: true, state });
  };

  const modalBackOrNavigate = (to: To) => {
    navigate(modalBackground ?? "/", { replace: true });
  };
  return { modalNavigate, modalBackOrNavigate, modalBackground };
};
export default useModalNavigate;
