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

//========================================================================================
/*                                CRUD Operations                                       */
//========================================================================================