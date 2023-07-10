
const calcInterestTotal = (cantidad, cuotas) => {

  let total;

  if (cantidad < 3000) {
    total = cantidad * 1.5
  } else if (cantidad >= 3000 && cantidad < 7500){
    total = cantidad * 1.4
  } else if (cantidad >= 7500 && cantidad < 12000) {
    total = cantidad * 1.3
  } else {
    total = cantidad * 1.2
  }

  if (cuotas === 6) {
    total = total * 1.1
  } else if (cuotas === 12) {
    total = total * 1.2
  } else {
    total = total * 1.4
  }

  return total;

}


export {
  calcInterestTotal
}