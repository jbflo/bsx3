const styles = {
  wrap: {
    // width: '100%',
    // textAlign: 'center',
    // padding: '1rem',
    // marginLeft: '-30px'
  },
  table: {
    width: '100%',
  },
  droppable: {
    borderBotton: '1px solid lightgray',
    borderRadius: '5px',
    width: '100%',
    minHeight: '300px'
  },
  droppableDragging: {
    border: '1px lightgray',
    borderRadius: '5px',
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
    // width: '70px',
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
