import { api, LightningElement, track} from 'lwc';
const columns = [
    { label: 'Creditor', fieldName: 'creditorName',type:'text' },
    { label: 'First Name', fieldName: 'firstName', type: 'text' },
    { label: 'Last Name', fieldName: 'lastName', type: 'text' },
    { label: 'Min Pay', fieldName: 'minPaymentPercentage', type: 'percent',typeAttributes:{ minimumFractionDigits:2}},
    { label: 'Balance', fieldName: 'balance', type: 'currency', typeAttributes: { step: '0.001'}},
];

// importing apex class to make callout
import getSfsLenders from '@salesforce/apex/SfsTest.getSfsLenders';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SfsTestCalloutwithApex extends LightningElement {
    
    //data table variables
    @track data = [];
    columns = columns;
    
    //boolean variables to check statuses
    hasRendered = false;
    isModalOpen = false;

    total = 0;
    checkedRowCount = 0;
    selectedRows;

    @api
    get totalRowCount(){
        return this.data.length;
    };
   
    //variables to capture details to add
    creditor ='';
    firstName = '';
    lastName = '';
    minPay = 0;
    balance = 0;

   
  
  

    renderedCallback() {
        if(this.hasRendered == false) {
            getSfsLenders().then(result=>{
                this.data = JSON.parse(result);
                for (var j = 0; j < this.data.length; j++){
                    this.data[j].minPaymentPercentage =  this.data[j].minPaymentPercentage/100;
                }
            }).catch(error =>{
                this.dispatchEvent(
                    new ShowToastEvent({
                        message: error.body.message,
                        variant: ERROR_VARIANT
                    })
                );
            });
            this.hasRendered = true;
        }
    }

    getSelectedRows(event){
        this.selectedRows = event.detail.selectedRows;
        this.checkedRowCount = this.selectedRows.length;
        this.total = 0;
        // Display that fieldName of the selected rows
        for (let i = 0; i < this.selectedRows.length; i++){
            this.total = this.total+this.selectedRows[i].balance;
        }

    }

    addDebtHandler(){
    this.isModalOpen = true;
    }

    closeModal(){
        this.isModalOpen = false;
    }

    submitDetails(){
        this.addSfsLenders();
    }

    addSfsLenders(){
        
        const lendergettingAdded = {
            id:this.data.length+1,
            creditorName: this.creditor,
            firstName: this.firstName,
            lastName: this.lastName,
            minPaymentPercentage: this.minPay,
            balance: this.balance
        };
        this.data = [...this.data ,lendergettingAdded ];
        this.isModalOpen = false;
        clearValues();
    }
    
    handleChange(event) {
        const field = event.target.name;
        if (field === 'creditor') {
            this.creditor = event.target.value;
        } else if (field === 'firstName') {
            this.firstName = event.target.value;
        }
        else if (field === 'lastName') {
            this.lastName = event.target.value;
        }
        else if (field === 'minPay') {
            this.minPay = event.target.value/100;
        }
        else if (field === 'balance') {
            this.balance = event.target.value;
        }
    }


    removeDebtHandler(){
       console.log('Entered remove debt handler');
        for (let i = 0; i < this.selectedRows.length; i++){
            this.data = this.data.filter(value => value.id !== this.selectedRows[i].id);
        }

    }

    clearValues(){
    this.creditor ='';
    this.firstName = '';
    this.lastName = '';
    this.minPay= 0 ;
    this.balance = 0;

    }


}