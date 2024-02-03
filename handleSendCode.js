import axios from "axios";

const handleSendCode = async (email) => {
  try {
    // Check if the email exists in the database and retrieve username and password
    const response = await axios.get(`http://localhost:3000/api/get-user-info?email=${email}`);
    
    if (response.data.exists) {
      const { username, password } = response.data.userInfo;

      // Send a text to the email with username and password (replace with your email sending logic)
      sendTextToEmail(email, username, password);

      // Return a success message
      return "نام کاربری و گذرواژه به ایمیل شما ارسال شد";
    } else {
      // Return a message for non-existing email
      return "آدرس ایمیل وارد شده یافت نشد";
    }
  } catch (error) {
    console.error("Error sending username and password:", error);
    return "خطا در ارتباط با سرور";
  }
};

const sendTextToEmail = (email, username, password) => {
  console.log(`Sending username: ${username} and password: ${password} to email: ${email}`);
};

export default handleSendCode;
