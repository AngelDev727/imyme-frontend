const collapse = {
    install(Vue, options) {
        Vue.prototype.$enter = function(el, done) {
            el.style.height = 0 + 'px'
            el.style.height = el.scrollHeight + 'px'
            setTimeout(() => {
                done()
            }, 300)
        }

        Vue.prototype.$afterEnter = function(el) {
            el.style.height = 'auto'
        }

        Vue.prototype.$leave = function(el, done) {
            el.style.height = el.scrollHeight + 'px'
            setTimeout(() => {
                el.style.height = 0 + 'px'
            }, 10)
            setTimeout(() => {
                done()
            }, 310)
        }
    },
}

export default collapse
