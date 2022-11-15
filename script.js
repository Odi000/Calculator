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
		if (actionBtn.test(btnValue)) return engine[btnValue]();
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
	'/': function(x, y){
		const result = x / y;
		if(!isNaN(result)) return result;
		if (evaluatedExp.textContent.split(' ').length === 3 &&
			!evaluatedExp.textContent.split(' ')[2]){
			const operand1 = evaluatedExp.textContent.split(' ')[0];
			const operand2 = expression.textContent;
			
			engine['='](operand1,operand2);
		}

		evaluatedExp.textContent = expression.textContent + ' / ';
		expression.textContent = '0';
	},
	'*': function(x, y){
		const result = x * y;
		if(!isNaN(result)) return result;
		if (evaluatedExp.textContent.split(' ').length === 3 &&
			!evaluatedExp.textContent.split(' ')[2]){
			const operand1 = evaluatedExp.textContent.split(' ')[0];
			const operand2 = expression.textContent;
			
			engine['='](operand1,operand2);
		}

		evaluatedExp.textContent = expression.textContent + ' * ';
		expression.textContent = '0';
	},
	'-': function(x, y){
		const result = x - y;
		if(!isNaN(result)) return result;
		if (evaluatedExp.textContent.split(' ').length === 3 &&
			!evaluatedExp.textContent.split(' ')[2]){
			const operand1 = evaluatedExp.textContent.split(' ')[0];
			const operand2 = expression.textContent;

			engine['='](operand1,operand2);
		}

		evaluatedExp.textContent = expression.textContent + ' - ';
		expression.textContent = '0';
	},
	'+': function(x, y){
		const result = x + y;
		if(!isNaN(result)) return result;
		if (evaluatedExp.textContent.split(' ').length === 3 &&
			!evaluatedExp.textContent.split(' ')[2]){
			const operand1 = evaluatedExp.textContent.split(' ')[0];
			const operand2 = expression.textContent;
			
			engine['='](operand1,operand2);
		}

		evaluatedExp.textContent = expression.textContent + ' + ';
		expression.textContent = '0';
	},
	'=': function(){
		const oprtrRegEx = /[/*\-+]/;
		let evalExpContent = evaluatedExp.textContent;
		let isNegative = false;

		if(!oprtrRegEx.test(evalExpContent)) return;
		if(evaluatedExp.textContent.split(' ')[2]) return;
		
		evalExpContent += expression.textContent;

		if (evalExpContent[0] == '-'){
			isNegative = true;
			evalExpContent = evalExpContent.replace('-','');
		}

		const operands = evalExpContent.split(oprtrRegEx);
		const operators = evalExpContent.match(oprtrRegEx);

		evaluatedExp.textContent += expression.textContent;

		for(let i=0; i < operands.length; i++){
			if (i == 0 && isNegative){
				operands[i] = parseFloat(operands[i]) * -1;
				continue;
			}
			operands[i] = parseFloat(operands[i]);
		}

		expression.textContent = engine[operators[0]](operands[0],operands[1]);
	},
}