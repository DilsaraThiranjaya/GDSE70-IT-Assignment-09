//========================================================================================
/*                               Validations & Form Control                             */
//========================================================================================

// Validate with regex pattern for Customer ID and Contact Number in real-time
$('#txt-save-cid, #txt-save-cno').on('input', realTimeValidate);

// Reset form validation when Close button is clicked
$('#close-savec-btn, #close-savec-icon').on('click', function () { 
    resetForm('#save-customer', '#txt-save-cid, #txt-save-cno');
});

function realTimeValidate() {
    const value = $(this).val();
    const pattern = new RegExp($(this).attr('pattern')); // Get the pattern from the input field

    if (pattern.test(value)) {
        // If the input matches the pattern, show valid feedback
        $(this).removeClass('is-invalid');
        $(this).addClass('is-valid');
        $(this).next().hide(); // Hide error message
    } else {
        // If the input doesn't match the pattern, show invalid feedback
        $(this).removeClass('is-valid');
        $(this).addClass('is-invalid');
        $(this).next().show(); // Show error message
    }
}

function validateForm(formId) {
    let form = $(formId);
    
    // Trim all text fields
    form.find('input[type="text"], textarea').each(function() {
         $(this).val($(this).val().trim());
    });
 
    // Check form validity
    if (!form[0].checkValidity()) {
        form.addClass('was-validated');
        return false;
    } else {
        form.removeClass('was-validated');
        return true;
    }
}

function resetForm(formId, textFieldIds) {
    let form = $(formId);
    form[0].reset(); // Clear all form fields
    form.removeClass('was-validated'); // Hide validation errors
    $(textFieldIds).removeClass('is-invalid is-valid'); // Remove validation classes
    $(textFieldIds).next().hide(); // Hide error messages
}

//========================================================================================
/*                                CRUD Operations                                       */
//========================================================================================

// Save Customer - Using form submit instead of button click
$('#save-customer').on('submit', function (event) {
    event.preventDefault();

    let isValidated = validateForm('#save-customer');

    if (isValidated) {
        const id = $('#txt-save-cid').val();
        const name = $('#txt-save-cname').val();
        const address = $('#txt-save-caddress').val();
        const contactNo = $('#txt-save-cno').val();

        const customer = new Customer(id, name, address, contactNo);

        if (!customerDatabase.some(existingCustomer => existingCustomer.id === id)) {
            customerDatabase.push(customer);
            showToast('success', 'Customer saved successfully !');
            resetForm('#save-customer', '#txt-save-cid, #txt-save-cno');
        } else {
            showToast('error', 'Customer ID already exists !');
        }

        console.log(customerDatabase);
    }
});