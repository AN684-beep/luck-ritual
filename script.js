const wishInput = document.getElementById("wish");
const ritualSelect = document.getElementById("ritual");
const startBtn = document.getElementById("startBtn");
const resultBox = document.getElementById("result");
const resultText = document.getElementById("resultText");
const luckPercent = document.getElementById("luckPercent");
const progressBar = document.getElementById("progressBar");
const visual = document.getElementById("visual");
const historyList = document.getElementById("historyList");

const ritualTexts = {
  energy: [
    "Удача активирована. Вселенная делает вид, что всё поняла ✨",
    "Энергия пошла. Главное теперь не спугнуть здравым смыслом."
  ],
  focus: [
    "Фокус настроен. Хаос временно переведён в режим ожидания 🧘",
    "Внутренний шум приглушён. Можно действовать."
  ],
  chance: [
    "Вероятность аккуратно подкручена. Без гарантий, но с настроением 📈",
    "Коэффициент успеха поднят. Excel бы одобрил."
  ],
  cat: [
    "Виртуальный кот поглажен. Удача замурчала 🐈",
    "Кот посмотрел с уважением. Это уже многое значит."
  ],
  socks: [
    "Счастливые носки надеты. Даже если виртуально — эффект засчитан 🧦",
    "Носки активированы. Стиль спорный, сила мощная."
  ],
  dice: [
    "Кости судьбы брошены. Выпало: «ну почему бы и нет» 🎲",
    "Судьба сделала бросок и загадочно промолчала."
  ],
  star: [
    "Намерение зафиксировано. Теперь оно официально существует 🌟",
    "Запрос принят в обработку мирозданием."
  ],
  reset: [
    "Сценарий перезапущен. Старые баги не обещали исчезнуть, но попытка хорошая 🔁",
    "Реальность обновлена. Нажми F5 внутри себя."
  ],
  boost: [
    "Буст включён. На ближайшее время ты персонаж с повышенной удачей 🚀",
    "Ускорение выдано. Не трать его на ерунду."
  ],
  tea: [
    "Спокойствие заварено. Паника пусть постоит в сторонке 🍵",
    "Внутренний чайник вскипел, но в хорошем смысле."
  ]
};

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getLuckPercent() {
  return Math.floor(Math.random() * 36) + 64; // от 64 до 99
}

function saveHistory(wish, ritualName, percent) {
  const saved = JSON.parse(localStorage.getItem("luckHistory")) || [];

  saved.unshift({
    wish,
    ritualName,
    percent
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
    li.textContent = `${item.ritualName}: «${item.wish}» — ${item.percent}%`;
    historyList.appendChild(li);
  });
}

function startRitual() {
  const wish = wishInput.value.trim();
  const ritual = ritualSelect.value;
  const ritualName = ritualSelect.options[ritualSelect.selectedIndex].text;

  if (!wish) {
    resultBox.classList.remove("hidden");
    resultText.textContent = "Сначала нужно ввести желание. Удача любит конкретику.";
    luckPercent.textContent = "0%";
    progressBar.style.width = "0%";
    return;
  }

  visual.classList.remove("active");
  void visual.offsetWidth;
  visual.classList.add("active");

  const percent = getLuckPercent();
  const text = getRandomItem(ritualTexts[ritual]);

  resultBox.classList.remove("hidden");
  luckPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
  resultText.textContent = `${text} Запрос: «${wish}».`;

  saveHistory(wish, ritualName, percent);
}

startBtn.addEventListener("click", startRitual);
renderHistory();
