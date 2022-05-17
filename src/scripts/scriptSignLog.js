
const inputs = document.querySelectorAll('input')
inputs.forEach((input) => {
    input.addEventListener('input', function() {
        console.log(input.value !== '')
        input.value !== '' ?

        input.nextElementSibling.classList.add('fill') :

        input.nextElementSibling.classList.remove('fill')

    })
})