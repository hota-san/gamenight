import axios from 'axios';

const handleAddMoney = async (userId, money) => {
  // Check if money is a valid integer
  const moneyValue = parseInt(money, 10);
  if (isNaN(moneyValue) || moneyValue < 0) {
    return 'مقدار وارد شده معتبر نیست';
  }

  // Check if money is within the allowed range
  if (moneyValue > 100000) {
    return 'مقدار بیش از حد مجاز است';
  }

  try {
    // Make an HTTP request to your server
    const response = await axios.post('http://localhost:3000/api/add-money', {
      userId,
      money: moneyValue,
    });

    // Check the response from the server
    if (response.data.message) {
      // Money added to the account successfully
      return 'مبلغ به حساب شما اضافه شد';
    } else {
      // Failed to add money to the account
      return 'خطا در افزایش موجودی';
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error adding money to account:', error);
    return 'خطا در ارتباط با سرور';
  }
};

export default handleAddMoney;
