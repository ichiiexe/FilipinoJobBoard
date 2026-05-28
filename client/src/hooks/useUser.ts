import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUser = () => {
// Read context values.
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export default useUser;
