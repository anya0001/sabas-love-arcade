(() => {
  const prizes = Array.isArray(window.ARCADE_PRIZES) ? window.ARCADE_PRIZES : [];
  const rarityWeights = window.ARCADE_RARITY_WEIGHTS || { common: 60, rare: 25, epic: 12, legendary: 3 };
  const pit = document.getElementById("prize-pit");
  const track = document.getElementById("claw-track");
  const grabButton = document.getElementById("grab-button");
  const leftButton = document.getElementById("move-left");
  const rightButton = document.getElementById("move-right");
  const dialog = document.getElementById("prize-dialog");
  const collection = document.getElementById("collection");
  let position = 50;
  let busy = false;
  let won = 0;
  const collected = new Set();

  const lanes = 7;
  function drawPit() {
    pit.innerHTML = "";
    for (let i = 0; i < lanes; i++) {
      const toy = document.createElement("div");
      toy.className = "toy";
      toy.dataset.lane = String(i);
      toy.innerHTML = '<span class="toy-emoji">' + ["🐸", "🧸", "🍓", "🐤", "💗", "🐱", "⭐"][i] + '</span>';
      pit.appendChild(toy);
    }
  }

  function move(delta) {
    if (busy) return;
    position = Math.max(7, Math.min(93, position + delta));
    track.style.left = position + "%";
  }

  function weightedChoice(items, weightFn) {
    const valid = items.filter(item => weightFn(item) > 0);
    const total = valid.reduce((sum, item) => sum + weightFn(item), 0);
    if (!valid.length || total <= 0) return null;
    let roll = Math.random() * total;
    for (const item of valid) {
      roll -= weightFn(item);
      if (roll <= 0) return item;
    }
    return valid[valid.length - 1];
  }

  function pickPrize() {
    const rarity = weightedChoice(Object.keys(rarityWeights), key => Number(rarityWeights[key]) || 0);
    if (!rarity) return weightedChoice(prizes, p => Number(p.weight) || 1);
    return weightedChoice(prizes.filter(p => p.rarity === rarity), p => Number(p.weight) || 1)
      || weightedChoice(prizes, p => Number(p.weight) || 1);
  }

  function showPrize(prize) {
    won++;
    document.getElementById("prize-count").textContent = String(won);
    document.getElementById("prize-rarity").textContent = prize.rarity.toUpperCase() + " PRIZE";
    document.getElementById("reward-emoji").textContent = prize.emoji || "💗";
    document.getElementById("reward-name").textContent = prize.name || "A little treasure";
    document.getElementById("reward-message").textContent = prize.message || "surprise! ♡";
    dialog.className = "prize-dialog rarity-" + prize.rarity;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else alert((prize.name || "Prize") + "\n\n" + (prize.message || ""));
    if (!collected.has(prize.id)) {
      collected.add(prize.id);
      const empty = collection.querySelector(".empty-state");
      if (empty) empty.remove();
      const card = document.createElement("article");
      card.className = "collection-item rarity-" + prize.rarity;
      const emoji = document.createElement("span");
      emoji.textContent = prize.emoji || "💗";
      const name = document.createElement("strong");
      name.textContent = prize.name || "Treasure";
      const rarity = document.createElement("small");
      rarity.textContent = prize.rarity;
      card.append(emoji, name, rarity);
      collection.appendChild(card);
      document.getElementById("collection-count").textContent = "(" + collected.size + ")";
    }
  }

  async function grab() {
    if (busy || !prizes.length) return;
    busy = true;
    grabButton.disabled = true;
    const selectedLane = Math.max(0, Math.min(lanes - 1, Math.round((position / 100) * (lanes - 1))));
    const toy = pit.children[selectedLane];
    if (toy) toy.classList.add("selected");
    track.classList.add("grabbing");
    await new Promise(resolve => setTimeout(resolve, 850));
    const prize = pickPrize();
    track.classList.remove("grabbing");
    if (toy) toy.classList.remove("selected");
    if (prize) showPrize(prize);
    busy = false;
    grabButton.disabled = false;
  }

  leftButton.addEventListener("click", () => move(-7));
  rightButton.addEventListener("click", () => move(7));
  grabButton.addEventListener("click", grab);
  document.getElementById("close-dialog").addEventListener("click", () => dialog.close());
  document.getElementById("play-again").addEventListener("click", () => dialog.close());
  document.addEventListener("keydown", event => {
    if (dialog.open) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-7); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(7); }
    if (event.code === "Space") { event.preventDefault(); grab(); }
  });
  drawPit();
})();
