/* 
  [ anime.js 커스텀 플러그인 사용 ]
  - 성능을 고려한 requestAnimation 사용

  플러그인 제작
  - transition 모션과 스크립트 제어 모션(animate) 따로 만들기
  - transform 제어 X
*/

const frame = document.querySelector('main');
const btns = frame.querySelectorAll('nav ul li');
const boxs = frame.querySelectorAll('section article');
const convertedSpeed = convertSpeed(boxs[0]);
let preventEvent = false; // 모션 실행 중 여부

btns.forEach((btn, idx) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();

		// 재이벤트 방지 (활성화 탭, 실행 중인 모션)
		const isOn = e.currentTarget.classList.contains('on');
		if (isOn || preventEvent) {
			return;
		}
		preventEvent = true;

		activation(btns, idx);
		activation(boxs, idx);

		matchHeight(idx);
	});
});

function activation(arr, idx) {
	for (const el of arr) el.classList.remove('on'); // 초기화
	arr[idx].classList.add('on');
}

// 탭박스 높이변경 Anime
function matchHeight(idx) {
	const onHeight = parseInt(getComputedStyle(boxs[idx]).height);

	new Anime(frame, {
		prop: 'height',
		value: onHeight,
		duration: convertedSpeed,
		callback: () => {
			// 모든 모션이 끝난 후 실행
			preventEvent = false;
		},
	});
}

// 탭박스 transition-duration
function convertSpeed(el) {
	return parseFloat(getComputedStyle(el).transitionDuration) * 1000;
}
