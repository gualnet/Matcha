
const orientationNumToString = (num = -1) => {
  if (Number.isNaN(num) || !Number.isInteger(num)) {
    return 'Unknown :('
  }
  switch (num) {
    case 0:
      return 'Heterosex'
    case 1:
      return 'Bisex'
    case 2:
      return 'Homosex'
    case 3:
      return 'Pansex'
    case 4:
      return 'Asex'
    default:
      return 'Unknown'
  }
}

export default orientationNumToString
