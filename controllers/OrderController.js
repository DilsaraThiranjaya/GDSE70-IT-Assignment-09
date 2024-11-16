//========================================================================================
/*                                 Startup Initialization                               */
//========================================================================================

initializeNextOrderId();
initializeCurrentDate();
initializeOrderComboBoxes();

//========================================================================================
/*                               Validations & Form Control                             */
//========================================================================================

// Event delegation setup
$('#order-detail-tbody').on('click', '.btn-danger', function() {
    $(this).closest('tr').remove();  // Only removes the tr containing the clicked button
});

$('#tab-content-3 input[type="date"], #tab-content-3 input[pattern]').on('input change', realTimeValidate);

$('#txt-order-qty').on('input', validateOrderQuantity);

//========================================================================================
/*                                 Other Functions                                      */
//========================================================================================

function initializeNextOrderId() {
    const prevCode = orderDatabase.length > 0 ? orderDatabase[orderDatabase.length - 1].orderId : 'O000';
    const nextCode = generateNextID(prevCode);
    $('#txt-order-id').val(nextCode);
    $('#txt-order-id').removeClass('is-invalid').addClass('is-valid');
}

function initializeCurrentDate() {
    const currentDate = new Date().toISOString().split('T')[0];
    $('#txt-order-date').val(currentDate);
    $('#txt-order-date').removeClass('is-invalid').addClass('is-valid');
}

function initializeOrderComboBoxes() {
    // Clear existing options first (keeping the first empty/default option if exists)
    $('#select-customer-id').find('option:not(:first)').remove();
    $('#select-item-code').find('option:not(:first)').remove();

    customerDatabase.forEach(c => {
        $('#select-customer-id').append(`<option value="${c.id}">${c.id}</option>`);
    });

    itemDatabase.forEach(i => {
        $('#select-item-code').append(`<option value="${i.code}">${i.code}</option>`);
    });
}

function getOrderById(id) {
    return orderDatabase.find(o => o.orderId === id);
}

function appendToOrderTable(orderDetail) {
    const item = getItemByCode(orderDetail.itemCode);
    $('#order-detail-tbody').append(`
        <tr>
            <td>${orderDetail.itemCode}</td>
            <td>${item.name}</td>
            <td>${parseFloat(item.price).toFixed(2)}</td>
            <td>${orderDetail.qty}</td>
            <td>${parseFloat(item.price * orderDetail.qty).toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm">Remove</button></td>
        </tr>
    `);
}

function validateOrderQuantity() {
    const input = $(this);
    const qty = parseInt(input.val());
    const pattern = new RegExp(input.attr('pattern'));
    const itemCode = $('#txt-item-code').val();
    const item = getItemByCode(itemCode);

    // First check pattern validation
    if (!pattern.test(input.val())) {
        input.removeClass('is-valid').addClass('is-invalid');
        input.next().text('Enter a valid Quantity').show();
        return;
    }

    // Then check quantity validation if item exists
    if (item) {
        if (qty > 0 && qty <= item.qty) {
            input.removeClass('is-invalid').addClass('is-valid');
            input.next().hide();
        } else if (qty > item.qty) {
            input.removeClass('is-valid').addClass('is-invalid');
            input.next().text('Quantity exceeds available stock').show();
        }
    } else {
        // If no item is selected yet
        if (qty > 0) {
            input.removeClass('is-invalid').addClass('is-valid');
            input.next().hide();
        } else {
            input.removeClass('is-valid').addClass('is-invalid');
            input.next().text('Enter a valid Quantity').show();
        }
    }
}

//========================================================================================
/*                                CRUD Operations                                       */
//========================================================================================

// Save Order

// Update Order

// Delete Order

// Search Order

// Clear Order

// Add Item (Load Item Details)
$('#select-item-code, #txt-item-code').on('input change', function () {
    const itemCode = $(this).val();
    const item = getItemByCode(itemCode);
    if (item) {
        $('#select-item-code, #txt-item-code').val(item.code);
        $('#txt-item-name').val(item.name);
        $('#txt-item-price').val(parseFloat(item.price).toFixed(2));
        $('#txt-item-qty').val(item.qty);
        $('#txt-item-code, #txt-item-name, #txt-item-price, #txt-item-qty').removeClass('is-invalid').addClass('is-valid');
    } else {
        $('#select-item-code, #txt-item-name, #txt-item-price, #txt-item-qty').removeClass('is-valid').val('');
        $('#txt-item-code').val(itemCode);
    }
});

// Add Item
$('#item-select').on('submit', function (event) {
    event.preventDefault();

});