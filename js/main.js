import { getUserData, getContractorsData } from "./api.js";
import { setUserData, hideProfileBlock } from "./user.js";
import { initSorting } from "./sorting.js";
import "./map.js";
import "./view-toggler.js";
import { getUsers } from "./markers.js";
import "./modal.js";

const onGetDataSuccess = (data) => {
  initSorting(data);
  getUsers(data);
};

getUserData(setUserData, hideProfileBlock);
getContractorsData(onGetDataSuccess);
