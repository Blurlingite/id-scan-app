// Function to convert time from HH:mm:ss to 12-hour format with "am" or "pm" suffix
const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);
    const suffix = hour >= 12 ? "pm" : "am";
    hour = hour % 12 || 12;
    return `${hour}:${minutes} ${suffix}`;
};

export default formatTime;