const main = document.querySelector('main');
const numbers = main.querySelectorAll('.screen span');
const [am, pm] = main.querySelectorAll('.screen em');

// setInterval: 특정 시간마다 반복
setInterval(() => {
	changeTheme();
	const times = getTime();
	times.forEach((num, idx) => setTime(num, idx));
}, 1000);

function changeTheme() {
	const hour = new Date().getHours();

	// data를 전역변수로 분리할 수 있는 방법 고민하기
	const data = [
		{
			cond: hour >= 5 && hour < 11,
			name: 'morning',
		},
		{
			cond: hour >= 11 && hour < 16,
			name: 'afternoon',
		},
		{
			cond: hour >= 16 && hour < 19,
			name: 'evening',
		},
		{
			cond: hour >= 19 || hour < 5,
			name: 'night',
		},
	];

	data.forEach((item) => {
		if (item.cond) {
			main.className = '';
			main.classList.add(item.name);
		}
	});

	if (main.classList.contains('afternoon')) {
		main.classList.add('dark');
	} else {
		main.classList.remove('dark');
	}

	/*
		[ 삼항 연산자 ]
		표현식을 활용한 간소화된 조건문 형태
		리액트의 JSX 내부에서 사용 가능한 제어문

		조건식 ? true일 때 실행할 구문 : false일 때 실행할 구문
	*/
}

function getTime() {
	const now = new Date();
	let hour = now.getHours();
	let minute = now.getMinutes();
	let second = now.getSeconds();

	if (hour > 12) {
		hour -= 12; // 13(시) -> 01(시) 변환
		am.classList.remove('on');
		pm.classList.add('on');
	} else {
		am.classList.add('on');
		pm.classList.remove('on');
	}

	return [hour, minute, second];
}

function setTime(num, idx) {
	if (num < 10) num = '0' + num;
	numbers[idx].innerText = num;
}
