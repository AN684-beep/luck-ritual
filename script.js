document.addEventListener("DOMContentLoaded", () => {
  const wishInput = document.getElementById("wish");
  const startBtn = document.getElementById("startBtn");
  const resultBox = document.getElementById("result");
  const resultText = document.getElementById("resultText");
  const growthText = document.getElementById("growthText");
  const magicZone = document.getElementById("magicZone");
  const historyList = document.getElementById("historyList");
  const ritualOptions = document.querySelectorAll(".ritual-option");

  let selectedRitual = "energy";
  let selectedRitualName = "Удача";

  const ritualTexts = {
    energy: [
      "Удача активирована. Всё стало чуть светлее и подозрительно перспективнее.",
      "Сигнал отправлен. Удача уже делает вид, что случайно проходила мимо."
    ],
    chance: [
      "Шансы подкручены. Вероятность успеха выглядит бодрее обычного.",
      "Коэффициент благоприятного исхода аккуратно повышен."
    ],
    cat: [
      "Виртуальный кот поглажен. Он замурчал, а это хороший знак.",
      "Кот одобрил запрос. Дальше должно быть мягче."
    ],
    dice: [
      "Кости судьбы брошены. Выпало что-то очень похожее на хороший вариант.",
      "Судьба сделала бросок и решила не мешать."
    ],
    boost: [
      "Буст включён. На ближайшее время шансы выглядят увереннее.",
      "Режим ускорения активирован. Главное — использовать его красиво."
    ],
    calm: [
      "Спокойствие заварено. Паника поставлена на паузу.",
      "Фокус собран, лишний шум приглушён. Теперь можно действовать."
    ]
  };

  const confettiSymbols = ["✨", "🍀", "⭐", "💫", "🌸", "🪄"];

  function resetRitualSelection() {
    ritualOptions.forEach(option => option.classList.remove("active"));

    const defaultOption = document.querySelector('.ritual-option[data-ritual="energy"]');
    if (defaultOption) {
      defaultOption.classList.add("active");
      selectedRitual = "energy";
      selectedRitualName = "Удача";
    }
  }

  resetRitualSelection();

  ritualOptions.forEach(option => {
    option.addEventListener("click", (event) => {
      event.preventDefault();

      ritualOptions.forEach(item => item.classList.remove("active"));
      option.classList.add("active");

      selectedRitual = option.dataset.ritual;
      selectedRitualName = option.querySelector("span:last-child").textContent;
    });
  });

  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function getGrowthPercent() {
    return Math.floor(Math.random() * 81) + 70;
  }

  function launchConfetti() {
    for (let i = 0; i < 28; i++) {
      const item = document.createElement("div");
      item.className = "confetti";
      item.textContent = getRandomItem(confettiSymbols);
      item.style.left = Math.random() * 100 + "vw";
      item.style.fontSize = Math.floor(Math.random() * 10 + 16) + "px";
      item.style.animationDelay = Math.random() * 0.35 + "s";

      document.body.appendChild(item);

      setTimeout(() => {
        item.remove();
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

    localStorage.setItem("luckHistory", JSON.stringify(saved.slice(0, 5)));
    renderHistory();
  }

  function renderHistory() {
    const saved = JSON.parse(localStorage.getItem("luckHistory")) || [];
    historyList.innerHTML = "";

    saved.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.ritualName}: «${item.wish}» — вероятность успеха +${item.growth}%`;
      historyList.appendChild(li);
    });
  }

  function startRitual(event) {
    event.preventDefault();

    const wish = wishInput.value.trim();

    if (!wish) {
      resultBox.classList.remove("hidden");
      growthText.textContent = "Сначала нужно желание";
      resultText.textContent = "Удача любит конкретику. Хотя бы примерно.";
      return;
    }

    magicZone.classList.remove("active");
    void magicZone.offsetWidth;
    magicZone.classList.add("active");

    const growth = getGrowthPercent();
    const text = getRandomItem(ritualTexts[selectedRitual]);

    growthText.textContent = `Вероятность успеха выросла на ${growth}%`;
    resultText.textContent = `${text} Запрос: «${wish}».`;
    resultBox.classList.remove("hidden");

    launchConfetti();
    saveHistory(wish, selectedRitualName, growth);
  }

  startBtn.addEventListener("click", startRitual);

  renderHistory();
});
