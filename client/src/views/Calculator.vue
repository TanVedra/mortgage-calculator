<template v-cloak>
  <div class="calculator container">
    <h2 v-if="list.length === 0">Your banks list is empty</h2>
    <div v-else>
      <div class="row">
        <form class="col s12" @submit.prevent="submit">
          <div class="row">
            <div class="col s12">
              <h4>Calculate your monthly mortgage payment</h4>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4">
              <input id="bank_name" type="text" class="validate" required>
              <span class="helper-text label">Bank Name</span>
            </div>
            <div class="input-field col s4">
              <input id="down_payment" type="text" class="validate" required>
              <span class="helper-text label">Down Payment</span>
            </div>
            <div class="input-field col s4">
              <input id="initial_loan" type="number" class="validate" required>
              <span class="helper-text label">Initial loan</span>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <button class="btn waves-effect teal darken-4 calculate" type="submit" name="action">Calculate
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <h4 id="show-payment"></h4>
      </div>
    </div>
  </div>
</template>

<script>
  import { HOST } from '../assets/environment';

  export  default {
    data() {
      return {
        list: []
      }
    },
    created() {
      fetch(`${HOST}/banks-management`)
              .then(response => response.json())
              .then(data => {
                this.list = [...data];
              }).catch(console.error);
    },
    methods: {
      submit(event) {
        const {bank_name, down_payment, initial_loan} = event.target.elements;
        const idx = this.list.findIndex(opt => opt['bank_name'].toLowerCase().trim() === bank_name.value.toLowerCase().trim());
        if(~idx && this.validate(+down_payment.value, +initial_loan.value, idx)) {
           this.showMonthlyPayment(this.calculateMonthlyPayment(+down_payment.value, +initial_loan.value, idx));
        } else if (!~idx){
          alert('Can\'t find specified bank name');
        }
      },
      validate(down_payment, initial_loan, id) {
        let isValid = false;
        const isNum = !Number.isNaN(down_payment) && !Number.isNaN(initial_loan);
        if(isNum && down_payment < this.list[id].minimum_down_payment || down_payment >= 100) {
          alert(`Down Payment must be equal or more than ${this.list[id].minimum_down_payment}, but lower than 100.`);
          return isValid;
        } else if (isNum && initial_loan > this.list[id].maximum_loan) {
          alert(`Initial Loan must be lower than ${this.list[id].maximum_loan}.`);
          return isValid;
        } else if (!isNum) {
          alert('Down Payment and Initial Loan must be numbers.');
          return isValid;
        }
        return !isValid;
      },
      calculateMonthlyPayment(down_payment, initial_loan, id) {
          const borrowedAmount = initial_loan - initial_loan*(down_payment/100);
          const interestRate = this.list[id].interest_rate/100/12;
          const numberOfMonthlyPayments = this.list[id].loan_term;
          const x = Math.pow(1 + interestRate, numberOfMonthlyPayments);
          const monthlyPayment = (borrowedAmount*interestRate*x)/(x - 1);
          return monthlyPayment.toFixed(2);
      },
      showMonthlyPayment(monthlyPayment) {
        const output = document.getElementById('show-payment');
        output.textContent = `Your monthly payment is ${monthlyPayment}`;
        if(output.style.display === 'none') output.style.display = 'block';
      }
    }
  }
</script>

<style scoped lang="scss">
  [v-cloak] {
    display: none;
  }
  form {
    margin-top: 2rem;
    border: 1px solid #00bfa5;
  }
  span.label {
    color: #00bfa5;
    font-weight: bold;
    font-size: 1rem;
  }
  #show-result {
    display: none;
  }
</style>
