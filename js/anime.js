/* 
  객체지향 학습 후 실습
*/

class Anime {
	constructor(selector, option) {
		console.log(selector);
		this.selector = selector;
		this.option = option;
		this.startTime = performance.now();
		this.currentValue = null;

		this.option.prop === 'scroll'
			? (this.currentValue = this.selector.scrollY)
			: (this.currentValue = parseFloat(getComputedStyle(this.selector)[this.option.prop]));

		this.isString = typeof this.option.value;
		if (this.isString === 'string') {
			const parentW = parseInt(getComputedStyle(this.selector.parentElement).width);
			const parentH = parseInt(getComputedStyle(this.selector.parentElement).height);

			const x = ['left', 'right', 'width'];
			const y = ['top', 'bottom', 'height'];
			const errProps = [
				'margin-left',
				'margin-right',
				'padding-left',
				'padding-right',
				'margin-top',
				'margin-bottom',
				'padding-top',
				'padding-bottom',
			];

			for (let cond of errProps)
				if (this.option.prop === cond)
					return console.error('margin, padding값은 퍼센트 모션을 처리할 수 없습니다.');

			for (let cond of x)
				this.option.prop === cond && (this.currentValue = (this.currentValue / parentW) * 100);
			for (let cond of y)
				this.option.prop === cond && (this.currentValue = (this.currentValue / parentH) * 100);

			this.option.value = parseFloat(this.option.value);
		}
		this.option.value !== this.currentValue && requestAnimationFrame((time) => this.run(time));
	}
	run(time) {
		console.log(this);
		let timelast = time - this.startTime;
		let progress = timelast / this.option.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1
			? requestAnimationFrame((time) => this.run(time))
			: this.option.callback && this.option.callback();

		let result = this.currentValue + (this.option.value - this.currentValue) * progress;

		if (this.isString === 'string') this.selector.style[this.option.prop] = `${result}%`;
		else if (this.option.prop === 'opacity') this.selector.style[this.option.prop] = result;
		else if (this.option.prop === 'scroll') this.selector.scroll(0, result);
		else this.selector.style[this.option.prop] = `${result}px`;
	}
}
