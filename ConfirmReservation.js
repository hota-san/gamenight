import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConfirmReservation = async (reservationData) => {
  const { userId, startHour, endHour, selectedConsole } = reservationData;

  if (startHour >= endHour) {
    return "لطفاً زمان درست را انتخاب کنید";
  }

  try {
    // Make an HTTP POST request to the reservation endpoint
    const response = await axios.post(
      "http://localhost:3000/api/reservation",
      reservationData
    );

    console.log(response.data);

    // Check the response from the server
    if (response.status === 201) {
      // Reservation successful
      return "ساعت مورد نظر برای شما رزرو شده است";
    } else {
      // Reservation failed
      return "متاسفانه رزرو با خطا مواجه شده است";
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error during reservation request:", error);
    return "خطا در ارسال درخواست رزرو";
  }
};

export default ConfirmReservation;
