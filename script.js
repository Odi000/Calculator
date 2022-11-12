//Main Global Vars
const expression = document.querySelector('h1');
const evaluatedExp = document.querySelector('p');
const buttons = [...document.querySelectorAll('button')];

//Input
buttons.forEach(button => {
	const btnValue = button.textContent;
	if (btnValue === 'C' || btnValue === '=') return;

	button.addEventListener('click', () => {
		const operator = /[]/;
		const expContent = expression.textContent;

		if (expression.clientWidth > 290) return;
		if (/[²√]/.test(button.textContent) && expContent[expContent.length - 1] === '√') return;
		if (button.id === '²' && expContent[expContent.length - 1] === '²') return;
		if (btnValue === 'x²') {
			return expression.textContent += button.id;
		} expression.textContent += btnValue;
	})
})

//Calculator Engine Object
const engine = {
	'C': function(){},
	'²': function(){},
	'√': function(){},
	'/': function(){},
	'*': function(){},
	'-': function(){},
	'+': function(){},
	'=': function(){},
}