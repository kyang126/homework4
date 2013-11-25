//document ready function
var total = 0;
$(function(){

    //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){

        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };
        
        //push the new item on to the items array
        cart.items.push(newCartItem);
        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
        renderCart(cart);

        $('.remove-item').click(function(){ 
            var idxToRemove = this.getAttribute('data-index');
            cart.items.splice(idxToRemove, 1);
            renderCart(cart);
        }); 

         $('.startOver').click(function(){ 
            cart.items.length = 0;
            renderCart(cart);
        }); 

            
        $('.cart-form').submit(function(){
            
            var nameInput = $('.cart-form input[name="name"]');
            var nameValue = nameInput.val();
            cart.name = nameValue;
            var addressInput = $('.cart-form input[name="address1"]');
            var addressValue = addressInput.val();
            if (Modernizr.localstorage) {
                localStorage.getItem(addressValue);
                localStorage.setItem(addressValue, cart.address1);
            }
            cart.address1 = addressValue;
            var zipInput = $('.cart-form input[name="zip"]');
            var zipValue = zipInput.val();
            cart.zip = zipValue;
            var phoneInput = $('.cart-form input[name="phone"]');
            var phoneValue = phoneInput.val();
            cart.phone = phoneValue;
            
             if (total > 20)
                postCart(cart, $('.cart-form'));
              
            else {
                alert("A minimum of 20 dollar order!");
                return false;        
            }

        });

    });
  
}); //doc ready

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>
//
function renderCart(cart) {
    var container = $('.cart-container');
    var container1 = $('.item-container');
    var idx, item;
    var subtotal = 0;
    var tax = 0;
    var instance;
    var instance1;
    var template = $('.cart-footer');
    var template1 = $('.cart-item');
    var itemName='';
    //empty the container of whatever is there currently

    container.empty();
    container1.empty();

    //for each item in the cart...
    for (idx = 0; idx < cart.items.length; ++idx) {
        instance = template.clone();
        instance1 = template1.clone();
        item = cart.items[idx];
        subtotal += +item.price;
        tax += +item.price*0.095;
        //TODO: code to render the cart item

        if(item.size != ''){
            instance1.find('.itemNames').html(item.name + '(' +item.size+')');
        } else {
            instance1.find('.itemNames').html(item.name);
        }
        
        instance1.removeClass('template');
        instance1.removeClass('cart-item');
        container1.append(instance1);
    } //for each cart item
    //TODO: code to render sub-total price of the cart
    //the tax amount (see instructions), 
    //and the grand total

    total = +subtotal + +tax;
    total = total.toFixed(2);
    subtotal = subtotal.toFixed(2);
    tax = tax.toFixed(2);
    instance.find('.total-price').html(total);
    instance.find('.subtotal-price').html(subtotal);
    instance.find('.tax-price').html(tax);
    instance.removeClass('template');
    instance.removeClass('cart-footer');

    
    container1.fadeIn(1000);
    container.append(instance);
    container.fadeIn(1000);
    
} //renderCart()

// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    cartForm.find('input[name="cart"]').val(JSON.stringify(cart));

    //submit the form--this will navigate to an order confirmation page
    cartForm.submit();

} //postCart()