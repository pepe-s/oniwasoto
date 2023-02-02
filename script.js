const GAME_TIME_MS = 1500;
let gameEnd = false;
let remainingTime = 15;

window.onload = () => {
  // コンソールにメッセージを出力
  console.log("豆を上にスワイプして鬼にぶつけよう！");

  const targetImgEl = document.getElementById("targetImg");
  const mameImgEl = document.getElementById("mame");

  // スワイプで豆を投げる
  let startPoint = 0;
  let flg = false;
  mameImgEl.addEventListener("touchstart", (event) => {
    console.log("start:" + event.touches[0].pageY);
    startPoint = event.touches[0].pageY;
    flg = true;
  });
  mameImgEl.addEventListener("touchmove", (event) => {
    const currentPoint = event.touches[0].pageY;
    const diff = startPoint - currentPoint;
    if (Math.abs(diff) > 50 && flg) {
      if (startPoint > currentPoint) {
        doOniwasoto();
      }
      flg = false;
    }
  });

  // 鬼の画像を変更できる
  const fileSelector = document.getElementById("fileSelector");
  fileSelector.addEventListener("change", () => {
    if (fileSelector.value !== "") {
      targetImgEl.src = window.URL.createObjectURL(fileSelector.files[0]);
    }
  });

  const startDialog = document.getElementById("startDialog");
  startDialog.open = true;
  const finishDialog = document.getElementById("finishDialog");

  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", () => {
    startDialog.open = false;

    setInterval(() => {
      const timer = document.getElementById("timer");
      if (gameEnd === false) {
        timer.innerText = `残り時間: ${--remainingTime}秒`;
        if (remainingTime === 0) {
          gameEnd = true;
          finishDialog.children[0].innerText = `${
            document.getElementById("counter").innerText
          }ポイントでした`;
          finishDialog.open = true;
        }
      }
    }, 1000);
  });
};

// 投げる豆を生成する
function createTama() {
  const tama = document.createElement("img");
  tama.src = "./images/fruit_cacao_kakao.png";
  tama.width = 20;
  tama.className = "tama";
  tama.style.position = "absolute";
  return tama;
}

// 鬼は外をする
let count = 0;
function doOniwasoto() {
  if (gameEnd) {
    return;
  }
  const mainDiv = document.getElementById("main");
  const tama = createTama();
  mainDiv.appendChild(tama);
  const durationMs = 300;
  // 豆を投げる
  tama.animate(
    [{ transform: "translateY(-50px)" }, { transform: "translateY(-400px)" }],
    { fill: "forwards", duration: durationMs }
  );

  setTimeout(() => {
    // 投げた豆を削除
    tama.remove();
    document.getElementById("counter").innerText = ++count;
    // 鬼にダメージを与えるアニメーション
    document
      .getElementById("targetImg")
      .animate([{ opacity: 1 }, { opacity: 0 }], { duration: 50 });
  }, durationMs);
}
