import { getUserData, getContractorsData } from "./api.js";
import { setUserData, hideProfileBlock } from "./user.js";
import { renderUsersList } from "./users-list.js";

getUserData(setUserData, hideProfileBlock);
getContractorsData(renderUsersList);
