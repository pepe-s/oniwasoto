window.onload = () => {
  const targetImgEl = document.getElementById("targetImg");
  targetImgEl.addEventListener("click", () => {
    console.log("aaa");
  });
  const mameImgEl = document.getElementById("mame");
  mameImgEl.addEventListener("click", () => {
    console.log("aaa");
  });

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
        console.log("up");
        doOniwasoto();
      } else {
        console.log("down");
      }
      flg = false;
    }
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
    // 鬼にダメージを与えるアニメーション
    document
      .getElementById("targetImg")
      .animate([{ opacity: 1 }, { opacity: 0 }], { duration: 50 });
    document.getElementById("counter").innerText = ++count;
  }, durationMs);
}
