const mask = document.querySelector('aside');
const target = 'figure';
const imgLength = 200;
const convertedSpeed = convertSpeed(mask);

const imgDOMArr = createImgs(target, imgLength);
startLoading(mask, imgDOMArr, imgLength);

// 로딩 화면 함수
function startLoading(mask, domArr, length) {
	let count = 0;

	domArr.forEach((img) => {
		// 시스템 발생 이벤트
		img.onload = () => {
			count++;

			const percent = parseInt((count / length) * 100);
			mask.querySelector('p').innerHTML = percent + '%';
			mask.querySelector('.bar').style.width = percent + '%';

			if (percent === 100) {
				console.log('이미지 소스 로딩 완료');
				mask.classList.add('off');

				setTimeout(() => {
					mask.remove(); // DOM 자체 제거
				}, convertedSpeed);
			}
		};
		img.onerror = () => {
			console.log('이미지 출력 중 에러');
		};
	});
}

// 마우스를 이동할 때마다 이벤트 발생
window.addEventListener('mousemove', (e) => {
	matchMove(imgDOMArr, imgLength, e);
});

// 동적 이미지 생성 함수
function createImgs(target, length) {
	const frame = document.querySelector(target);
	let imgs = '';
	for (let i = 0; i <= length; i++) {
		imgs += `<img src='img/mousemove/pic${i}.jpg' />`;
	}
	frame.innerHTML = imgs;

	return frame.querySelectorAll('img');
}

// 마우스 포인터 위치와 이미지 순서 매칭 함수
function matchMove(domArr, length, e) {
	/*
    [ 백분율 구하기 ]
    현재수치(마우스 포인터 위치값) / 전체수치(현재 브라우저 넓이값) * 100
  */
	const percent = parseInt((e.clientX / window.innerWidth) * length);

	for (const img of domArr) {
		img.style.display = 'none'; // 초기화
	}
	domArr[percent].style.display = 'block';
}

function convertSpeed(target) {
	return parseFloat(getComputedStyle(target).transitionDuration) * 1000;
}

/*
  window.outerWidth: 개발자 도구 창 포함 너비
  window.innerWidth: 개발자 도구 창 미포함 너비
*/
