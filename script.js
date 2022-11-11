//Main Global Vars
const expression = document.querySelector('h1');
const evaluatedExp = document.querySelector('p');
const buttons = [...document.querySelectorAll('button')];

// const nrButtons = buttons.filter(button => /\d/.test(button.textContent));
// nrButtons.sort((a,b) => a.textContent-b.textContent);

buttons.forEach(button => {
    const btnValue = button.textContent;
    if(btnValue === 'C' || btnValue === '=') return;
    button.addEventListener('click', () => {
        if(expression.clientWidth > 290) return;
        if(btnValue === 'x²') {
            return expression.textContent += button.id;
        } expression.textContent += btnValue;
    })
})
