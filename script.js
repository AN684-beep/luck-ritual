const wishInput = document.getElementById("wish");
const startBtn = document.getElementById("startBtn");
const resultBox = document.getElementById("result");
const resultText = document.getElementById("resultText");
const growthText = document.getElementById("growthText");
const visual = document.getElementById("visual");
const historyList = document.getElementById("historyList");
const ritualCards = document.querySelectorAll(".ritual-card");

let selectedRitual = "energy";
let selectedRitualName = "✨ Активировать удачу";

const ritualTexts = {
  energy: [
    "Удача активирована. Мироздание слегка подмигнуло.",
    "Энергия пошла. Всё выглядит подозрительно перспективно."
  ],
  chance: [
    "Шансы подкручены. Вероятность успеха ведёт себя бодрее обычного.",
    "Коэффициент удачи вырос. Excel бы одобрил."
  ],
  cat: [
    "Виртуальный кот поглажен. Он мурчит, а значит всё не зря.",
    "Кот посмотрел с уважением. Это почти благословение, но без пафоса."
  ],
  socks: [
    "Счастливые носки активированы. Даже виртуально они работают.",
    "Носки на месте. Удача теперь не сможет пройти мимо."
  ],
  dice: [
    "Кости судьбы брошены. Выпало: «очень даже может быть».",
    "Судьба кинула кубик и решила не мешать."
  ],
  boost: [
    "Буст включён. На ближайшее время шансы выглядят бодрее.",
    "Режим удачи активирован. Главное — не тратить всё на мелочи."
  ]
};

const confettiItems = ["✨", "🍀", "⭐", "💫", "🌈", "🪄"];

ritualCards.forEach(card => {
  card.addEventListener("click", () => {
    ritualCards.forEach(item => item.classList.remove("active"));
    card.classList.add("active");

    selectedRitual = card.dataset.ritual;
    selectedRitualName = card.innerText.trim();
  });
});

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getGrowthPercent() {
  return Math.floor(Math.random() * 81) + 70; 
}

function launchConfetti() {
  for (let i = 0; i < 32; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.textContent = getRandomItem(confettiItems);
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDelay = Math.random() * 0.4 + "s";
    piece.style.fontSize = Math.floor(Math.random() * 12 + 16) + "px";

    document.body.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 2200);
  }
}

function saveHistory(wish, ritualName, growth) {
  const saved = JSON.parse(localStorage.getItem("luckHistory")) || [];

  saved.unshift({
    wish,
    ritualName,
    growth
  });

  const limited = saved.slice(0, 5);
  localStorage.setItem("luckHistory", JSON.stringify(limited));

  renderHistory();
}

function renderHistory() {
  const saved = JSON.parse(localStorage.getItem("luckHistory")) || [];
  historyList.innerHTML = "";

  saved.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.ritualName}: «${item.wish}» — успех +${item.growth}%`;
    historyList.appendChild(li);
  });
}

function startRitual() {
  const wish = wishInput.value.trim();

  if (!wish) {
    resultBox.classList.remove("hidden");
    growthText.textContent = "Сначала нужно желание";
    resultText.textContent = "Удача любит конкретику. Хотя бы примерно.";
    return;
  }

  visual.classList.remove("active-visual");
  void visual.offsetWidth;
  visual.classList.add("active-visual");

  const growth = getGrowthPercent();
  const text = getRandomItem(ritualTexts[selectedRitual]);

  resultBox.classList.remove("hidden");
  growthText.textContent = `Вероятность успеха выросла на ${growth}%`;
  resultText.textContent = `${text} Запрос: «${wish}».`;

  launchConfetti();
  saveHistory(wish, selectedRitualName, growth);
}

startBtn.addEventListener("click", startRitual);
renderHistory();
