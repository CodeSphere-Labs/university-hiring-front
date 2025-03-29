export const getStudentWord = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'студентов';
  }

  if (lastDigit === 1) {
    return 'студент';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'студента';
  }

  return 'студентов';
};
