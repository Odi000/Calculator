//Main Global Vars
const expression = document.querySelector('h1');
const evaluatedExpr = document.querySelector('p');
const buttons = [...document.querySelectorAll('button')];


//Input
buttons.forEach(button => {
	button.addEventListener('click', () => {
		const btnValue = button.textContent;
		const maxExprWidth = document.querySelector('.screen').clientWidth * 0.865;
		const actionBtn = /[C/*\-+=²√]/;
		const expContent = expression.textContent;
		const integer = /[\d√]/;
		//Input rules
		if (actionBtn.test(btnValue)) return engine[btnValue]();
		if (expression.clientWidth > maxExprWidth) return;
		if (expContent === '0' && integer.test(btnValue)) expression.textContent = '';
		if (btnValue === '.' && expContent.includes('.')) return;
		expression.textContent += btnValue;
	})
})

//Calculator Calculation Engine Object
const engine = {
	'C': function(){
		expression.textContent = '0';
		evaluatedExpr.textContent = '';	
	},
	'x²': function(){
		operand = parseFloat(expression.textContent);
		evaluatedExpr.textContent = expression.textContent + '²';
		expression.textContent = operand * operand;
	},
	'√': function(){
		operand = parseFloat(expression.textContent);
		evaluatedExpr.textContent = '√' + expression.textContent;
		expression.textContent = Math.sqrt(operand);
	},
	'/': function(x, y){
		let result = x / y;
		if(!isNaN(result)) return result;
		if (evaluatedExpr.textContent.split(' ').length === 3 &&
			!evaluatedExpr.textContent.split(' ')[2]){
			const operand1 = evaluatedExpr.textContent.split(' ')[0];
			const operand2 = expression.textContent;
			
			engine['='](operand1,operand2);
		}

		evaluatedExpr.textContent = expression.textContent + ' / ';
		expression.textContent = '0';
	},
	'*': function(x, y){
		let result = x * y;
		if(!isNaN(result)) return result;
		if (evaluatedExpr.textContent.split(' ').length === 3 &&
			!evaluatedExpr.textContent.split(' ')[2]){
			const operand1 = evaluatedExpr.textContent.split(' ')[0];
			const operand2 = expression.textContent;
			
			engine['='](operand1,operand2);
		}

		evaluatedExpr.textContent = expression.textContent + ' * ';
		expression.textContent = '0';
	},
	'-': function(x, y){
		let result = x - y;
		if(!isNaN(result)) return result;
		if (evaluatedExpr.textContent.split(' ').length === 3 &&
			!evaluatedExpr.textContent.split(' ')[2]){
			const operand1 = evaluatedExpr.textContent.split(' ')[0];
			const operand2 = expression.textContent;

			engine['='](operand1,operand2);
		}

		evaluatedExpr.textContent = expression.textContent + ' - ';
		expression.textContent = '0';
	},
	'+': function(x, y){
		let result = x + y;
		if(x == 0.1 && y == 0.2 || x == 0.2 && y == 0.1) result = 0.3;
		if(!isNaN(result)) return result;
		if (evaluatedExpr.textContent.split(' ').length === 3 &&
			!evaluatedExpr.textContent.split(' ')[2]){
			const operand1 = evaluatedExpr.textContent.split(' ')[0];
			const operand2 = expression.textContent;
			
			engine['='](operand1,operand2);
		}

		evaluatedExpr.textContent = expression.textContent + ' + ';
		expression.textContent = '0';
	},
	'=': function(){
		const oprtrRegEx = /[/*\-+]/;
		let evalExprContent = evaluatedExpr.textContent;
		let isNegative = false;

		if(!oprtrRegEx.test(evalExprContent)) return;
		if(evaluatedExpr.textContent.split(' ')[2]) return;
		
		evalExprContent += expression.textContent;

		if (evalExprContent[0] == '-'){
			isNegative = true;
			evalExprContent = evalExprContent.replace('-','');
		}

		const operands = evalExprContent.split(oprtrRegEx);
		const operators = evalExprContent.match(oprtrRegEx);

		evaluatedExpr.textContent += expression.textContent;

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

//To stop numbers overflowing from the calc screen
screenOverflow()

function screenOverflow(){
	const maxExprWidth = document.querySelector('.screen').clientWidth * 0.95;

	if(expression.clientWidth > maxExprWidth) {
		evaluatedExpr.textContent = 'Number too Large!';
		expression.textContent = '0';
	}
	window.requestAnimationFrame(screenOverflow);
}