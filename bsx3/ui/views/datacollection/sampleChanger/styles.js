const styles = {
  wrap: {
    width: '100%',
    textAlign: 'center',
    // padding: '1rem',
    // marginLeft: '-30px'
  },
  droppable: {
    border: '1px lightgray',
    margin: '1rem',
    padding: '1rem',
    borderRadius: '5px',
    width: '100%',
    minHeight: '400px'
  },
  droppableDragging: {
    borderColor: 'green',
  },
  draggable: {
    backgroundColor: 'white',
    margin: '0rem',
    padding: '0rem',
    height: '40px',
  },
  draggableDragging: {
    backgroundColor: '#dcedc8',
    width: '700px',
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
