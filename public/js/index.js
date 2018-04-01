/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

    $('#addhostel').click(function () {

        console.log($('#hid').val())
        console.log($('#name').val())
        console.log($('#capacity').val())

        $.post('/addhostel',
            {hid : $('#hid').val(),
                name : $('#name').val(),
                capacity : $('#capacity').val()},
            function (data) {
                console.log(data);
            })

    })

})