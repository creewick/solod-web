Vue.component('verify-input', {
    template: '#verify-input',
    props: {
        regex: {},
        placeholder: {},
        formId: {},
        key: {},
        format: { default: () => (x => x) },
        classes: {}
    },
    methods: {
        verify(event) {
            if (this.regex.test(event.target.value)) {
                event.target.setCustomValidity('');
                this.$parent.onSuccess(this.formId, this.key, event.target.value);
            } else {
                event.target.setCustomValidity('Неверно заполнено поле');
                this.$parent.onError(this.formId, this.key);
            }
        },

        change(event) {
            event.target.value = this.format(event.target.value);
            this.verify(event);
        }
    }
})

Vue.component('form-submit', {
    template: '#form-submit',
    props: ['keys', 'formId'],
    methods: {
        submit(event) {
            let data = this.$parent.forms[this.formId];
            let json = JSON.stringify(data);
            $.ajax({
                type: 'POST',
                url: 'https://solod-web.azurewebsites.net/api',
                data: json
            });

            event.preventDefault();
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        forms: []
    },
    methods: {
        onSuccess(formId, key, value) {
            if (!this.forms[formId]) {
                this.forms[formId] = {};
            }
            this.forms[formId][key] = value;
        },

        onError(formId, key) {
            if (this.forms[formId]) {
                delete this.forms[formId][key];
            }
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
