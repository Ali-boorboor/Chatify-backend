const generateRandomCode = () => {
  const randomNumber1 = Math.floor(Math.random() * 9);
  const randomNumber2 = Math.floor(Math.random() * 9);
  const randomNumber3 = Math.floor(Math.random() * 9);
  const randomNumber4 = Math.floor(Math.random() * 9);
  const randomNumber5 = Math.floor(Math.random() * 9);
  const randomNumber6 = Math.floor(Math.random() * 9);

  return `${randomNumber1}${randomNumber2}${randomNumber3}${randomNumber4}${randomNumber5}${randomNumber6}`;
};

export default generateRandomCode;
