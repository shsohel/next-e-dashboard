export const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export const tableCustomStyles = {
  headCells: {
    style: {
      backgroundColor: '#F3F4F6',
      color: '#0F172A',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  // cells: {
  //   style: {
  //     // border: '1px solid red',
  //     // paddingLeft: '16px',
  //     // paddingRight: '16px',
  //     wordBreak: 'break-word',
  //   },
  //   draggingStyle: {},
  // },
};
