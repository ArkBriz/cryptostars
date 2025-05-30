import { getUserData, getContractorsData } from "./api.js";
import { setProfileData } from "./user.js";
import { initSorting } from "./sorting.js";
import "./map.js";
import "./view-toggler.js";
import "./modal.js";
import { getUsers } from "./markers.js";
import { setOnFormSubmit } from "./form-validation.js";
import { showErrorMessage } from "./error-messages.js";

const onGetDataSuccess = (data) => {
  initSorting(data);
  getUsers(data);
};

getUserData(setProfileData, showErrorMessage);
getContractorsData(onGetDataSuccess, showErrorMessage);
setOnFormSubmit();
