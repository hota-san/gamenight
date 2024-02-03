import axios from "axios";

const handleAddItem = async (itemName, imageUpload, description, quantity, price) => {
  // Basic validation checks
  if (!itemName || !imageUpload || !description || !quantity || !price) {
    return 'لطفا تمامی فیلدها را پر کنید';
  }

  // Additional validations
  if (isNaN(quantity) || isNaN(price) || quantity <= 0 || price <= 0) {
    return 'لطفا تعداد و قیمت را به درستی وارد کنید';
  }


  // Validate item name length
  if (itemName.length > 100) {
    return 'نام کالا نباید بیشتر از 100 کاراکتر باشد';
  }

  // Validate description length
  if (description.length > 500) {
    return 'توضیحات نباید بیشتر از 500 کاراکتر باشد';
  }

  try {
    // Make a POST request to your server
    const response = await axios.post('http://localhost:3000/api/add-item', {
      itemName,
      imageUpload,
      description,
      quantity,
      price,
    });

    // Check the response from the server
    if (response.data.success) {
      // Item added successfully
      return 'کالا با موفقیت ثبت شد';
    } else {
      // Failed to add item
      return 'خطا در ثبت کالا';
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error adding item:', error);
    return 'خطا در ارتباط با سرور';
  }
};

export default handleAddItem;
