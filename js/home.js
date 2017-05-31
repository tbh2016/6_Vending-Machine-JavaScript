var money = 0;


$(document).ready(function () {

    getItems();
    addMoney();

    // returnMoney();
});



//*****************************************************************************************//
//***************************GET ITEMS and CREATES CANDY BOXES********************************************************//
//*****************************************************************************************//-->
function getItems() {

    var itemRows = $('#vendingBox');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/items',
        success: function (data) {

            $.each(data, function (index, item) {
                var id = item.id;
                var name = item.name;
                var price = item.price;
                var quantity = item.quantity;

                var row = '<a onclick="pickItem(' + id + ')">';
                row += '<div class="col-md-3 box text-center dynamicBox">' + id;
                row += '<div class="text-center">' + name + '</div>';
                row += '<div class="text-center">$' + price + '</div>';
                row += '<div class="text-center">Quantity Left: ' + quantity + '</div>';
                row += '</div></a>';

                itemRows.append(row);
                // $('.left-side').append(row);
                // return (itemRows.append(row));
            });
        },
        error: function () {
            clearMessageBox();
            $('#errorMessages')
                .append($('<li>')
                    .attr({ class: 'list-group-item list-group-item-danger' })
                    .text('Error calling web service. Please try again later.'));
        }
    });
}
function pickItem(itemIdBox) {
    $('#itemIdBox').text(itemIdBox);
}



//*****************************************************************************************//
//***************************ADD MONEY********************************************************//
//*****************************************************************************************//-->
function addMoney() {

    
    $('#dollarButton').click(function (event) {
        money += 1;
        money = Math.round(money * 100) / 100;
        $('#messageMoneyBox').text(money);
        clearChangeBox();
        clearMessageBox();
    })

    $('#quarterButton').click(function (event) {
        money += .25;
        money = Math.round(money * 100) / 100;
        $('#messageMoneyBox').text(money);
        clearChangeBox();
        clearMessageBox();
    })

    $('#dimeButton').click(function (event) {
        money += .1;
        money = Math.round(money * 100) / 100;
        $('#messageMoneyBox').text(money);
        clearChangeBox();
        clearMessageBox();
    })

    $('#nickelButton').click(function (event) {
        money += .05;
        money = Math.round(money * 100) / 100;
        $('#messageMoneyBox').text(money);
        clearChangeBox();
        clearMessageBox();
    })

}



//*****************************************************************************************//
//***************************MAKE PURCHASE********************************************************//
//*****************************************************************************************//-->
$('#purchaseButton').click(makePurchase);

function makePurchase() {
    // console.log("In make purchase");
    var moneyBox = $('#messageMoneyBox').text().trim();      //defining moneyBox for url
    var itemId = $('#itemIdBox').text().trim();             //same
    // console.log(itemId);

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/money/' + moneyBox + '/item/' + itemId,
        success: function (data) {
            clearCandyBoxes();
            getItems();

            var q = data.quarters + " quarters";
            var d = data.dimes + " dimes";
            var n = data.nickels + " nickels";
            var p = data.pennies + " pennies";
            var sum = q + " " + d + " " + n + " " + p;
            $('#messageChangeResponseBox').text(sum);
            $('#messageResponseBox').text('THANK YOU!!!');
            clearMoneyBox();
            clearItemBox();
        },
        error: function (data2) {
            $('#messageResponseBox').text(data2.responseJSON.message);
        }
    });
}



//*****************************************************************************************//
//***************************RETURN CHANGE********************************************************//
//*****************************************************************************************//-->
$('#returnChangeButton').click(returnMoney);
function returnMoney() {
    var moneyBox = $('#messageMoneyBox').text().trim();
    
    quarters = 0;
    dimes = 0;
    nickels = 0;
    pennies = 0;

    while (moneyBox > 0) {
        if (moneyBox >= .25) {
            moneyBox = moneyBox - ((.25*100)/100);
            quarters++;
            moneyBox = moneyBox.toFixed(2);     //fixes the uneven quarter amount
        }
        else if (moneyBox >= .1) {
            moneyBox = moneyBox - ((.1*100)/100);
            dimes++;
        }
        else if (moneyBox >= .05) {
            moneyBox = moneyBox - ((.05*100)/100);
            nickels++;
        }
        else if(moneyBox >= .01) {
            moneyBox = moneyBox - ((.01*100)/100);
            pennies++;
        } else{
            break;
        }
    }
    var sum = quarters + " quarters " + dimes + " dimes " + nickels + " nickels " + pennies + " pennies ";
    $('#messageChangeResponseBox').text(sum);
    clearMoneyBox();
}
    // $.ajax({
    //     type: 'GET',
    //     url: 'http://localhost:8080/money/' + moneyBox + '/item/'+itemId,
    //     success: function (data3) {

    //         var q = data3.quarters + " quarters";
    //         var d = data3.dimes + " dimes";
    //         var n = data3.nickels + " nickels";
    //         var p = data3.pennies + " pennies";
    //         var sum = q + " " + d + " " + n + " " + p;
    //         $('#messageChangeResponseBox').text(sum);
    //         clearMoneyBox();
    //         clearItemBox();
    //     },
    //     error: function () {
    //         $('#messageResponseBox').text('');
    //     }
    // });




//***************************************************************************************** */
//***************************CLEAR CONTACTS************************** */
//***************************************************************************************** */
function clearCandyBoxes() {
    $('#vendingBox').empty();
}

function clearMoneyBox() {
    money = 0;
    $('#messageMoneyBox').text("");
}

function clearMessageBox() {
    $('#messageResponseBox').empty();
}

function clearItemBox() {
    $('#itemIdBox').empty();
}

function clearChangeBox(){
    $('#messageChangeResponseBox').empty();
}
