const labels = ["a", "b", "c", "d", "e", "f"];

/**
 * Заполняет состояние абака единицами согласно
 * переданному числу
 * @param {number} number - число которое нужно набрать на абаке
 * @param {number} range - это порядок абака
 * @return {object} состояние абакуса
 */
export const fillingValues = (number, range) => {
  let nextAbacus = {};
  for (let i = 0; i < range; i += 1) {
    nextAbacus = { ...nextAbacus, [labels[i]]: [0, 0, 0, 0, 0] };
  }
  if (number) {
    let k = range;
    let pod = [0, 0, 0, 0, 0];
    const numberComposition = number.toString();

    for (let i = numberComposition.length - 1; i >= 0; i -= 1) {
      k -= 1;
      const label = labels[k];
      switch (numberComposition[i]) {
        case "1":
          pod = [0, 1, 0, 0, 0];
          break;
        case "2":
          pod = [0, 1, 1, 0, 0];
          break;
        case "3":
          pod = [0, 1, 1, 1, 0];
          break;
        case "4":
          pod = [0, 1, 1, 1, 1];
          break;
        case "5":
          pod = [1, 0, 0, 0, 0];
          break;
        case "6":
          pod = [1, 1, 0, 0, 0];
          break;
        case "7":
          pod = [1, 1, 1, 0, 0];
          break;
        case "8":
          pod = [1, 1, 1, 1, 0];
          break;
        case "9":
          pod = [1, 1, 1, 1, 1];
          break;
        default:
          pod = [0, 0, 0, 0, 0];
          break;
      }
      nextAbacus = { ...nextAbacus, [label]: pod };
    }
  }
  return nextAbacus;
};

export const sumOnRod = (rod) =>
  rod.reduce((accumulator, value, index) => {
    const result = accumulator;
    let summand = 0;
    if (value === 1) {
      summand = index === 0 ? 5 : 1;
    }
    return result + summand;
  }, 0);

export const sumAbacus = (abacusState) =>
  Object.values(abacusState)
    .reverse()
    .reduce((accumulator, value, index) => {
      const result = accumulator;
      const summand = sumOnRod(value);
      const order = Number("1".padEnd(index + 1, "0"));
      return result + summand * order;
    }, 0);
