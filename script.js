window.onload = () => {
  const targetImgEl = document.getElementById("targetImg");
  targetImgEl.addEventListener("click", () => {
    console.log("aaa");
  });
  const mameImgEl = document.getElementById("mame");
  mameImgEl.addEventListener("click", () => {
    console.log("aaa");
  });

  // const tamaImgEl = document.getElementById("tama");
  // tamaImgEl.hidden = true;

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
        // tamaImgEl.hidden = false;
        // setStartPosition();
        doOniwasoto();
      } else {
        console.log("down");
      }
      flg = false;
    }
  });
};

function setStartPosition() {
  const mameImgEl = document.getElementById("mame");
  const tamaImgEl = document.getElementById("tama");

  console.log(tamaImgEl.top);
  console.log(tamaImgEl.left);
}

function createTama() {
  const tama = document.createElement("img");
  tama.src = "./images/fruit_cacao_kakao.png";
  tama.width = 20;
  tama.className = "tama";
  tama.style.position = "absolute";
  return tama;
}

let count = 0;
function doOniwasoto() {
  const mainDiv = document.getElementById("main");
  const tama = createTama();
  mainDiv.appendChild(tama);
  const durationMs = 300;
  tama.animate(
    [{ transform: "translateY(-50px)" }, { transform: "translateY(-400px)" }],
    { fill: "forwards", duration: durationMs }
  );
  setTimeout(() => {
    tama.remove();
    document
      .getElementById("targetImg")
      .animate([{ opacity: 1 }, { opacity: 0 }], { duration: 50 });
    document.getElementById("counter").innerText = ++count;
  }, durationMs);
}
