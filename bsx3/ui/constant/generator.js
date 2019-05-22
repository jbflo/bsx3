// import randomSeed from './random';

// write import Values function here
export const importedColumnValues = {

};

export const scDeafaultRowValues = {
  // id: [0, 1, 2],
  samplename: ['s1', 's2', 's3'],
  buffer: ['B1', 'B21', 'B2'],
  concentration: ['c1', 'c2', 'c3'],
  plate: ['p1', 'p2', 'p3'],
  row: ['r1', 'R2', 'r3'],
  column: ['co1', 'co23', 'co3'],
  frame: ['7', '2', '6'],
  exposuretime: ['100', '200', '67'],
  energy: ['17', '27', '38'],
  attenuation: ['23', '75', '5'],
  flow: [true, false, true],
  seutemp: ['50', '6', '55'],
  stemp: ['6', '7', '99'],
  volume: ['60', '70', 67],
};

export const columnsDef = [
  {
    id: 'samplename',
    columnName: 'Sample Name',
    display: true,
    size: 105,
    inputType: 'input',
    columnValues: ['s1', 's2', 's3'],
  },
  {
    id: 'buffer',
    columnName: 'Buffer',
    display: true,
    size: 70,
    columnValues: ['B1', 'B21', 'B2'],
  },
  {
    id: 'plate',
    columnName: 'Plate',
    display: true,
    size: 70,
    columnValues: ['p1', 'p2', 'p3'],
  }
];

// columnDef[colIdx].id

// rowData[coldIdx][columnDef[rowIdx].id] -> s1

export const rowData = [
  {
    samplename: 's1',
    buffer: 'B1',
    concentration: 'c1',
    plate: 'p1',
    row: 'r1',
    column: 'co1',
    frame: '7',
    exposuretime: '100',
    energy: '17',
    attenuation: '23',
    flow: true,
    seutemp: '50',
    stemp: '6',
    volume: '60',
  },
  {
    samplename: 's2',
    buffer: 'B2',
    concentration: 'c1',
    plate: 'p1',
    row: 'r1',
    column: 'co1',
    frame: '7',
    exposuretime: '100',
    energy: '17',
    attenuation: '23',
    flow: true,
    seutemp: '50',
    stemp: '6',
    volume: '60',
  },
  {
    samplename: 's3',
    buffer: 'B3',
    concentration: 'c1',
    plate: 'p1',
    row: 'r1',
    column: 'co1',
    frame: '7',
    exposuretime: '100',
    energy: '17',
    attenuation: '23',
    flow: true,
    seutemp: '50',
    stemp: '6',
    volume: '60',
  }
];

export const queueDeafaultValues = {
  // id: ['0', '1'],
  // queuetype: ['SC', 'HPLC'],
  // label: ['purge', 'queue1', 'Equilibrate'],
  // state: ['Ongoing', 'Next', 'Finish'],
};

// here we generate all row and values of the table...

export function generateRows({
  columnValues = importedColumnValues,
  length,
  // random = randomSeed(329972281),
}) {
  const data = [];
  const columns = Object.keys(columnValues);

  for (let i = 0; i < length; i += 1) {
    const record = {};

    columns.forEach((column) => {
      let values = columnValues[column];

      if (typeof values === 'function') {
        // record[column] = values({ random, index: i, record });
        record[column] = values({ i, index: i, record });
        return;
      }

      while (values.length === 2 && typeof values[1] === 'object') {
        values = values[1][record[values[0]]];
      }

      // const value = values[Math.floor(random() * values.length)];
      const value = values[i];
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
