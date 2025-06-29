import { createContext, useContext } from "react";

type CameraContextType = {
  openCameraModal: () => void;
};

export const CameraContext = createContext<CameraContextType | undefined>(
  undefined,
);

export function useCamera() {
  const context = useContext(CameraContext);
  if (context === undefined) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
}
