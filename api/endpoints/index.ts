export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/api/`;
export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;

// api doc => https://militarymoves-admin.dedicateddevelopers.us/apidoc

export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/uploads/${url}`;
};

export const endpoints = {
  auth: {
    signup: "register",
    signUpProfile: "user/signup",
    login:"magic-link",
    profileDetails: "user/profile/get",
    profileUpdate: "user/profile/update",
    magicAuth: "magic-auth"
  },
  cms: {
    about: "aboutpolicy/details",
    faq: "faq/all",
    home_cms: "home-cms",
    
  }
};

export const sucessNotificationEndPoints = [
  // endpoints.auth.signup,
  endpoints.auth.signUpProfile,
  endpoints.auth.login,
  endpoints.auth.profileUpdate,
];
