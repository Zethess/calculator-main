import { radioTheme1, radioTheme2, radioTheme3, buttonsContainer, buttonsElements, mainScreen, headerContentText, headerRadioBox, mainElement } from './domQueries.js';

class ColorChangeManager {
    constructor() {
        this.loadEventListeners();
    }

    loadEventListeners() {
        radioTheme1.addEventListener('change', () => {
            if (radioTheme1.checked) {
                this.radioTheme1Changes();
            }
        });
        radioTheme2.addEventListener('change', () => {
            if (radioTheme2.checked) {
               this.radioThemesChanges(2);
            }
        });

        radioTheme3.addEventListener('change', () => {
            if (radioTheme3.checked) {
                this.radioThemesChanges(3);
            }
        });
    }
    radioTheme1Changes(){
        this.deleteLatestClassAdded(buttonsContainer);
        buttonsElements.forEach(buttonsElements => {
            this.deleteLatestClassAdded(buttonsElements);
        });
        this.deleteLatestClassAdded(mainScreen);
        this.deleteLatestClassAdded(headerContentText);
        this.deleteLatestClassAdded(mainElement);
        this.deleteLatestClassAdded(headerRadioBox);
    }
    radioThemesChanges(indexOfRadioToBeModified){
        let indexOfRadioToBeEliminated = indexOfRadioToBeModified + 1;
        if (indexOfRadioToBeModified === 3) {
            indexOfRadioToBeEliminated = 2;
        }
        this.colorClassHandler(buttonsContainer,`calculator-buttons-theme${indexOfRadioToBeModified}`,`calculator-buttons-theme${indexOfRadioToBeEliminated}`);
        buttonsElements.forEach(buttonsElements => {
            this.colorClassHandler(buttonsElements,`btn-theme${indexOfRadioToBeModified}`,`btn-theme${indexOfRadioToBeEliminated}`);
        });
        this.colorClassHandler(mainScreen,`calculator-screen-theme${indexOfRadioToBeModified}`,`calculator-screen-theme${indexOfRadioToBeEliminated}`);
        this.colorClassHandler(headerContentText,`calculator-top-theme${indexOfRadioToBeModified}`,`calculator-top-theme${indexOfRadioToBeEliminated}`);
        this.colorClassHandler(mainElement,`main-theme-${indexOfRadioToBeModified}`,`main-theme-${indexOfRadioToBeEliminated}`);
        this.colorClassHandler(headerRadioBox,`radio-box-theme${indexOfRadioToBeModified}`,`radio-box-theme${indexOfRadioToBeEliminated}`);
    }
    colorClassHandler(element, classNameToAdd,classNameToDelete) {
        if (element.classList.contains(classNameToDelete)) {
            element.classList.remove(classNameToDelete);
        }
        element.classList.add(classNameToAdd);
    }
    deleteLatestClassAdded(element){
        const clases = element.classList;
        const ultimaClaseAgregada = clases.item(clases.length - 1);
        if (ultimaClaseAgregada) {
            element.classList.remove(ultimaClaseAgregada);
        }

    }
}
export default ColorChangeManager;
