/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

    $('#add_staff').click(function () {

        console.log($('#hid').val())
        console.log($('#sid').val())
        console.log($('#tenure').val())
        console.log($('#salary').val())

        $.post('/api/staff/add',
            {   hid : $('#hid').val(),
                sid : $('#sid').val(),
                tenure : $('#tenure').val(),
                salary : $('#salary').val()

            },
            function (data) {
                console.log(data);
            })

    })

})