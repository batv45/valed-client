import moment from 'moment'
import { Tooltip } from 'bootstrap'
import { useEventListener } from '@vueuse/core'
import autosize from 'autosize'

export default {
  install: (app, options) => {
    app.config.globalProperties.$filters = {
      timeAgo(date: any) {
        if (moment(date).isValid())
          return moment(date).fromNow()
        else
          return null
      },
      dateTime(date: any) {
        if (moment(date).isValid())
          return moment(date).format('DD/MM/YYYY HH:mm')
        else
          return null
      },
      trl(n: any) {
        // return numeral(n).format("₺0,0.00");
        return `${Number.parseFloat(String((n / 10000))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.').replace(/\.(\d+)$/, ',$1')} ₺`
      },
    }
    app.directive('autosize', (el, binding) => {
      autosize(el)
    })
    app.directive('tooltip', (el: Element, binding) => {
      document.getElementsByClassName('tooltip')[0]?.remove()
      const options = {
        delay: {
          show: 50,
          hide: 50,
        },
        container: '.page',
        html: binding.arg === 'html',
        placement: binding.value ? binding.value : 'auto',
      }
      if (document.getElementsByClassName('page').length) {
        const tltip = new Tooltip(el, options)
        useEventListener(el, 'click', () => {
          tltip.hide()
        })
      }
    })
  },
}
