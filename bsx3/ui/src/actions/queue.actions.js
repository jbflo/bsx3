export const queueData = [
  {
    key: 0,
    queuetype: 'HPLC',
    sample: 'Purge',
    state: 'running',
    control: 'hidden',
    cols: 2,
  },
  {
    key: 1,
    queuetype: 'SC',
    sample: 'Equilibrate',
    state: 'stop',
    control: 'visible',
    cols: 2,
  },
  {
    key: 2,
    queuetype: 'HPLC',
    sample: 'Queue 1',
    state: 'stop',
    control: 'visible',
    cols: 2,
    featured: true,
  },
  {
    key: 3,
    queuetype: 'SC',
    sample: 'Queue 2',
    state: 'stop',
    control: 'visible',
    cols: 2,
    featured: true,
  },
  {
    key: 4,
    queuetype: 'SC',
    sample: 'Queue 3',
    state: 'stop',
    control: 'visible',
    cols: 2,
  },
  {
    key: 5,
    queuetype: 'SC',
    sample: 'Equilibrate',
    state: 'stop',
    control: 'visible',
    cols: 2,
  },

];

export default queueData;
