import { uimsGetMenuApi, uimsGetUserPermsApi } from "./uims";

export function getCurrentUser() {
  try {
    const userInfoStr = sessionStorage.getItem("USER_INFO");
    if (!userInfoStr) {
      return {};
    }
    const userInfo = JSON.parse(userInfoStr);
    if (!userInfo) {
      return {};
    }
    return userInfo;
  } catch (error) {
    return {};
  }
}

export function getMicroDevInitialState(systemId: string) {
  return new Promise(async (resolve, reject) => {
    const currentUser = getCurrentUser();
    try {
      const menuData = await uimsGetMenuApi(systemId);
      const userInfo = await uimsGetUserPermsApi(systemId);

      resolve({
        currentUser,
        menuData: {
          code: 200,
          data: menuData,
          message: "success.",
        },
        systemId,
        userInfo: {
          code: 200,
          data: userInfo,
          message: "success.",
        },
      });
    } catch (error) {
      resolve({
        currentUser,
        menuData: {
          code: 200,
          data: {
            resourceList: [],
            systemId: "",
          },
          message: "success.",
        },
        systemId,
        userInfo: {
          code: 200,
          data: {},
          message: "success.",
        },
      });
    }
  });
}
