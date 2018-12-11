var app = new Vue({
    el: '#app',
    methods: {
        verify(event, pattern) {
            if (pattern.test(event.target.value))
                event.target.setCustomValidity('')
            else
                event.target.setCustomValidity('Ошибка')
        },

        change(event, func) {
            event.target.value = func(event.target.value)
        }
    }
})

String.prototype.digits = function(limit=99) {
    return this.replace(/\D/g, '').substr(0, limit);
}

String.prototype.cardFormat = function() {
    let match = this.match(/\d{1,4}/g)
    return match ? match.join(' ') : ''
}

String.prototype.dateFormat = function() {
    let match =  this.match(/\d{1,2}/g)
    return match ? match.join('/') : ''
}