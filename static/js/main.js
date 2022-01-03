(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
        form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
    }, false)
    })
})();

function notify(msg, msgType="success") {
    notie.alert({
      type: msgType,
      text: msg,
      stay: false,
      time: 3,
      position: "top",
    });
}

function Prompt() {
    let toast = function(c) {
        const {
            msg= "",
            icon= "success",
            position= "top-end"
        } = c;

        const Toast = Swal.mixin({
          toast: true,
          title: msg,
          position: position,
          icon: icon,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({});
    }

    let success = function(c) {
        const {
            msg = "",
            title = "",
            footer = "",
        } = c;

        Swal.fire({
          icon: 'success',
          title: title,
          text: msg,
          footer: footer,
        })
    }

    let error = function(c) {
        const {
            msg = "",
            title = "",
            footer = "",
        } = c;

        Swal.fire({
          icon: 'error',
          title: title,
          text: msg,
          footer: footer,
        })
    }

    let custom = async function custom(c) {
        const {
            msg = "",
            title = ""
        } = c;

        const { value: result } = await Swal.fire({
          title: title,
          html: msg,
          backdrop: false,
          focusConfirm: false,
          showCancelButton: true,
          willOpen: () => {
              if(c.willOpen !== undefined){
                c.willOpen()
              }
          },
          didOpen: () => {
            if(c.didOpen !== undefined){
              c.didOpen()
            }
          },
          preConfirm: () => {
            if(c.preConfirm !== undefined){
              c.preConfirm()
            }
          }
        })

        if (result) {
          if(result.dismiss !== Swal.DismissReason.cancel) {
            if(result.value !== "") {
              if(c.callback !== undefined) {
                c.callback(result);
              }
            } else {
              c.callback(false);
            }
          } else {
            c.callback(false)
          }
        }
    }

    return {
        toast: toast,
        success: success,
        error: error,
        custom: custom,
    }
}