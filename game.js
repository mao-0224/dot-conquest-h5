const GRID_SIZE = 6;
const BOX_SIZE = GRID_SIZE - 1;
const STORAGE_KEY = "dot-conquest-profile";
const AVATARS = ["aurora", "spark", "orbit", "wave"];
const AI_LEVELS = ["简单", "中等", "困难"];
const RIVALS = ["星河", "边界线", "青焰", "北桥", "拾光", "回声"];
const PVP_TURN_SECONDS = 30;
const BGM_URL = "https://cdn1.suno.ai/8543ff7f-8571-4772-862f-a0c893b41fce.mp3";
const MUSIC_TEMPO = 126;
const MUSIC_SCALE = {
  "1": 261.63,
  "2": 293.66,
  "3": 329.63,
  "4": 349.23,
  "5": 392,
  "6": 440,
  "7": 493.88,
  "1'": 523.25
};
const INTRO_PHRASE = [
  { note: "1", beats: 1, pad: ["1", "3", "5"] },
  { note: "3", beats: 1 },
  { note: "5", beats: 1 },
  { beats: 1 },
  { note: "6", beats: 1, pad: ["6", "1", "3"] },
  { note: "5", beats: 1 },
  { note: "3", beats: 1 },
  { beats: 1 },
  { note: "2", beats: 1, pad: ["2", "5", "7"] },
  { note: "3", beats: 1 },
  { note: "5", beats: 1 },
  { beats: 1 },
  { note: "3", beats: 4, pad: ["1", "3", "5"] }
];
const MAIN_PHRASE = [
  { note: "1", beats: 1, pad: ["1", "3", "5"] },
  { note: "3", beats: 1 },
  { note: "5", beats: 1 },
  { note: "6", beats: 1 },
  { note: "5", beats: 1, pad: ["5", "7", "2"] },
  { note: "3", beats: 1 },
  { note: "2", beats: 2 },
  { note: "1", beats: 1, pad: ["1", "3", "5"] },
  { note: "3", beats: 1 },
  { note: "5", beats: 1 },
  { note: "7", beats: 1 },
  { note: "6", beats: 4, pad: ["6", "1", "3"] },
  { note: "3", beats: 1, pad: ["3", "5", "7"] },
  { note: "5", beats: 1 },
  { note: "6", beats: 1 },
  { note: "1'", beats: 1 },
  { note: "7", beats: 1, pad: ["5", "7", "2"] },
  { note: "6", beats: 1 },
  { note: "5", beats: 2 },
  { note: "2", beats: 1, pad: ["2", "5", "7"] },
  { note: "3", beats: 1 },
  { note: "5", beats: 1 },
  { note: "3", beats: 1 },
  { note: "1", beats: 4, pad: ["1", "3", "5"] }
];
const OUTRO_PHRASE = [
  { note: "3", beats: 1.5, pad: ["1", "3", "5"] },
  { note: "5", beats: 1.5 },
  { note: "6", beats: 1.5 },
  { note: "1'", beats: 2 },
  { note: "7", beats: 1.5, pad: ["6", "1", "3"] },
  { note: "6", beats: 1.5 },
  { note: "5", beats: 2 },
  { note: "2", beats: 1.5, pad: ["2", "5", "7"] },
  { note: "3", beats: 1.5 },
  { note: "1", beats: 5, pad: ["1", "3", "5"] }
];

const els = {
  startScreen: document.getElementById("startScreen"),
  matchScreen: document.getElementById("matchScreen"),
  gameScreen: document.getElementById("gameScreen"),
  difficultyModal: document.getElementById("difficultyModal"),
  settingsModal: document.getElementById("settingsModal"),
  resultModal: document.getElementById("resultModal"),
  profileAvatar: document.getElementById("profileAvatar"),
  profileName: document.getElementById("profileName"),
  profileUid: document.getElementById("profileUid"),
  openSettingsBtn: document.getElementById("openSettingsBtn"),
  closeSettingsBtn: document.getElementById("closeSettingsBtn"),
  saveSettingsBtn: document.getElementById("saveSettingsBtn"),
  closeDifficultyBtn: document.getElementById("closeDifficultyBtn"),
  rollDifficultyBtn: document.getElementById("rollDifficultyBtn"),
  rollReel: document.getElementById("rollReel"),
  rollBox: document.getElementById("rollBox"),
  rollTrackFill: document.getElementById("rollTrackFill"),
  nameInput: document.getElementById("nameInput"),
  uidDisplay: document.getElementById("uidDisplay"),
  regenUidBtn: document.getElementById("regenUidBtn"),
  volumeInput: document.getElementById("volumeInput"),
  volumeValue: document.getElementById("volumeValue"),
  musicToggle: document.getElementById("musicToggle"),
  pveBtn: document.getElementById("pveBtn"),
  pvpBtn: document.getElementById("pvpBtn"),
  cancelMatchBtn: document.getElementById("cancelMatchBtn"),
  matchTitle: document.getElementById("matchTitle"),
  matchText: document.getElementById("matchText"),
  backHomeBtn: document.getElementById("backHomeBtn"),
  restartBtn: document.getElementById("restartBtn"),
  rollAgainBtn: document.getElementById("rollAgainBtn"),
  board: document.getElementById("board"),
  modeLabel: document.getElementById("modeLabel"),
  player0Card: document.getElementById("player0Card"),
  player1Card: document.getElementById("player1Card"),
  player0Avatar: document.getElementById("player0Avatar"),
  player1Avatar: document.getElementById("player1Avatar"),
  player0Name: document.getElementById("player0Name"),
  player1Name: document.getElementById("player1Name"),
  player0Score: document.getElementById("player0Score"),
  player1Score: document.getElementById("player1Score"),
  turnText: document.getElementById("turnText"),
  diceText: document.getElementById("diceText"),
  turnTimer: document.getElementById("turnTimer"),
  turnTimerText: document.getElementById("turnTimerText"),
  turnTimerFill: document.getElementById("turnTimerFill"),
  statusText: document.getElementById("statusText"),
  resultTitle: document.getElementById("resultTitle"),
  resultText: document.getElementById("resultText"),
  playAgainBtn: document.getElementById("playAgainBtn"),
  resultHomeBtn: document.getElementById("resultHomeBtn"),
  diceOverlay: document.getElementById("diceOverlay"),
  dicePlayer0Name: document.getElementById("dicePlayer0Name"),
  dicePlayer1Name: document.getElementById("dicePlayer1Name"),
  diceCube0: document.getElementById("diceCube0"),
  diceCube1: document.getElementById("diceCube1"),
  diceRollText: document.getElementById("diceRollText")
};

let audioContext = null;
let matchTimer = null;
let rollTimer = null;
let turnTimer = null;
let diceRollTimer = null;
let diceRollInterval = null;
let lastBoardTap = 0;
let lastButtonSound = 0;
let musicTimer = null;
let musicToken = 0;
let musicGain = null;
let musicMainLoops = 0;
let bgmAudio = null;
let bgmFadeTimer = null;

const state = {
  profile: loadProfile(),
  mode: "pve",
  aiLevel: "中等",
  players: [],
  edges: new Map(),
  owners: createOwners(),
  currentPlayer: 0,
  scores: [0, 0],
  dice: [0, 0],
  turnMoves: 0,
  turnSeconds: PVP_TURN_SECONDS,
  gameOver: false,
  aiThinking: false,
  diceRolling: false,
  rollingDifficulty: false,
  musicPlaying: false,
  musicEnding: false
};

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.uid && saved.name) {
      return {
        name: saved.name,
        uid: saved.uid,
        avatar: AVATARS.includes(saved.avatar) ? saved.avatar : "aurora",
        volume: Number.isFinite(saved.volume) ? saved.volume : 0.6,
        musicEnabled: saved.musicEnabled !== false
      };
    }
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
  return {
    name: `玩家${Math.floor(100 + Math.random() * 900)}`,
    uid: makeUid(),
    avatar: "aurora",
    volume: 0.6,
    musicEnabled: true
  };
}

function saveProfile() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.profile));
}

function makeUid() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let value = "UID-";
  for (let i = 0; i < 6; i += 1) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return value;
}

function createOwners() {
  return Array.from({ length: BOX_SIZE }, () => Array.from({ length: BOX_SIZE }, () => null));
}

function edgeKey(type, row, col) {
  return `${type}-${row}-${col}`;
}

function parseEdge(key) {
  const [type, row, col] = key.split("-");
  return { type, row: Number(row), col: Number(col) };
}

function allEdges() {
  const edges = [];
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < BOX_SIZE; col += 1) {
      edges.push(edgeKey("h", row, col));
    }
  }
  for (let row = 0; row < BOX_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      edges.push(edgeKey("v", row, col));
    }
  }
  return edges;
}

function boxesForEdge(key) {
  const edge = parseEdge(key);
  const boxes = [];
  if (edge.type === "h") {
    if (edge.row > 0) boxes.push([edge.row - 1, edge.col]);
    if (edge.row < BOX_SIZE) boxes.push([edge.row, edge.col]);
  } else {
    if (edge.col > 0) boxes.push([edge.row, edge.col - 1]);
    if (edge.col < BOX_SIZE) boxes.push([edge.row, edge.col]);
  }
  return boxes;
}

function boxEdges(row, col) {
  return [
    edgeKey("h", row, col),
    edgeKey("h", row + 1, col),
    edgeKey("v", row, col),
    edgeKey("v", row, col + 1)
  ];
}

function edgeCompletesCount(key, edgeMap = state.edges, owners = state.owners) {
  if (edgeMap.has(key)) return 0;
  const simulated = new Map(edgeMap);
  simulated.set(key, state.currentPlayer);
  return findEnclosedRegions(simulated, owners).reduce((sum, region) => sum + region.length, 0);
}

function findEnclosedRegions(edgeMap = state.edges, owners = state.owners) {
  const visited = Array.from({ length: BOX_SIZE }, () => Array.from({ length: BOX_SIZE }, () => false));
  const regions = [];

  for (let startRow = 0; startRow < BOX_SIZE; startRow += 1) {
    for (let startCol = 0; startCol < BOX_SIZE; startCol += 1) {
      if (visited[startRow][startCol] || owners[startRow][startCol] !== null) continue;

      const queue = [[startRow, startCol]];
      const region = [];
      let leaksOutside = false;
      visited[startRow][startCol] = true;

      while (queue.length) {
        const [row, col] = queue.shift();
        region.push([row, col]);

        const exits = [
          { edge: edgeKey("h", row, col), next: [row - 1, col], outside: row === 0 },
          { edge: edgeKey("h", row + 1, col), next: [row + 1, col], outside: row === BOX_SIZE - 1 },
          { edge: edgeKey("v", row, col), next: [row, col - 1], outside: col === 0 },
          { edge: edgeKey("v", row, col + 1), next: [row, col + 1], outside: col === BOX_SIZE - 1 }
        ];

        exits.forEach(({ edge, next, outside }) => {
          if (edgeMap.has(edge)) return;
          if (outside) {
            leaksOutside = true;
            return;
          }
          const [nextRow, nextCol] = next;
          if (owners[nextRow][nextCol] !== null || visited[nextRow][nextCol]) return;
          visited[nextRow][nextCol] = true;
          queue.push([nextRow, nextCol]);
        });
      }

      if (!leaksOutside) regions.push(region);
    }
  }

  return regions;
}

function countThreeSideBoxesAfter(key) {
  const simulated = new Map(state.edges);
  simulated.set(key, state.currentPlayer);
  let count = 0;
  for (let row = 0; row < BOX_SIZE; row += 1) {
    for (let col = 0; col < BOX_SIZE; col += 1) {
      if (state.owners[row][col] !== null) continue;
      const drawn = boxEdges(row, col).filter((candidate) => simulated.has(candidate)).length;
      if (drawn === 3) count += 1;
    }
  }
  return count;
}

function isPlayableEdge(key) {
  return !state.edges.has(key) && boxesForEdge(key).some(([row, col]) => state.owners[row][col] === null);
}

function availableEdges() {
  return allEdges().filter((key) => isPlayableEdge(key));
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function setScreen(name) {
  els.startScreen.classList.toggle("hidden", name !== "start");
  els.matchScreen.classList.toggle("hidden", name !== "match");
  els.gameScreen.classList.toggle("hidden", name !== "game");
}

function applyAvatarClass(element, avatar) {
  AVATARS.forEach((name) => element.classList.remove(`avatar-${name}`));
  element.classList.add(`avatar-${avatar}`);
}

function syncProfileUi() {
  els.profileName.textContent = state.profile.name;
  els.profileUid.textContent = state.profile.uid;
  els.nameInput.value = state.profile.name;
  els.uidDisplay.textContent = state.profile.uid;
  els.volumeInput.value = Math.round(state.profile.volume * 100);
  els.volumeValue.textContent = `${els.volumeInput.value}%`;
  els.musicToggle.checked = state.profile.musicEnabled;
  applyAvatarClass(els.profileAvatar, state.profile.avatar);
  document.querySelectorAll(".avatar-choice").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.avatar === state.profile.avatar));
  });
}

function setStatus(text) {
  els.statusText.textContent = text;
}

function isTurnTimerActive() {
  return !state.gameOver && !state.diceRolling && state.players[state.currentPlayer]?.type === "human";
}

function clearPvpTurnTimer() {
  window.clearInterval(turnTimer);
  turnTimer = null;
  state.turnSeconds = PVP_TURN_SECONDS;
  if (els.turnTimer) {
    els.turnTimer.classList.add("hidden");
    els.turnTimer.classList.remove("is-warning");
    els.turnTimer.style.setProperty("--timer-progress", "1");
    els.turnTimerFill.style.width = "100%";
  }
}

function updateTurnTimerDisplay(seconds = state.turnSeconds) {
  state.turnSeconds = Math.max(0, seconds);
  els.turnTimerText.textContent = `${state.turnSeconds}s`;
  els.turnTimer.classList.toggle("is-warning", state.turnSeconds <= 10);
  const progress = state.turnSeconds / PVP_TURN_SECONDS;
  els.turnTimer.style.setProperty("--timer-progress", String(progress));
  els.turnTimerFill.style.width = `${Math.max(0, progress * 100)}%`;
}

function startPvpTurnTimer() {
  clearPvpTurnTimer();
  if (!isTurnTimerActive()) return;
  const deadline = Date.now() + PVP_TURN_SECONDS * 1000;
  els.turnTimer.classList.remove("hidden");
  updateTurnTimerDisplay(PVP_TURN_SECONDS);
  turnTimer = window.setInterval(() => {
    const remaining = Math.ceil((deadline - Date.now()) / 1000);
    updateTurnTimerDisplay(remaining);
    if (remaining <= 0) {
      handleTurnTimeout();
    }
  }, 250);
}

function handleTurnTimeout() {
  if (!isTurnTimerActive()) return;
  window.clearInterval(turnTimer);
  turnTimer = null;
  const move = pickRandom(availableEdges());
  if (!move) {
    finishGame();
    return;
  }
  playSound("block");
  placeEdge(move, state.currentPlayer, { timedOut: true });
}

function clearDiceRollAnimation() {
  window.clearTimeout(diceRollTimer);
  window.clearInterval(diceRollInterval);
  diceRollTimer = null;
  diceRollInterval = null;
  state.diceRolling = false;
  els.diceOverlay.classList.add("hidden");
  els.diceOverlay.classList.remove("rolling", "revealed");
}

function showDiceRollAnimation(onDone) {
  clearPvpTurnTimer();
  window.clearTimeout(diceRollTimer);
  window.clearInterval(diceRollInterval);
  state.diceRolling = true;
  els.dicePlayer0Name.textContent = state.players[0]?.name ?? "玩家";
  els.dicePlayer1Name.textContent = state.players[1]?.name ?? "对手";
  els.diceCube0.textContent = "?";
  els.diceCube1.textContent = "?";
  els.diceRollText.textContent = "骰子正在滚动...";
  els.diceOverlay.classList.remove("hidden", "revealed");
  els.diceOverlay.classList.add("rolling");
  renderPlayers();

  let ticks = 0;
  diceRollInterval = window.setInterval(() => {
    ticks += 1;
    els.diceCube0.textContent = String(1 + Math.floor(Math.random() * 6));
    els.diceCube1.textContent = String(1 + Math.floor(Math.random() * 6));
    if (ticks % 2 === 0) playSound("tap");
  }, 90);

  diceRollTimer = window.setTimeout(() => {
    window.clearInterval(diceRollInterval);
    diceRollInterval = null;
    els.diceCube0.textContent = String(state.dice[0]);
    els.diceCube1.textContent = String(state.dice[1]);
    const firstName = state.players[state.currentPlayer]?.name ?? "玩家";
    els.diceRollText.textContent = `${firstName} 先手`;
    els.diceOverlay.classList.remove("rolling");
    els.diceOverlay.classList.add("revealed");
    playSound("score");

    diceRollTimer = window.setTimeout(() => {
      els.diceOverlay.classList.add("hidden");
      els.diceOverlay.classList.remove("revealed");
      state.diceRolling = false;
      renderPlayers();
      onDone();
    }, 820);
  }, 1800);
}

function openDifficultyPicker() {
  clearDifficultyRoll();
  els.rollReel.textContent = "?";
  els.rollTrackFill.style.width = "0%";
  els.rollBox.classList.remove("rolling", "picked");
  els.difficultyModal.classList.remove("hidden");
}

function closeDifficultyPicker() {
  if (state.rollingDifficulty) return;
  clearDifficultyRoll();
  els.difficultyModal.classList.add("hidden");
}

function clearDifficultyRoll() {
  window.clearTimeout(rollTimer);
  rollTimer = null;
  state.rollingDifficulty = false;
  els.rollDifficultyBtn.disabled = false;
  els.rollReel.disabled = false;
  document.querySelectorAll(".difficulty-option").forEach((button) => {
    button.disabled = false;
    button.classList.remove("is-selected", "is-flashing");
  });
}

function startPveWithDifficulty(level) {
  clearDifficultyRoll();
  state.aiLevel = level;
  els.difficultyModal.classList.add("hidden");
  startGame("pve", level);
}

function rollDifficulty() {
  if (state.rollingDifficulty) return;
  ensureAudioContext();
  startBackgroundMusic();
  state.rollingDifficulty = true;
  els.rollDifficultyBtn.disabled = true;
  els.rollReel.disabled = true;
  els.rollBox.classList.add("rolling");
  els.rollBox.classList.remove("picked");
  els.rollTrackFill.style.width = "0%";
  document.querySelectorAll(".difficulty-option").forEach((button) => {
    button.disabled = true;
    button.classList.remove("is-selected");
  });

  const finalLevel = pickRandom(AI_LEVELS);
  const totalSteps = 28 + Math.floor(Math.random() * 8);
  let step = 0;
  let delay = 46;

  const animateStep = () => {
    const currentLevel = step >= totalSteps - 1 ? finalLevel : AI_LEVELS[step % AI_LEVELS.length];
    els.rollReel.textContent = currentLevel;
    els.rollTrackFill.style.width = `${Math.min(100, ((step + 1) / totalSteps) * 100)}%`;
    document.querySelectorAll(".difficulty-option").forEach((button) => {
      button.classList.toggle("is-flashing", button.dataset.difficulty === currentLevel);
    });
    playSound(step >= totalSteps - 4 ? "score" : "tap");
    step += 1;

    if (step >= totalSteps) {
      state.rollingDifficulty = false;
      els.rollBox.classList.remove("rolling");
      els.rollBox.classList.add("picked");
      document.querySelectorAll(".difficulty-option").forEach((button) => {
        button.classList.remove("is-flashing");
        button.classList.toggle("is-selected", button.dataset.difficulty === finalLevel);
      });
      playSound("win");
      window.setTimeout(() => startPveWithDifficulty(finalLevel), 760);
      return;
    }

    delay += step > totalSteps * 0.58 ? 24 : 7;
    rollTimer = window.setTimeout(animateStep, delay);
  };

  animateStep();
}

function setupPlayers(mode, aiLevel = state.aiLevel) {
  const player = {
    name: state.profile.name,
    uid: state.profile.uid,
    avatar: state.profile.avatar,
    type: "human"
  };
  if (mode === "pve") {
    state.aiLevel = AI_LEVELS.includes(aiLevel) ? aiLevel : "中等";
    state.players = [
      player,
      {
        name: `AI ${state.aiLevel}`,
        uid: `AI-${Math.floor(1000 + Math.random() * 9000)}`,
        avatar: "rival",
        type: "ai"
      }
    ];
    els.modeLabel.textContent = `人机模式 · ${state.aiLevel}`;
  } else {
    const rival = pickRandom(RIVALS);
    state.players = [
      player,
      {
        name: rival,
        uid: makeUid(),
        avatar: "rival",
        type: "human"
      }
    ];
    els.modeLabel.textContent = "1v1 随机匹配 · 前端同屏版";
  }
}

function startGame(mode, aiLevel = state.aiLevel) {
  clearPvpTurnTimer();
  clearDiceRollAnimation();
  startBackgroundMusic();
  playSound(mode === "pve" ? "start" : "match");
  state.mode = mode;
  setupPlayers(mode, aiLevel);
  state.edges = new Map();
  state.owners = createOwners();
  state.scores = [0, 0];
  state.turnMoves = 0;
  state.gameOver = false;
  state.aiThinking = false;
  state.diceRolling = false;
  addInitialLines();
  rollDice();
  setScreen("game");
  renderAll();
  setStatus("初始线段已经生成，正在投骰子决定先手。");
  showDiceRollAnimation(() => {
    const firstName = state.players[state.currentPlayer].name;
    setStatus(state.mode === "pve" && state.currentPlayer === 1
      ? `投骰结束，${firstName} 先手，稍等 AI 落子。`
      : `投骰结束，${firstName} 先手。点击亮起的线段。`);
    startPvpTurnTimer();
    maybeRunAi();
  });
}

function restartGame() {
  startGame(state.mode, state.aiLevel);
}

function addInitialLines() {
  const target = 4 + Math.floor(Math.random() * 4);
  let attempts = 0;
  while (state.edges.size < target && attempts < 200) {
    attempts += 1;
    const key = pickRandom(availableEdges());
    if (edgeCompletesCount(key) === 0 && countPotentialSides(key) < 3) {
      state.edges.set(key, -1);
    }
  }
}

function countPotentialSides(key) {
  const simulated = new Map(state.edges);
  simulated.set(key, -1);
  return Math.max(
    ...boxesForEdge(key).map(([row, col]) => boxEdges(row, col).filter((candidate) => simulated.has(candidate)).length),
    0
  );
}

function rollDice() {
  let a = 0;
  let b = 0;
  while (a === b) {
    a = 1 + Math.floor(Math.random() * 6);
    b = 1 + Math.floor(Math.random() * 6);
  }
  state.dice = [a, b];
  state.currentPlayer = a > b ? 0 : 1;
}

function placeEdge(key, player, options = {}) {
  if (state.gameOver || state.diceRolling || state.edges.has(key)) return;
  clearPvpTurnTimer();
  state.edges.set(key, player);
  state.turnMoves += 1;

  let completed = 0;
  const enclosedRegions = findEnclosedRegions();
  enclosedRegions.forEach((region) => {
    region.forEach(([row, col]) => {
      state.owners[row][col] = player;
      state.scores[player] += 1;
      completed += 1;
    });
  });

  playSound(completed > 0 ? "score" : "line");

  if (completed > 0) {
    setStatus(options.timedOut
      ? `${state.players[player].name} 超时，系统自动连线并围住 ${completed} 格领地，继续行动。`
      : `${state.players[player].name} 围住 ${completed} 格领地，继续行动。`);
  } else {
    state.currentPlayer = player === 0 ? 1 : 0;
    setStatus(options.timedOut
      ? `${state.players[player].name} 超时，系统自动连了一条线。轮到 ${state.players[state.currentPlayer].name}。`
      : `轮到 ${state.players[state.currentPlayer].name}。`);
  }

  if (availableEdges().length === 0) {
    finishGame();
  }

  renderAll();
  startPvpTurnTimer();
  maybeRunAi();
}

function finishGame() {
  clearPvpTurnTimer();
  clearDiceRollAnimation();
  state.gameOver = true;
  const [a, b] = state.scores;
  const winner =
    a === b ? "平局" : a > b ? `${state.players[0].name} 获胜` : `${state.players[1].name} 获胜`;
  els.resultTitle.textContent = winner;
  els.resultText.textContent = `最终比分 ${a} : ${b}`;
  els.resultModal.classList.remove("hidden");
  playSound("win");
  playOutroMusic();
}

function maybeRunAi() {
  if (state.gameOver) return;
  if (state.diceRolling) return;
  if (state.mode !== "pve" || state.currentPlayer !== 1) return;
  state.aiThinking = true;
  renderAll();
  window.setTimeout(() => {
    const move = chooseAiMove();
    state.aiThinking = false;
    if (move) placeEdge(move, 1);
  }, 620);
}

function chooseAiMove() {
  const moves = availableEdges();
  const scoring = moves.filter((key) => edgeCompletesCount(key) > 0);
  if (state.aiLevel === "简单") {
    return pickRandom(moves);
  }
  if (state.aiLevel === "中等") {
    if (scoring.length && Math.random() < 0.78) return pickBestScore(scoring);
    return pickRandom(moves);
  }
  if (scoring.length) return pickBestScore(scoring);
  const ranked = moves
    .map((key) => ({ key, risk: countThreeSideBoxesAfter(key) }))
    .sort((a, b) => a.risk - b.risk);
  const bestRisk = ranked[0]?.risk ?? 0;
  return pickRandom(ranked.filter((item) => item.risk === bestRisk)).key;
}

function pickBestScore(keys) {
  const ranked = keys
    .map((key) => ({ key, score: edgeCompletesCount(key) }))
    .sort((a, b) => b.score - a.score);
  const best = ranked[0].score;
  return pickRandom(ranked.filter((item) => item.score === best)).key;
}

function renderAll() {
  renderPlayers();
  renderBoard();
}

function renderPlayers() {
  els.player0Name.textContent = state.players[0]?.name ?? state.profile.name;
  els.player1Name.textContent = state.players[1]?.name ?? "对手";
  els.player0Score.textContent = state.scores[0];
  els.player1Score.textContent = state.scores[1];
  els.player0Card.classList.toggle("active", state.currentPlayer === 0 && !state.gameOver);
  els.player1Card.classList.toggle("active", state.currentPlayer === 1 && !state.gameOver);
  applyAvatarClass(els.player0Avatar, state.profile.avatar);
  els.player1Avatar.className = "mini-avatar rival-avatar";
  els.turnText.textContent = state.gameOver
    ? "对局结束"
    : state.diceRolling
      ? "骰子滚动中"
    : state.aiThinking
      ? "AI 思考中"
      : `${state.players[state.currentPlayer]?.name ?? "玩家"} 行动`;
  els.diceText.textContent = state.diceRolling ? "- : -" : `${state.dice[0]} : ${state.dice[1]}`;
}

function renderBoard() {
  const margin = 45;
  const step = (500 - margin * 2) / (GRID_SIZE - 1);
  const parts = [];

  for (let row = 0; row < BOX_SIZE; row += 1) {
    for (let col = 0; col < BOX_SIZE; col += 1) {
      const owner = state.owners[row][col];
      if (owner !== null) {
        parts.push(
          `<rect class="box-owner-${owner}" x="${margin + col * step}" y="${margin + row * step}" width="${step}" height="${step}"></rect>`
        );
      }
    }
  }

  for (let row = 0; row < GRID_SIZE; row += 1) {
    const y = margin + row * step;
    parts.push(`<line class="grid-guide" x1="${margin}" y1="${y}" x2="${500 - margin}" y2="${y}"></line>`);
  }
  for (let col = 0; col < GRID_SIZE; col += 1) {
    const x = margin + col * step;
    parts.push(`<line class="grid-guide" x1="${x}" y1="${margin}" x2="${x}" y2="${500 - margin}"></line>`);
  }

  allEdges().forEach((key) => {
    const { type, row, col } = parseEdge(key);
    const x1 = margin + col * step;
    const y1 = margin + row * step;
    const x2 = type === "h" ? x1 + step : x1;
    const y2 = type === "v" ? y1 + step : y1;
    if (state.edges.has(key)) {
      const owner = state.edges.get(key);
      const edgeClass = owner === -1 ? "edge-initial" : `edge-player-${owner}`;
      parts.push(`<line class="edge-line ${edgeClass}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`);
    } else if (isPlayableEdge(key)) {
      const hitX = type === "h" ? x1 + 4 : x1 - 19;
      const hitY = type === "h" ? y1 - 19 : y1 + 4;
      const hitWidth = type === "h" ? step - 8 : 38;
      const hitHeight = type === "h" ? 38 : step - 8;
      const label = `连接${row + 1}行${col + 1}列${type === "h" ? "横线" : "竖线"}`;
      parts.push(
        `<g class="edge-group" data-key="${key}" role="button" aria-label="${label}"><rect class="edge-hit-box" x="${hitX}" y="${hitY}" width="${hitWidth}" height="${hitHeight}" rx="18"></rect><line class="edge-preview" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line></g>`
      );
    }
  });

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      parts.push(`<circle class="dot" cx="${margin + col * step}" cy="${margin + row * step}" r="8"></circle>`);
    }
  }
  els.board.innerHTML = parts.join("");
}

function openSettings() {
  syncProfileUi();
  els.settingsModal.classList.remove("hidden");
}

function closeSettings() {
  els.settingsModal.classList.add("hidden");
}

function updateVolumeLabel() {
  els.volumeValue.textContent = `${els.volumeInput.value}%`;
  setMusicVolume(Number(els.volumeInput.value) / 100);
}

function commitSettings() {
  const name = els.nameInput.value.trim() || "玩家";
  state.profile.name = name.slice(0, 12);
  state.profile.volume = Number(els.volumeInput.value) / 100;
  state.profile.musicEnabled = els.musicToggle.checked;
  saveProfile();
  if (state.profile.musicEnabled) {
    startBackgroundMusic();
  } else {
    stopBackgroundMusic();
  }
  syncProfileUi();
  closeSettings();
  playSound("line");
}

function showMatch() {
  startBackgroundMusic();
  setScreen("match");
  els.matchTitle.textContent = "正在随机匹配";
  els.matchText.textContent = "寻找实力接近的对手...";
  els.cancelMatchBtn.textContent = "取消";
  playSound("match");
  window.clearTimeout(matchTimer);
  matchTimer = window.setTimeout(() => {
    els.matchTitle.textContent = "没有匹配到玩家";
    els.matchText.textContent = "当前没有可用的线上玩家，请稍后再试。";
    els.cancelMatchBtn.textContent = "返回开始";
    playSound("block");
  }, 1500);
}

function goHome() {
  window.clearTimeout(matchTimer);
  clearPvpTurnTimer();
  clearDiceRollAnimation();
  els.resultModal.classList.add("hidden");
  setScreen("start");
}

function ensureAudioContext() {
  try {
    const AudioEngine = window.AudioContext || window.webkitAudioContext;
    if (!AudioEngine) return false;
    if (!audioContext) {
      audioContext = new AudioEngine();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    return true;
  } catch (error) {
    audioContext = null;
    return false;
  }
}

function beatSeconds(speed = 1) {
  return (60 / MUSIC_TEMPO) * speed;
}

function degreeFrequency(degree, octaveShift = 0) {
  const base = MUSIC_SCALE[degree] || MUSIC_SCALE["1"];
  return base * Math.pow(2, octaveShift);
}

function getMusicGain() {
  if (!musicGain) {
    musicGain = audioContext.createGain();
    musicGain.connect(audioContext.destination);
  }
  setMusicVolume();
  return musicGain;
}

function setMusicVolume(volume = state.profile.volume) {
  if (!bgmAudio) return;
  bgmAudio.volume = state.profile.musicEnabled ? Math.max(0, Math.min(1, volume * 0.38)) : 0;
}

function playMusicNote(degree, beats, speed = 1, gainScale = 1) {
  if (!audioContext || !musicGain) return;
  const now = audioContext.currentTime;
  const duration = Math.max(0.08, beats * beatSeconds(speed));
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(degreeFrequency(degree), now);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1600, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.38 * gainScale, now + 0.035);
  gain.gain.setTargetAtTime(0.0001, now + duration * 0.72, 0.16);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(musicGain);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.18);
}

function playMusicPad(degrees, beats, speed = 1) {
  if (!audioContext || !musicGain) return;
  const now = audioContext.currentTime;
  const duration = Math.max(0.2, beats * beatSeconds(speed));
  degrees.forEach((degree, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(degreeFrequency(degree, -1) * (1 + index * 0.002), now);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(620, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.18);
    gain.gain.setTargetAtTime(0.0001, now + duration * 0.72, 0.5);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(musicGain);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.5);
  });
}

function runMusicPhrase(phrase, token, options = {}) {
  const speed = options.speed || 1;
  const step = options.index || 0;
  if (!state.musicPlaying || token !== musicToken) return;
  if (step >= phrase.length) {
    if (options.outro) {
      stopBackgroundMusic(false);
      return;
    }
    if (options.section === "main") {
      musicMainLoops += 1;
      const nextIsInterlude = musicMainLoops % 2 === 0;
      runMusicPhrase(nextIsInterlude ? INTRO_PHRASE : MAIN_PHRASE, token, {
        section: nextIsInterlude ? "interlude" : "main"
      });
      return;
    }
    runMusicPhrase(MAIN_PHRASE, token, { section: "main" });
    return;
  }

  const event = phrase[step];
  if (event.pad) playMusicPad(event.pad, event.padBeats || Math.max(event.beats, 4), speed);
  if (event.note) playMusicNote(event.note, event.beats, speed, options.outro ? 0.8 : 1);

  window.clearTimeout(musicTimer);
  musicTimer = window.setTimeout(() => {
    runMusicPhrase(phrase, token, { ...options, index: step + 1 });
  }, event.beats * beatSeconds(speed) * 1000);
}

function startBackgroundMusic() {
  if (!state.profile.musicEnabled || state.profile.volume <= 0) return;
  if (typeof Audio === "undefined") return;
  window.clearInterval(bgmFadeTimer);
  if (!bgmAudio) {
    bgmAudio = new Audio(BGM_URL);
    bgmAudio.loop = true;
    bgmAudio.preload = "auto";
  } else if (bgmAudio.src !== BGM_URL) {
    bgmAudio.src = BGM_URL;
  }
  setMusicVolume();
  if (state.musicEnding) {
    state.musicEnding = false;
  }
  if (state.musicPlaying) {
    if (bgmAudio.paused) {
      bgmAudio.play().catch(() => {});
    }
    return;
  }
  state.musicPlaying = true;
  bgmAudio.play().catch(() => {
    state.musicPlaying = false;
  });
}

function stopBackgroundMusic(fade = true) {
  window.clearTimeout(musicTimer);
  window.clearInterval(bgmFadeTimer);
  musicToken += 1;
  state.musicPlaying = false;
  state.musicEnding = false;
  if (!bgmAudio) return;
  if (!fade) {
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
    setMusicVolume();
    return;
  }
  const startVolume = bgmAudio.volume;
  let step = 0;
  bgmFadeTimer = window.setInterval(() => {
    step += 1;
    const progress = Math.min(1, step / 12);
    bgmAudio.volume = startVolume * (1 - progress);
    if (progress >= 1) {
      window.clearInterval(bgmFadeTimer);
      bgmAudio.pause();
      bgmAudio.currentTime = 0;
      setMusicVolume();
    }
  }, 45);
}

function playOutroMusic() {
  if (!bgmAudio || !state.profile.musicEnabled) return;
  state.musicEnding = true;
  stopBackgroundMusic(true);
}

function playSound(type) {
  if (state.profile.volume <= 0) return;
  try {
    if (!ensureAudioContext()) return;
    const now = audioContext.currentTime;
    const tones = {
      tap: [[520, 0.045]],
      start: [[440, 0.05], [660, 0.08]],
      match: [[360, 0.06], [500, 0.08]],
      line: [[720, 0.045], [980, 0.055]],
      score: [[620, 0.07], [880, 0.09], [1180, 0.11]],
      block: [[180, 0.09], [140, 0.08]],
      win: [[520, 0.08], [660, 0.08], [880, 0.16]]
    };
    const notes = tones[type] || tones.line;
    notes.forEach(([frequency, duration], index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const start = now + index * 0.075;
      oscillator.type = type === "line" || type === "score" ? "triangle" : type === "block" ? "square" : "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      const level = type === "line" || type === "score" || type === "block" ? 0.24 : 0.13;
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, state.profile.volume * level), start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.02);
    });
  } catch (error) {
    audioContext = null;
  }
}

function handleBoardPick(event) {
  const group = event.target.closest(".edge-group");
  if (!group) return;
  event.preventDefault();
  const now = Date.now();
  if (now - lastBoardTap < 80) return;
  lastBoardTap = now;
  if (state.diceRolling) {
    setStatus("骰子还在滚动，先等先手结果出来。");
    playSound("block");
    return;
  }
  if (state.aiThinking) {
    setStatus("AI 正在思考，等它下完就轮到你。");
    playSound("block");
    return;
  }
  if (state.mode === "pve" && state.currentPlayer === 1) {
    setStatus("现在是 AI 回合。");
    playSound("block");
    return;
  }
  placeEdge(group.dataset.key, state.currentPlayer);
}

function playButtonTap() {
  const now = Date.now();
  if (now - lastButtonSound < 90) return;
  lastButtonSound = now;
  ensureAudioContext();
  startBackgroundMusic();
  playSound("tap");
}

els.openSettingsBtn.addEventListener("click", openSettings);
els.closeSettingsBtn.addEventListener("click", closeSettings);
els.saveSettingsBtn.addEventListener("click", commitSettings);
els.closeDifficultyBtn.addEventListener("click", closeDifficultyPicker);
els.settingsModal.addEventListener("click", (event) => {
  if (event.target === els.settingsModal) closeSettings();
});
els.difficultyModal.addEventListener("click", (event) => {
  if (event.target === els.difficultyModal) closeDifficultyPicker();
});

els.volumeInput.addEventListener("input", updateVolumeLabel);
els.regenUidBtn.addEventListener("click", () => {
  state.profile.uid = makeUid();
  els.uidDisplay.textContent = state.profile.uid;
});

document.querySelectorAll(".avatar-choice").forEach((button) => {
  button.addEventListener("click", () => {
    state.profile.avatar = button.dataset.avatar;
    syncProfileUi();
  });
});

document.querySelectorAll(".difficulty-option").forEach((button) => {
  button.addEventListener("click", () => startPveWithDifficulty(button.dataset.difficulty));
});

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("pointerup", playButtonTap);
  button.addEventListener("click", playButtonTap);
});

els.pveBtn.addEventListener("click", () => {
  ensureAudioContext();
  startBackgroundMusic();
  openDifficultyPicker();
});

els.rollDifficultyBtn.addEventListener("click", rollDifficulty);
els.rollReel.addEventListener("click", rollDifficulty);

els.pvpBtn.addEventListener("click", () => {
  ensureAudioContext();
  showMatch();
});

els.cancelMatchBtn.addEventListener("click", goHome);
els.backHomeBtn.addEventListener("click", goHome);
els.restartBtn.addEventListener("click", restartGame);
els.rollAgainBtn.addEventListener("click", () => {
  if (state.diceRolling) {
    setStatus("骰子正在滚动中。");
    return;
  }
  if (state.turnMoves === 0) {
    clearPvpTurnTimer();
    rollDice();
    renderAll();
    setStatus("重新投骰子决定先手。");
    showDiceRollAnimation(() => {
      setStatus(`重新投骰结束，${state.players[state.currentPlayer].name} 先手。`);
      startPvpTurnTimer();
      maybeRunAi();
    });
  } else {
    setStatus("已经开始占格后不能重新掷骰。");
  }
});

els.playAgainBtn.addEventListener("click", () => {
  els.resultModal.classList.add("hidden");
  restartGame();
});

els.resultHomeBtn.addEventListener("click", goHome);

els.board.addEventListener("pointerup", handleBoardPick);
els.board.addEventListener("click", handleBoardPick);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDifficultyPicker();
    closeSettings();
    els.resultModal.classList.add("hidden");
  }
});

saveProfile();
syncProfileUi();
setScreen("start");
