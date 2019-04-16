import randomSeed from './random';

export const defaultColumnValues = {

};

export const scDeafaultValues = {
  // id: [0, 1],
  samplename: ['s1', 's2'],
  concentration: ['c1', 'c2'],
  plate: ['p1', 'p2'],
  row: ['r1', 'R2'],
  column: ['co1', 'co22'],
  frame: ['f3', 'f4'],
  exposuretime: ['e5', 'e6'],
  attenuation: ['A1', 'A2'],
  buffer: ['B1', 'B21'],
  flow: ['Flow', 'Flow1'],
  temp: ['Temp', 'Temp1'],
};

export const queueDeafaultValues = {
  // id: ['0', '1'],
  // queuetype: ['SC', 'HPLC'],
  // label: ['purge', 'queue1', 'Equilibrate'],
  // state: ['Ongoing', 'Next', 'Finish'],
};

// here we ...
export function generateRows({
  columnValues = defaultColumnValues,
  length,
  random = randomSeed(329972281),
}) {
  const data = [];
  const columns = Object.keys(columnValues);

  for (let i = 0; i < length; i += 1) {
    const record = {};

    columns.forEach((column) => {
      let values = columnValues[column];

      if (typeof values === 'function') {
        record[column] = values({ random, index: i, record });
        return;
      }

      while (values.length === 2 && typeof values[1] === 'object') {
        values = values[1][record[values[0]]];
      }

      const value = values[Math.floor(random() * values.length)];
      if (typeof value === 'object') {
        record[column] = Object.assign({}, value);
      } else {
        record[column] = value;
      }
    });

    data.push(record);
  }

  return data;
}
