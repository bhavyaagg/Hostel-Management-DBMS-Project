/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

    $('#add_application').click(function () {

        console.log($('#date').val())
        console.log($('#status').val())
        console.log($('#rno').val())
        console.log($('#aid').val())

        $.post('/addapplicant',
            {   date : $('#date').val(),
                status : $('#status').val(),
                rno : $('#rno').val(),
                aid : $('#aid').val()

            },
            function (data) {
                console.log(data);
            })

    })

})