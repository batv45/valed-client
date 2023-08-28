import type { SweetAlertOptions } from 'sweetalert2'
import Swal from 'sweetalert2'

export function useSwal(title: string, text: string, icon: string = null, options: SweetAlertOptions = null) {
  return Swal.fire({
    title,
    text,
    icon,
    ...options,
  })
}

export function useConfirm(text: string, yesText = 'Evet', noText = 'Hayır') {
  return Swal.fire({
    title: 'Emin misin?',
    text,
    icon: 'warning',

    showCancelButton: true,

    customClass: {
      actions: 'flex w-full justify-content-between px-4',
      cancelButton: 'order-2 ',
      confirmButton: 'order-1 bg-primary',
    },

    // confirmButtonColor: '#3085d6',
    // cancelButtonColor: '#d33',
    cancelButtonText: noText,
    confirmButtonText: yesText,
  })
}

export function useConfirmHtml(html: string, yesText = 'Evet', noText = 'Hayır') {
  return Swal.fire({
    title: 'Emin misin?',
    html,
    icon: 'warning',

    showCancelButton: true,

    customClass: {
      actions: 'flex w-full justify-content-evenly',
      cancelButton: 'order-1 right-gap',
      confirmButton: 'order-2',
    },

    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: noText,
    confirmButtonText: yesText,
  })
}
