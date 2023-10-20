import ColorChangeManager from './colorChangeManager.js';
const buttonsElementsOfNumbers = document.querySelectorAll('.btn-numbers');
const buttonsElementsOfOperations = document.querySelectorAll('.btn-operations');
const buttonForDelete = document.getElementById('btn-del');
const buttonForReset = document.getElementById('btn-reset');
const buttonForAddPoint = document.getElementById('btn-point');
const buttonForMakeOperation = document.getElementById('btn-equal');
const numberDisplay = document.getElementById('number');

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
            const buttonValue = buttonForMakeOperation.textContent; // Obtén el valor del botón clicado
            console.log('Botón clicado:', buttonValue);
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
        this.displayNumberInTheScreen(currentArray);
        if (this.makeOperation === true && this.numbersArray2.length > 0) {
            switch (buttonValue) {
                case '+':
                    this.addOperation();
                    break;
                case '-':
                    this.subOperation();
                    break;
                case '/':
                    this.splitOperation();
                    break;
                case 'x':
                    this.multiplyOperation();
                    break;
            
                default:
                    break;
            }
            this.numbersArray2 = [];
            this.pointPressedArray2 = false;
        }else{
            this.makeOperation = true;
        }
        this.displayNumberInTheScreen(this.numbersArray1);
        this.operationOption = buttonValue;
    }
    displayNumberInTheScreen(array){
        numberDisplay.textContent = array.join('');
    }
    addOperation() {
        let num1 = parseFloat(this.numbersArray1.join('').replace(',', '.')); // Convierte el primer número en un float
        let num2 = parseFloat(this.numbersArray2.join('').replace(',', '.')); // Convierte el segundo número en un float
    
        let result = num1 + num2; 
    
        // Cambia el . por la coma a la hora de mostrar el resultado y convierte la cadena formateada en un array
        this.numbersArray1 = result.toLocaleString('es-ES').split('');
    }
    subOperation() {

    }
    
    
}
const colorChangeManager = new ColorChangeManager();
const calculatorOperations = new CalculatorOperations();