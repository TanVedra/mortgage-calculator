<template v-cloak>
    <div >
        <h2>Banks Management</h2>
        <ul>
            <li v-if="list.length === 0">
                <div class="row">
                    <div class="col s12">
                        <h4>You don't have any records</h4>
                    </div>
                </div>
            </li>
            <li v-for="(item, idx) in list" :key="item + idx" v-else>
                <div class="row">
                    <form action="" class="col s12" @submit.prevent="submit">
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="bank_name" type="text" class="validate" :value="item['bank_name'] ? item['bank_name'] : ''" required>
                                <span class="helper-text label">Bank Name</span>
                            </div>
                            <div class="input-field col s2 offset-s4">
                                <input id="interest_rate" type="text" class="validate" :value="item['interest_rate'] ? item['interest_rate'] : ''" required>
                                <span class="helper-text label">Interest Rate</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <input id="maximum_loan" type="number" class="validate" :value="item['maximum_loan'] ? item['maximum_loan'] : ''" required>
                                <span class="helper-text label">Max Loan</span>
                            </div>
                            <div class="input-field col s4">
                                <input id="minimum_down_payment" type="text" class="validate" :value="item['minimum_down_payment'] ? item['minimum_down_payment'] : ''" required>
                                <span class="helper-text label">Min Down Payment</span>
                            </div>
                            <div class="input-field col s4">
                                <input id="loan_term" type="number" class="validate" :value="item['loan_term'] ? item['loan_term'] : ''" required>
                                <input id="id" type="hidden" class="validate" :value="item['id'] ? item['id'] : ''">
                                <span class="helper-text label">Loan Term</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s3 offset-s3">
                                <button class="btn waves-effect lime darken-4 update" type="submit" name="action">Update
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                            <div class="col s3">
                                <button class="btn waves-effect deep-orange accent-4 delete" type="submit" name="action">Delete
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </li>
            <li>
                <div class="row">
                    <form action="" class="col s12" @submit.prevent="submit">
                        <div class="row">
                            <div class="col s12">
                                <h5>Create a new record:</h5>
                            </div>
                            <div class="input-field col s6">
                                <input id="new_bank_name" type="text" class="validate" required>
                                <span class="helper-text label">Bank Name</span>
                            </div>
                            <div class="input-field col s2 offset-s4">
                                <input id="new_interest_rate" type="text" class="validate" required>
                                <span class="helper-text label">Interest Rate</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <input id="new_maximum_loan" type="number" class="validate" required>
                                <span class="helper-text label">Max Loan</span>
                            </div>
                            <div class="input-field col s4">
                                <input id="new_minimum_down_payment" type="text" class="validate" required>
                                <span class="helper-text label">Min Down Payment</span>
                            </div>
                            <div class="input-field col s4">
                                <input id="new_loan_term" type="number" class="validate" required>
                                <span class="helper-text label">Loan Term</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s3 offset-s1">
                                <button class="btn waves-effect lime create" type="submit" name="action">Create
                                    <i class="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { HOST } from '@/assets/environment.js';

    export default {
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
            const action = event.submitter.classList.contains('update') ? 'update' : event.submitter.classList.contains('delete') ? 'delete' : 'create';
            const answer = confirm(action === 'update' ? 'Do you want to update this record?' : action === 'delete' ? 'Do you want to delete this record?' : 'Do you want to create a new record?');

            if(answer) {
              switch (action) {
                case 'update':
                  this.updateRecord(this.prepareData(action, event.target.elements));
                  break;
                case 'delete':
                  this.deleteRecord(this.prepareData(action, event.target.elements));
                  break;
                default:
                  this.createNewRecord(this.prepareData(action, event.target.elements));
                  break;
              }
            }
        },
        prepareData (action, elements) {
          let data;
          if(action === 'update') {
            const {bank_name, interest_rate, maximum_loan, minimum_down_payment, loan_term, id} = elements;
            data = {
              bank_name: bank_name.value,
              interest_rate: parseFloat(interest_rate.value),
              maximum_loan: parseInt(maximum_loan.value),
              minimum_down_payment: parseFloat(minimum_down_payment.value),
              loan_term: parseInt(loan_term.value),
              id: parseInt(id.value)
            };
          } else if(action === 'create') {
            const {new_bank_name, new_interest_rate, new_maximum_loan, new_minimum_down_payment, new_loan_term} = elements;
            data = {
              bank_name: new_bank_name.value,
              interest_rate: parseFloat(new_interest_rate.value),
              maximum_loan: parseInt(new_maximum_loan.value),
              minimum_down_payment: parseFloat(new_minimum_down_payment.value),
              loan_term: parseInt(new_loan_term.value)
            };
          } else if(action === 'delete') {
            data = {id: parseInt(elements['id'].value)};
          }
          return data;
        },
        updateRecord(data) {
          fetch(`${HOST}/banks-management`, {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(data => {
              const idxForUpdate = this.list.findIndex((el) => el.id === data.id);
              this.list[idxForUpdate] = data;
            }).catch(console.error);
        },
        deleteRecord(id) {
          fetch(`${HOST}/banks-management`, {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify(id)
          })
            .then(() => {
              const idxForDelete = this.list.findIndex((el) => el.id === id.id);
              this.list.splice(idxForDelete, 1);
            }).catch(console.error);
        },
        createNewRecord(data) {
          fetch(`${HOST}/banks-management`, {
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(newRecord => this.list.push(newRecord))
            .catch(console.error);
        }
      }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    [v-cloak] {
        display: none;
    }
    form {
        border: 1px solid #00bfa5;
    }
    span.label {
        color: #00bfa5;
        font-weight: bold;
        font-size: 1rem;
    }
</style>
