// import '@custom-styles/basic/confirm-dialogue.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const confirmDialog = (confirmObj) => {
  const { title, text, confirmButtonText, cancelButtonText } = confirmObj;

  return MySwal.fire({
    title,
    // text,
    html: text,

    icon: 'question',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      confirmButton:
        'bg-primary py-1 px-3 text-white font-semibold rounded-sm mr-1',
      cancelButton: 'bg-danger py-1 px-3 text-white font-semibold rounded-sm',
      // container: 'bg-danger',
      // htmlContainer: 'm-0',
      // title: 'my-0 py-0  bg-danger',
    },
    buttonsStyling: false,
  });
};

export const confirmOK = (confirmObj) => {
  const { title, text, confirmButtonText, cancelButtonText } = confirmObj;

  return MySwal.fire({
    title,
    html: text,
    allowOutsideClick: false,
    icon: 'error',

    showCancelButton: false,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger ml-1',
    },
    buttonsStyling: false,
  });
};
