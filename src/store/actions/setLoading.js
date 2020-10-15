import { IS_LOADING } from "../../constants";

export default (isLoading) => {
  return { type: IS_LOADING, isLoading };
};