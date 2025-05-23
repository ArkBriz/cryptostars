import { getUserData, getContractorsData } from "./api.js";
import { setUserData, hideProfileBlock } from "./user.js";
import { initSorting } from "./sorting.js";
import "./map.js";
import "./view-toggler.js";

const onGetDataSuccess = (data) => {
  initSorting(data);
};

getUserData(setUserData, hideProfileBlock);
getContractorsData(onGetDataSuccess);
