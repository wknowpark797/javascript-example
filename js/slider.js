const frame = document.querySelector('#slider');
const panel = frame.querySelector('.panel');
const btns = frame.querySelectorAll('.btns li');
const ring = frame.querySelector('#rot');
const speed = 1000;
let preventEvent = false;

/* 
  1. activation, slidePanel, moveRing 함수 분리
  2. 활성화 버튼 재이벤트 방지
  3. 모션 실행 중 재이벤트 방지
*/

btns.forEach((btn, idx) => {
	btn.addEventListener('click', (e) => {
		const isOn = e.currentTarget.classList.contains('on');
		if (isOn || preventEvent) {
			return;
		}
		preventEvent = true;

		activation(btns, idx);
		slidePanel(panel, idx);
		moveRing(idx);
	});
});

function activation(arr, idx) {
	for (const el of arr) el.classList.remove('on');
	arr[idx].classList.add('on');
}

function slidePanel(el, idx) {
	new Anime(el, {
		prop: 'margin-left',
		value: -100 * idx + '%',
		duration: speed,

		// 화살표 함수에서 중괄호를 생략하고 괄호로 묶으면 해당 값을 자동 리턴
		callback: () => (preventEvent = false),
	});
}

function moveRing(idx) {
	console.dir(ring);
	ring.className = '';
	ring.classList.add(`rot${idx + 1}`);
}
