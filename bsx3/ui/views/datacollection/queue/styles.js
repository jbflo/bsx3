const styles = {
  wrap: {
    // marginTop: '20px',
    marginLeft: '0px',
    marginRight: '0px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    width: '100%',
    minHeight: '700px'
  },
  droppable: {
    border: '1px solid lightgray',
    // marginLeft: '10px',
    // padding: '1rem',
    borderRadius: '5px',
    width: '100%',
    minHeight: '500px'
  },
  droppableDragging: {
    borderColor: 'green'
  },
  draggable: {
    // border: '1px solid lightgray',
    backgroundColor: 'white',
    // margin: '.5rem',
    // padding: '.5rem',
    borderRadius: '5px'
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
