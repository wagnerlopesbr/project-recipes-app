export const lettersOnlyRegex = /^[a-zA-Z]+$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;

export const passwordRegex = (length: number = 8) => {
  return new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{${length},}$`);
};
