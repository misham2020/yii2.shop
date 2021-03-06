jQuery(document).ready(function ($) {

    $(".scroll").click(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });

    var navoffeset = $(".agileits_header").offset().top;
    $(window).scroll(function () {
        var scrollpos = $(window).scrollTop();
        if (scrollpos >= navoffeset) {
            $(".agileits_header").addClass("fixed");
        } else {
            $(".agileits_header").removeClass("fixed");
        }
    });

    $(".dropdown").hover(
        function () {
            $('.dropdown-menu', this).stop(true, true).slideDown("fast");
            $(this).toggleClass('open');
        },
        function () {
            $('.dropdown-menu', this).stop(true, true).slideUp("fast");
            $(this).toggleClass('open');
        }
    );

    $().UItoTop({
        easingType: 'easeOutQuart'
    });


});

$(window).load(function () {
    $('.flexslider').flexslider({
        animation: "slide",
        start: function (slider) {
            $('body').removeClass('loading');
        }
    });
});
/* Cart */



function getCart(){
    $.ajax({
        url: 'cart/show',
        type: 'GET',
        success: function (res) {
            if(!res) alert('Ошибка!')
            showCart(res);
        },
        error: function(){
            alert('Неверно указан путь!');
        }
    });

}

function cartClear(){
    $.ajax({
        url: 'cart/clear',
        type: 'GET',
        success: function (res) {
            if(!res) alert('Ошибка!')
            showCart(res);
        },
        error: function(){
            alert('Error!');
        }
    });

}

function showCart(cart){
    $('#modal-cart .modal-body').html(cart); 
    $('#modal-cart').modal();
    let cartSum = $('#cart-sum').text() ? $('#cart-sum').text() : '0$';
     if(cartSum){
        $('.cartSum').text(cartSum);
     }
} 




$('.add-to-cart').on('click', function () {
    let id = $(this).data('id');
    $.ajax({
        url: 'cart/add',
        data: {id: id},
        type: 'GET',
        success: function (res) {
            if(!res) alert('Ошибка добавления товара!')
            showCart(res);
        },
        error: function(){
            alert('Неверно указан путь!');
        }
    });
    return false;
});

$('#modal-cart .modal-body').on('click', '.del-item', function () {
    let id = $(this).data('id');
    $.ajax({
        url: 'cart/del-item',
        data: {id: id},
        type: 'GET',
        success: function (res) {
            if(!res) alert('Ошибка!')
            showCart(res);
        },
        error: function(){
            alert('Error!');
        }
    });
});

/* Cart */

paypal.minicart.render();

paypal.minicart.cart.on('checkout', function (evt) {
    var items = this.items(),
        len = items.length,
        total = 0,
        i;

    // Count the number of each item in the cart
    for (i = 0; i < len; i++) {
        total += items[i].get('quantity');
    }

    if (total < 3) {
        alert('The minimum order quantity is 3. Please add more to your shopping cart before checking out');
        evt.preventDefault();
    }
});