import React from 'react'
import Swal from 'sweetalert2';

function ProgressBackdrop() {
Swal.fire({
  title: 'Checking the student clashh!',
  timer: 2000,
  allowOutsideClick:false,
  timerProgressBar: true,
  timerProgressBar:'red',
  didOpen: () => {
    Swal.showLoading()
  },
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
  return (
    <div>ProgressBackdrop</div>
  )
}

export default ProgressBackdrop