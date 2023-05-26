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

btns.forEach((btn, idx) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();

		if (e.currentTarget.classList.contains('on')) {
			return;
		}

		activation(btns, idx);
		activation(boxs, idx);

		matchHeight(idx);
	});
});

function activation(arr, idx) {
	for (const el of arr) el.classList.remove('on');
	arr[idx].classList.add('on');
}

function matchHeight(idx) {
	const onHeight = parseInt(getComputedStyle(boxs[idx]).height);

	new Anime(frame, {
		prop: 'height',
		value: onHeight,
		duration: convertedSpeed,
	});
}

function convertSpeed(el) {
	return parseFloat(getComputedStyle(el).transitionDuration) * 1000;
}

/* 
  과제: 모션 실행중 재이벤트 방지
*/
