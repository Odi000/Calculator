//Main Global Vars
const expression = document.querySelector('h1');
const evaluatedExp = document.querySelector('p');
const buttons = [...document.querySelectorAll('button')];

//Input
buttons.forEach(button => {
	button.addEventListener('click', () => {
		const btnValue = button.textContent;
		const actionBtn = /[C/*\-+=²√]/;
		const expContent = expression.textContent;
		const integer = /[\d√]/;
		//Input rules
		if (actionBtn.test(btnValue)) return engine[btnValue](btnValue);
		if (expression.clientWidth > 290) return;
		if (expContent === '0' && integer.test(btnValue)) expression.textContent = '';
		if (btnValue === '.' && expContent.includes('.')) return;
		expression.textContent += btnValue;
	})
})

//Calculator Calculation Engine Object
const engine = {
	'C': function(){
		expression.textContent = '0';
		evaluatedExp.textContent = '';	
	},
	'x²': function(){
		operand = parseFloat(expression.textContent);
		evaluatedExp.textContent = expression.textContent + '²';
		expression.textContent = operand * operand;
	},
	'√': function(){
		operand = parseFloat(expression.textContent);
		evaluatedExp.textContent = '√' + expression.textContent;
		expression.textContent = Math.sqrt(operand);
	},
	'/': function(){
		if (!evaluatedExp.textContent){
			evaluatedExp.textContent = expression.textContent + ' / ';
			expression.textContent = '0';
		}
	},
	'*': function(){
		if (!evaluatedExp.textContent){
			evaluatedExp.textContent = expression.textContent + ' * ';
			expression.textContent = '0';
		}
	},
	'-': function(){
		if (!evaluatedExp.textContent){
			evaluatedExp.textContent = expression.textContent + ' - ';
			expression.textContent = '0';
		}
	},
	'+': function(){
		if (!evaluatedExp.textContent){
			evaluatedExp.textContent = expression.textContent + ' + ';
			expression.textContent = '0';
		}
	},
	'=': function(){
		const allOprtrRegEx = /[/*\-+²√]/;
		const oprtrRegEx = /[/*\-+]/;
		let evalExpContent = evaluatedExp.textContent;
		let isNegative = false;

		if(!allOprtrRegEx.test(evalExpContent)) return;
		
		evalExpContent = evaluatedExp.textContent += expression.textContent;

		if (evalExpContent[0] == '-'){
			isNegative = true;
			evalExpContent = evalExpContent.replace('-','');
		}

		const operands = evalExpContent.split(oprtrRegEx);

		for(let i=0; i < operands.length; i++){
			if (i == 0 && isNegative){
				operands[i] = parseFloat(operands[i]) * -1;
				continue;
			}
			operands[i] = parseFloat(operands[i]);
		}


		console.log(operands)
	},
}