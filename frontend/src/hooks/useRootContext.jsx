import { useContext } from "react";
import { RootContext } from "../context/RootContext";

const useRootContext = function () {
  return useContext(RootContext);
};

export default useRootContext;
