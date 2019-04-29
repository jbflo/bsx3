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

export const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage', content2: 'test1' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show', content2: 'test1' },
    'task-3': { id: 'task-3', content: 'Charge my phone', content2: 'test1' },
    // 'task-4': { id: 'task-4', content: 'Cook dinner', content2: 'test1' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3']
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: []
    },
    // 'column-3': {
    //   id: 'column-3',
    //   title: 'Done',
    //   taskIds: []
    // }
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2']
};

export default queueData;
