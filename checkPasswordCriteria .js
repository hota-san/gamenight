const checkPasswordCriteria = (password) => {
    // Define your criteria for a secure password
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    // Array to store messages about criteria not met
    const messages = [];
  
    // Check each criteria and push a message for the ones not met
    if (password.length < minLength) {
      messages.push("Password should be at least 8 characters long\n");
    }
  
    // if (!hasUppercase) {
    //   messages.push("Password should contain at least one uppercase letter\n");
    // }
  
    // if (!hasLowercase) {
    //   messages.push("Password should contain at least one lowercase letter\n");
    // }
  
    if (!hasNumber) {
      messages.push("Password should contain at least one number\n");
    }
  
    if (!hasSpecialCharacter) {
      messages.push("Password should contain at least one special character\n");
    }
  
    return messages;
  };
  export default checkPasswordCriteria;
  