import{buttonsElementsOfNumbers,buttonsElementsOfOperations,buttonForDelete,buttonForReset,buttonForAddPoint,buttonForMakeOperation,numberDisplay} from './domQueries.js';

class CalculatorOperations {
    constructor() {
        this.initializeProperties();
        this.loadEventListeners();
    }
    initializeProperties() {
        this.numbersArray1 = [];
        this.numbersArray2 = [];
        this.makeOperation = false;
        this.pointPressedArray1 = false;
        this.pointPressedArray2 = false;
        this.operationOption = null;
    }
    loadEventListeners(){
        buttonsElementsOfNumbers.forEach(button => {
            button.addEventListener('click', () => {
                const buttonValue = button.textContent; 
                this.handlerNumberSelected(buttonValue);
            });
        });
        buttonsElementsOfOperations.forEach(button => {
            button.addEventListener('click', () => {
                const buttonValue = button.textContent; // Obtén el valor del botón clicado
                this.handlerOperationSelected(buttonValue);
                
            });
        });
        buttonForDelete.addEventListener('click', () => {  
            this.handlerDeleteButton();
        });
        buttonForReset.addEventListener('click', () => {
            this.initializeProperties();
            this.displayNumberInTheScreen(this.numbersArray1);
        });
        buttonForAddPoint.addEventListener('click', () => {
            if (this.makeOperation === false ) {
                this.pointPressedArray1 = this.handleDecimalPoint(this.numbersArray1, this.pointPressedArray1);
            } else {
                this.pointPressedArray2 = this.handleDecimalPoint(this.numbersArray2, this.pointPressedArray2);
            }
  
        });
        buttonForMakeOperation.addEventListener('click', () => {
            this.handlerResultButton();
            
        });
    }
    handleDecimalPoint(array, pointFlag) {
        if (!pointFlag && array.length > 0) {
            array.push(',');
            pointFlag = true;
        }
        this.displayNumberInTheScreen(array);
        return pointFlag;
        
    }
    handlerNumberSelected(buttonValue) {
        const currentArray = this.makeOperation ? this.numbersArray2 : this.numbersArray1;
        currentArray.push(buttonValue);
        this.displayNumberInTheScreen(currentArray);
    }
    handlerDeleteButton() {
        const removedElement = this.makeOperation ? this.numbersArray2.pop() : this.numbersArray1.pop();
        if (removedElement === ',' && !this.makeOperation) {
            this.pointPressedArray1 = false;
        } else if (removedElement === ',' && this.makeOperation) {
            this.pointPressedArray2 = false;
        }
        this.displayNumberInTheScreen(this.makeOperation ? this.numbersArray2 : this.numbersArray1);
    }
    handlerOperationSelected(buttonValue) {
        const currentArray = this.makeOperation ? this.numbersArray2 : this.numbersArray1;
        let num1=0;
        let num2=0;
        if (this.makeOperation && this.numbersArray2.length > 0) {
            num1 =this.convertArrayToFloat(this.numbersArray1);
            num2 =this.convertArrayToFloat(this.numbersArray2); 
            let result = 0;
            switch (this.operationOption) {
                case '+':
                    result = this.addOperation(num1,num2);
                    break;
                case '-':
                    result = this.subOperation(num1,num2);
                    break;
                case '/':
                    result = this.splitOperation(num1,num2);
                    break;
                case 'x':
                    result = this.multiplyOperation(num1,num2);
                    break;
            
                default:
                    break;
            }
            this.formatArray(this.numbersArray2,this.pointPressedArray2);
            this.numbersArray1 = this.formatResult(result);
        }else if (this.numbersArray1.length > 0 || buttonValue ==='-') {
            if (this.numbersArray1.length === 0) {
                this.numbersArray1 = this.formatResult(this.subOperation(num1,num2));
            }else{
                this.makeOperation = true;
            }
        }
        this.displayNumberInTheScreen(this.numbersArray1);
        this.operationOption = buttonValue;
    }
    handlerResultButton(){

        if ( this.numbersArray1.length > 0 &&  this.numbersArray2.length > 0) {
            this.numbersArray1 = this.handlerOperationSelected(this.operationOption);
        }
        this.initializeProperties();
    }
    displayNumberInTheScreen(array){
        numberDisplay.textContent = array.join('');
    }
    // Cambia el . por la coma a la hora de mostrar el resultado y convierte la cadena formateada en un array
    formatResult(result) {
        return result.toLocaleString('es-ES').split('');
    }
    formatArray(array,arrayPointPressed){
        array.length = 0;
        arrayPointPressed = false;
    }
    // Convierte el contenido del array en un float
    convertArrayToFloat(array){
        return  parseFloat(array.join('').replace(',', '.'));
    }
    addOperation(num1,num2) {
       return num1 + num2;
    }
    subOperation(num1,num2) {
        return num1 - num2;
    }
    splitOperation(num1, num2) {
        if (num1 === 0) {
            alert("No se puede dividir entre 0");
            this.numbersArray1 = [];
            this.pointPressedArray1 = false;
            return 0;
        }
        return num1 / num2;
    }
    multiplyOperation(num1,num2) {
        return num1 * num2;
    }
    
}
export default CalculatorOperations;