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
  uploadRecipe: {
    url: `${backendDomain}/api/upload-recipe`,
    method: "post",
  },
  allUser: {
    url: `${backendDomain}/api/all-user`,
    method: "get",
  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  approveProduct: {
    url: `${backendDomain}/api/approve-product`,
    method: "POST",
  },
  rejectProduct: {
    url: `${backendDomain}/api/reject-product`,
    method: "DELETE",
  },
  deleteUser: {
    url: `${backendDomain}/api/delete-user`,
    method: "DELETE",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "get",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
};

export default summaryApi;
