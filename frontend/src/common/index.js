const backendDomain = "http://localhost:8080";

const summaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "post",
  }
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },
  sendOtp: {
    url: `${backendDomain}/api/send-otp`,
    method: "post",
  },
  resetPassword: {
    url: `${backendDomain}/api/reset-password`,
    method: "post",
  },
};

export default summaryApi;
