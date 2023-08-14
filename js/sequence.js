/* mousemove.js -> 객체지향으로 코드 변경 */

class Sequence {
	#defaultOpt = {
		imgLength: 200,
		maskName: 'mask',
		imgURL: 'img/mousemove/pic',
		imgType: 'jpg',
	};

	constructor(selector, opt) {
		if (!selector) return console.error('선택자는 필수 입력항목입니다.');
		const resultOpt = { ...this.#defaultOpt, ...opt };

		this.target = selector;
		this.imgLength = resultOpt.imgLength;
		this.maskName = resultOpt.maskName;
		this.imgURL = resultOpt.imgURL;
		this.imgType = resultOpt.imgType;
		this.imgDOMArr = this.createImgs(this.target, this.imgLength);
		this.showMask();
		window.addEventListener('mousemove', (e) => this.matchMove(this.imgDOMArr, this.imgLength, e));

		Object.freeze(this);
	}

	createImgs(target, length) {
		const frame = document.querySelector(target);
		let imgs = '';
		for (let i = 0; i < length; i++) {
			imgs += `<img src='${this.imgURL}${i}.${this.imgType}' />`;
		}
		frame.innerHTML = imgs;

		return frame.querySelectorAll('img');
	}

	showMask() {
		/*
      - freeze로 인스턴스 객체를 고정시켰기 때문에 this.count로 인스턴스로 보내면 값의 증가가 불가능하다.
        -> showMask 함수 안쪽에 지역변수로 등록
    */
		let count = 0;

		const mask = document.createElement('aside');
		mask.classList.add(this.maskName);
		mask.style.transitionDuration = '0.5s';
		const convertedSpeed = this.convertSpeed(mask);
		mask.innerHTML = `<p>0%</p><div class="bar"></div>`;
		document.body.append(mask);

		this.imgDOMArr.forEach((img) => {
			img.onload = () => {
				count++;

				const percent = parseInt((count / this.imgLength) * 100);
				mask.querySelector('p').innerHTML = percent + '%';
				mask.querySelector('.bar').style.width = percent + '%';

				if (percent === 100) {
					console.log('이미지 소스 로딩 완료');
					mask.classList.add('off');

					setTimeout(() => {
						mask.remove();
					}, convertedSpeed);
				}
			};
			img.onerror = () => {
				console.log('이미지 출력 중 에러');
			};
		});
	}

	matchMove(domArr, length, e) {
		const percent = parseInt((e.clientX / window.innerWidth) * length);
		for (const img of domArr) img.style.display = 'none';
		domArr[percent].style.display = 'block';
	}

	convertSpeed(target) {
		return parseFloat(getComputedStyle(target).transitionDuration) * 1000;
	}
}
