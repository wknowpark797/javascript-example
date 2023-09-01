/* 
  객체지향 학습 후 실습
*/

class Anime {
	constructor(selector, props, duration, callback) {
		this.selector = selector;
		this.keys = Object.keys(props);
		this.values = Object.values(props);
		this.duration = duration;
		this.callback = callback;
		this.startTime = performance.now();
		this.isString = null;

		// props 객체에서 key, value값을 배열로 인스턴스 객체로 전달
		// 인스턴스 생성시 내부적으로 해당 배열의 값들을 setValue 메서드를 반복 호출하면서 인수로 전달
		this.keys.forEach((key, idx) => this.setValue(key, this.values[idx]));
	}

	// 인수로 전달된 key값에 따라 value, currentValue값을 가공하여 run 메서드에 전달하는 함수
	setValue(key, value) {
		// 현재 css에 적용되어 있는 값을 가져와 실수로 변환
		let currentValue = null;
		this.isString = typeof value;

		// 속성명이 일반적일 때 currentValue값 처리
		currentValue = parseFloat(getComputedStyle(this.selector)[key]);

		// 속성명이 scroll일 때 currentValue값 처리
		key === 'scroll'
			? (currentValue = this.selector.scrollY)
			: (currentValue = parseFloat(getComputedStyle(this.selector)[key]));

		// 속성명이 문자열일 때 currentValue값 처리
		if (this.isString === 'string') {
			const parentW = parseInt(getComputedStyle(this.selector.parentElement).width);
			const parentH = parseInt(getComputedStyle(this.selector.parentElement).height);

			const x = ['left', 'right', 'width'];
			const y = ['top', 'bottom', 'height'];
			if (key.includes('margin') || key.includes('padding'))
				return console.error('margin, padding값은 퍼센트 모션을 처리할 수 없습니다.');

			for (let cond of x) key === cond && (currentValue = (currentValue / parentW) * 100);
			for (let cond of y) key === cond && (currentValue = (currentValue / parentH) * 100);

			value = parseFloat(value);
		}

		// 변경하려는 value값과 현재 currentValue값이 같지 않을 때 각 조건에 따라 만들어진 값을 run 메서드에 전달
		value !== currentValue &&
			requestAnimationFrame((time) => this.run(time, key, currentValue, value));
	}

	run(time, key, currentValue, value) {
		let timelast = time - this.startTime;
		let progress = timelast / this.duration;

		progress < 0 && (progress = 0);
		progress > 1 && (progress = 1);
		progress < 1
			? requestAnimationFrame((time) => this.run(time, key, currentValue, value))
			: this.callback && this.callback();

		let result = currentValue + (value - currentValue) * progress;

		if (this.isString === 'string') this.selector.style[key] = `${result}%`;
		else if (key === 'opacity') this.selector.style[key] = result;
		else if (key === 'scroll') this.selector.scroll(0, result);
		else this.selector.style[key] = `${result}px`;
	}
}
