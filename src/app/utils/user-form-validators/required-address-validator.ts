import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const requiredAddressValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const AddressGroup = control as FormGroup;

    const controlsToCheck = Object.keys(AddressGroup.controls).filter(ControlKey => ControlKey !== 'type' && ControlKey !== 'typeDescription'); // Removendo os campos 'type' e 'typeDescription' do array de chaves de controle, não há necessidade de validar esses campos, pois eles não são obrigatórios para o preenchimento do endereço.  

    const hasAnyText = controlsToCheck.some(controlKey => hasText(AddressGroup.get(controlKey))); // Verificando se algum dos campos obrigatórios do endereço possui texto preenchido{

    for (const controlName of controlsToCheck) {
        const control = AddressGroup.get(controlName);
        
        if(hasAnyText) {
            if(!control?.value) {
                control?.setErrors({ requiredAddressControl: true }); // Se algum campo obrigatório do endereço estiver vazio, adiciona o erro de validação 'required' ao controle correspondente
                control?.markAsTouched(); // Marca o controle como "tocado" para que a mensagem de erro seja exibida
            } else {
                control?.setErrors(null); // Se o campo obrigatório do endereço estiver preenchido, remove o erro de validação 'required' do controle correspondente
            }
        } else {
            control?.setErrors(null); // Se nenhum campo obrigatório do endereço estiver preenchido, remove o erro de validação 'required' de todos os controles
        }
    }
    
    return null;
};

const hasText = (control: AbstractControl | null): boolean => {
    return !!control && control.value && control.value.toString().trim ().length > 0;
}