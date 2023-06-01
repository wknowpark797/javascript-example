const numbers = document.querySelectorAll('.screen span');
const [am, pm] = document.querySelectorAll('.screen em');

// setInterval: 특정 시간마다 반복
setInterval(() => {
	const times = getTime();
	times.forEach((num, idx) => setTime(num, idx));
}, 1000);

function getTime() {
	const now = new Date();
	let hour = now.getHours();
	const minute = now.getMinutes();
	const second = now.getSeconds();

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
