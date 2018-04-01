/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

    $('#add_applicant').click(function () {

        console.log($('#name').val())
        console.log($('#rno').val())

        $.post('/addapplicant',
            {   name : $('#name').val(),
                rno : $('#rno').val()},
            function (data) {
                console.log(data);
            })

    })

})