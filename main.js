// 1. 시간/분/초 입력할 수 있습니다.
// 2. Start를 누르면 타이머가 1초 단위로 감소합니다.
// 3. Pause를 누르면 타이머가 멈춥니다.
// 4. 다시 Start를 누르면 재시작됩니다.
// 5. 0초가 되면 초기화 됩니다.
// 6. Reset을 누르면 초기화 됩니다.

let activeTimer;

const btnStart = document.querySelector(".btn-start");
const btnReset = document.querySelector(".btn-reset");

const hourInp = document.querySelector(".time .hour");
const minInp = document.querySelector(".time .min");
const secInp = document.querySelector(".time .sec");
const timeList = document.querySelectorAll(".time input");

timeList.forEach((item) => {
  item.addEventListener("change", (e) => {
    btnStart.classList.remove("setup");
    btnReset.classList.remove("active");
    if (hourInp.value || minInp.value || secInp.value) {
      btnStart.classList.add("setup");
      btnReset.classList.add("active");
    }
  });
});

// 스타트 버튼 기능
btnStart.addEventListener("click", (e) => {
  let time = getTimedata();
  if (time === 0) {
    alert("타이머에 시간을 입력해주세요");
    return;
  }
  btnStart.classList.toggle("active");
  if (btnStart.classList.contains("active")) {
    btnStart.lastElementChild.textContent = "PAUSE";
    Timer(time);
  } else {
    btnStart.lastElementChild.textContent = "START";
    console.log("stop!!!");
    clearInterval(activeTimer);
  }
});

function Timer(time) {
  activeTimer = setInterval(() => {
    --time;
    let hour = parseInt(time / 3600);
    let min = parseInt((time % 3600) / 60);
    let sec = time % 60;

    hourInp.value = hour.toString().padStart(2, "0");
    minInp.value = min.toString().padStart(2, "0");
    secInp.value = sec.toString().padStart(2, "0");

    if (time === 0) {
      clearInterval(activeTimer);
      hourInp.value = "";
      minInp.value = "";
      secInp.value = "";
      btnStart.classList.remove("active");
      btnReset.classList.remove("active");
      btnStart.classList.remove("setup");
      btnStart.lastElementChild.textContent = "START";
      // 마지막에 00초까지 보여준 후 alert실행
      setTimeout(() => {
        alert("타이머가 종료되었습니다.");
      }, 100);
    }
  }, 1000);
}

function getTimedata() {
  const inputList = document.querySelectorAll(".time input");
  let time = 0;
  inputList.forEach((input) => {
    if (!input.value) {
      time += 0;
    } else {
      if (input.dataset.type === "hour") {
        time += parseInt(input.value) * 60 * 60;
      } else if (input.dataset.type === "min") {
        time += parseInt(input.value) * 60;
      } else {
        time += parseInt(input.value);
      }
    }
  });
  return time;
}

// 리셋버튼 기능
btnReset.addEventListener("click", (e) => {
  let time = getTimedata();
  if (time === 0) {
    alert("타이머에 시간을 입력해주세요");
    return;
  }
  clearInterval(activeTimer);
  hourInp.value = "";
  minInp.value = "";
  secInp.value = "";
  btnStart.classList.remove("active");
  btnReset.classList.remove("active");
  btnStart.classList.remove("setup");
  btnStart.lastElementChild.textContent = "START";
});
