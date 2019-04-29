const styles = {
  wrap: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    padding: '1rem',
    width: '100%',
    minHeight: '300px'
  },
  table: {
    width: '100%',
    height: '100px'
  },
  droppable: {
    border: '1px lightgray',
    margin: '1rem',
    padding: '1rem',
    borderRadius: '5px',
    width: '100%',
    minHeight: '300px'
  },
  droppableDragging: {
    borderColor: 'green'
  },
  draggable: {
    backgroundColor: 'white',
    margin: '0rem',
    padding: '0rem',
    height: '70px',
  },
  draggableDragging: {
    backgroundColor: '#dcedc8',
    color: 'white'
  }
};

export const getDroppableStyle = isDraggingOver => ({
  ...styles.droppable,
  ...(isDraggingOver && styles.droppableDragging)
});

export const getDraggableStyle = (isDragging, draggableStyles) => ({
  ...styles.draggable,
  ...(isDragging && styles.draggableDragging),
  ...draggableStyles
});

export default styles;
