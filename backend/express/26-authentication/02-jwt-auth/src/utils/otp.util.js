import crypto from "crypto";

const generateOTP = () => {
  const otp = crypto.randomInt(100000, 1000000); // Generates a random integer between 100000 and 999999
  return otp.toString();
}

export default generateOTP;