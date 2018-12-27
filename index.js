Vue.component('field', {
    template: '#field',
    props: {
        format: { default: () => (x => x) },
        fieldClasses: {},
        placeholder: {},
        classes: {},
        regex: {},
        label: {},
        after: {},
        value: {}
    },
    data() {
        return {
            content: {
                errors: [],
                value: '',
                touched: false,
                valid: false
            }
        };
    },
    created() {
        this.$emit('input', this.content);
    },
    computed: {
        isValid() {
            return this.content.valid || !this.content.touched;
        }
    },
    watch: {
        'content.value': {
            handler(next) {
                this.content.valid = this.regex.test(next);
                this.content.value = this.format(next);
                this.$emit('input', this.content);
                this.content.touched = true;
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        paymentAny: {
            cardNumber: {},
            cardDate: {},
            cardCvc: {},
            sum: {},
            comment: {},
            email: {}
        },
        paymentOwn: {
            inn: {},
            bik: {},
            bankNumber: {},
            purpose: {},
            sum: {}
        },
        request: {
            inn: {},
            bik: {},
            bankNumber: {},
            purpose: {},
            sum: {},
            phoneNumber: {},
            email: {}
        }
    },
    computed: {
        paymentAnyIsValid: {
            cache: false,
            get: function() { return this.isFormValid('paymentAny'); }
        },
        paymentOwnIsValid: {
            cache: false,
            get: function() { return this.isFormValid('paymentOwn'); }
        },
        requestIsValid: {
            cache: false,
            get: function() { return this.isFormValid('request'); }
        }
    },
    methods: {
        isFormValid(formKey) {
            for (const i in this[formKey]) {
                if (!this[formKey][i] || !this[formKey][i].valid) {
                    return false;
                }
            }
            return true;
        },

        send(event) {

            fetch('http://solod-web.azurewebsites.net/api/values/paymentAny', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cardNumber: this.paymentAny.cardNumber.value,
                    cardDate: this.paymentAny.cardDate.value,
                    cardCvc: this.paymentAny.cardCvc.value,
                    sum: this.paymentAny.sum.value,
                    comment: this.paymentAny.comment.value,
                    email: this.paymentAny.email.value
                })
            });
        }
    }
})

String.prototype.digits = function(limit=99) {
    return this.replace(/\D/g, '').substr(0, limit);
}

String.prototype.cardFormat = function() {
    let match = this.match(/\d{1,4}/g);
    return match ? match.join(' ') : '';
}

String.prototype.dateFormat = function() {
    let match = this.match(/\d{1,2}/g);
    return match ? match.join('/') : '';
}

String.prototype.phoneFormat = function () {
    let match = this.match(/^7?(\d{0,3})?(\d{0,3})?(\d{0,2})?(\d{0,2})?$/);
    const sep = ['+7 (', ') ', '-', '-'];
    return match
        .filter((val, i) => i !== 0 && val)
        .map((val, i) => sep[i] + val)
        .join('');
}
