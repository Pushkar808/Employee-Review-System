const range = document.querySelectorAll('#rating-range input');
const range_placeholder = document.querySelectorAll('#rating-value')

for (let i = 0; i < range.length; i++) {
    range[i].addEventListener('change', () => {
        range_placeholder[i].innerHTML = range[i].value;
        range_placeholder[i].className=i
        //setting value for tooltip

        
        $('.'+i).attr('title',range[i].value);//initial title
        $('.'+i).attr('data-bs-original-title',range[i].value);//after change titile
        $('.'+i).tooltip('show');
        setTimeout(function(){
            $('.'+i).tooltip('hide')
        }, 2000);
    })
}


const button = document.querySelector('#button');
const tooltip = document.querySelector('#tooltip');

const popperInstance = Popper.createPopper(button, tooltip);


//to show or hide add interview form
$('#signup').click(() => {
    $('#login-form').toggle('slow', () => {
        if ($('#signup-form').css('display') == "none")
            $('#signup-form').css('display', 'inline');
        else
            $('#signup-form').css('display', 'none');
    });
})

$('#login').click(() => {
    $('#signup-form').toggle('slow', () => {
        if ($('#login-form').css('display') == "none")
            $('#login-form').css('display', 'inline');
        else
            $('#login-form').css('display', 'none');
    });
})