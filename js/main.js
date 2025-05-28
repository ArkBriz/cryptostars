import { getUserData, getContractorsData } from "./api.js";
import { setProfileData, hideProfileBlock } from "./user.js";
import { initSorting } from "./sorting.js";
import "./map.js";
import "./view-toggler.js";
import "./modal.js";
import { getUsers } from "./markers.js";
import "./form-validation.js";

const onGetDataSuccess = (data) => {
  initSorting(data);
  getUsers(data);
};

getUserData(setProfileData, hideProfileBlock);
getContractorsData(onGetDataSuccess);
