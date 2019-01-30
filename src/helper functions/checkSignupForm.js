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
      return false;
    }
  } else {
    if (!companyName) {
      return false;
    }
  }

  if (!password || password !== password2) {
    return false;
  }

  if (!email) {
    return false;
  }

  return true;
}
