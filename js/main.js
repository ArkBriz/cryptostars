import { getUserData, getContractorsData } from "./api.js";
import { setUserData } from "./user.js";

getUserData(setUserData);
getContractorsData();
