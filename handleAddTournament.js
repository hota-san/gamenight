import axios from "axios";

const handleAddTournament = async (tournamentData) => {
  // Basic validation
  if (
    !tournamentData.name ||
    !tournamentData.entryFee ||
    !tournamentData.imageUrl ||
    !tournamentData.selectedTime ||
    !tournamentData.selectedMonth ||
    !tournamentData.selectedDay ||
    !tournamentData.remainingSpots ||
    !tournamentData.detail
  ) {
    return "لطفاً تمامی فیلدها را پر کنید";
  }

  // Additional validation for entryFee and remainingSpots
  if (isNaN(tournamentData.entryFee) || isNaN(tournamentData.remainingSpots)) {
    return "هزینه ورود و تعداد باقی‌مانده باید عدد باشند";
  }

  try {
    // Make a POST request to your server
    const response = await axios.post(
      "http://localhost:3000/api/add-tournament",
      tournamentData
    );
    console.log(response.data.success);
    // Check the response from the server
    if (response.data.success) {
      // Tournament added successfully
      return "تورنومنت با موفقیت ثبت شد";
    } else {
      // Failed to add tournament
      console.log("boob");
      return "خطا در ثبت تورنومنت";
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error adding tournament:", error);
    return "خطا در ارتباط با سرور";
  }
};

export default handleAddTournament;
