// TODO Add a gender to icon

const genderNumToString = (number = -1) => {
  if (Number.isNaN(number) || !Number.isInteger(number)) {
    return 'Unknown'
  }
  switch (number) {
    case 0:
      return 'Male'
    case 1:
      return 'Female'
    case 2:
      return 'Genderqueer'
    default:
      return 'Unknown'
  }
}

export default genderNumToString
