//Main Global Vars
const expression = document.querySelector('h1');
const evaluatedExp = document.querySelector('p');
const buttons = [...document.querySelectorAll('button')];

//Input
buttons.forEach(button => {
	button.addEventListener('click', () => {
		const btnValue = button.textContent;
		const actionBtn = /[C/*\-+=]/;
		const expContent = expression.textContent;
		const onlyZero = /^0$/;
		const integer = /\d/;
		//Input rules
		if (actionBtn.test(btnValue)) return engine[btnValue](btnValue);
		if (expression.clientWidth > 290) return;
		if (onlyZero.test(expContent) && integer.test(btnValue)) expression.textContent = '';
		if (btnValue === '.' && expContent.includes('.')) return;
		if (/[²√]/.test(button.textContent) && expContent[expContent.length - 1] === '√') return;
		if (button.id === '²' && expContent[expContent.length - 1] === '²') return;
		if (btnValue === 'x²') return expression.textContent += button.id;
		expression.textContent += btnValue;
	})
})

//Calculator Calculation Engine Object
const engine = {
	'C': function(){
		expression.textContent = '0';
		evaluatedExp.textContent = '';	
	},
	'²': function(){},
	'√': function(){},
	'/': function(){
		if (!evaluatedExp.textContent){
			evaluatedExp.textContent = expression.textContent + '/';
			expression.textContent = '0';
		}
	},
	'*': function(){},
	'-': function(){},
	'+': function(){},
	'=': function(){
		const allOprtrRegEx = /[/*\-+²√]/;
		const oprtrRegEx = /[/*\-+]/;
		const evalExpContent = evaluatedExp.textContent;
		let isNegative = false;

		if (evalExpContent.textContent[0]){
			isNegative = true;
		}

		if(!allOprtrRegEx.test(evalExpContent)) return;

		evaluatedExp.textContent += expression.textContent ;
		const operands = evaluatedExp.textContent.split(oprtrRegEx);

		console.log(operands)
	},
}