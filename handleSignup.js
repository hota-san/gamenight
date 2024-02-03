import axios from "axios";
import checkPasswordCriteria from "./checkPasswordCriteria ";
const uuid = require("uuid");
const handleSignup = async (userData) => {
  const serverUrl = "http://localhost:3000";
  // Check if username, email, password, and repassword are empty
  if (
    !userData.username ||
    !userData.email ||
    !userData.password ||
    !userData.rePassword
  ) {
    return "لطفا تمام فیلد ها را پر کنید";
  }

  // Check if password and repassword match
  if (userData.password !== userData.rePassword) {
    return "رمز عبور و تکرار آن باید یکسان باشند";
  }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(userData.email)){
      return 'ایمیل وارد شده نادرست است'
    }


  const checkedPass = checkPasswordCriteria(userData.password);
  if (checkedPass.length !== 0) //this means that there is atleast one problem
  {
    return checkedPass;
  }

  try {
    const userId = uuid.v4(); // Generate a UUID for the new user
    const userWithId = { id: userId, ...userData };

    const response = await axios.post(`${serverUrl}/api/users`, userWithId);
    console.log("User data saved to the database:", response.data);

    return "ثبت نام با موفقیت انجام شد";
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      // Handle duplicate entry error
      return "عملیات ثبت نام با خطا مواجه شده است";
    }

    console.error("Error saving user data:", error);
    return "خطا";
  }
};

export default handleSignup;
