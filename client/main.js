var stripe = Stripe('pk_test_ODFrzq2FobsKWojS0AS7qu7Z');

var elements = stripe.elements();


var style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};


var card = elements.create('card', {style: style});

card.mount('#card-element');
var form = document.getElementById('payment-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const amount = document.querySelector('#amount').value
  stripe.createToken(card).then(function(result) {
    if (result.error) {
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      stripeTokenHandler(result.token);
    }
  });


});

function stripeTokenHandler(token) {
  console.log(token);
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('amount', amount);
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  form.submit();
}
