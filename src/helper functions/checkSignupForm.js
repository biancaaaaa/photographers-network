export function checkSignUpForm({
  type,
  firstName,
  lastName,
  companyName,
  email,
  password,
  password2
}) {
  if (type === "photographer") {
    if (!firstName || !lastName) {
      console.log("both first and last name must be completed!");
      return false;
    }
  } else {
    if (!companyName) {
      console.log("company name must be completed!");
      return false;
    }
  }

  if (!password || password != password2) {
    console.log("password does not match");
    return false;
  }

  if (!email) {
    console.log("email must be completed");
    return false;
  }

  return true;
}
