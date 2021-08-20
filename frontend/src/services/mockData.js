const data = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Multiple choice' },
      'task-2': { id: 'task-2', content: 'Poll' },
      'task-3': { id: 'task-3', content: 'True or False' },
      'task-4': { id: 'task-4', content: 'Q & A' },
      'task-5': { id: 'task-5', content: 'Ask Me Anything' },
    },
    droppables: {
      'droppable-blocks': {
        id: 'droppable-blocks',
        title: 'Blocks',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
      },
      'droppable-timeline': {
        id: 'droppable-timeline',
        title: 'Timeline',
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    droppablesOrder: ['droppable-blocks', 'droppable-timeline'],
  };
  
  // const data = {
  //   'blocks': {
  //     id: 'blocks',
  //     title: "Blocks",
  //     items: [],
  //     itemOrder: []
  //   },
  //   'timeline': {
  //     id: 'timeline',
  //     title: "Timeline",
  //     items: []
  //   }
  // }
  
  export default data;
  