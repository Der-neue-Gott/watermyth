const gameState = {
  charName: 'Безымянный герой',
  gender: null
};

const elements = {
  container: document.getElementById('game-container'),
  speaker: document.getElementById('speaker-name'),
  text: document.getElementById('story-text'),
  choices: document.getElementById('choices-container'),
  inputContainer: document.getElementById('input-container'),
  textInput: document.getElementById('text-input'),
  submitBtn: document.getElementById('submit-btn'),
  musicBtn: document.getElementById('music-toggle-btn')
};

const BACKGROUNDS = {
  bedroom: '/bgs/bg_earlymorning.jpg',
  mirror: '/bgs/bg_mirror.jpg',
  view: '/bgs/bg_viewfromwindow.jpg',
  forest: '/bgs/bg_darkforest.jpg',
  mountains: '/bgs/bg_mountains.jpg',
  dragon: '/bgs/bg_dragonhome.jpg',
  gameover: '/bgs/bg_gameover.jpg'
};

const bgMusic = document.getElementById('bg-music');
let isMuted = false;
bgMusic.volume = 0.3;

const startOverlay = document.getElementById('start-overlay');
const startGameBtn = document.getElementById('start-game-btn');
const dialogBox = document.getElementById('dialog-box');



const scenes = {
  start: {
    speaker: 'Рассказчик',
    bg: BACKGROUNDS.bedroom,
    text: '- Эй, проснись...\nЭхо разносит таинственный голос по комнате, проникая в твои сны.',
    choices: [
      { text: '1. Открыть глаза, подняться с кровати', nextScene: 'morning_awake' },
      { text: '2. Закрыться подушкой и продолжить спать', nextScene: 'morning_sleep' },
      { text: '3. Вы ничего не слышали', nextScene: 'morning_fail' },
    ]
  },

  morning_sleep: {
    speaker: 'Конец',
    bg: BACKGROUNDS.bedroom,
    text: 'Может быть, тебе послышалось? Ты закрываешься подушкой и снова сладко засыпаешь.\nБездействие - это тоже действие. Наверное, поэтому ты больше никогда не проснешься.\n\nTHE END',
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },

  morning_fail: {
    speaker: 'Конец',
    bg: BACKGROUNDS.gameover,
    text: 'Как и любой среднестатистический гражданин, ты решил избежать ответственности, из-за чего на мир обрушилась небесная кара. Гордись собой!\n\nTHE END',
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },

  morning_awake: {
    speaker: 'Рассказчик',
    bg: BACKGROUNDS.bedroom,
    text: 'Ты открываешь глаза, мягкий свет утреннего солнца проливается сквозь незашторенные окна. Ты поднимаешься с кровати, пытаясь проснуться. Что же тебя разбудило?\n\n- Тьма приближается! Королевству угрожает великая опасность, и только ты способен остановить её. Найди меч, древний артефакт, сокрытый в издавна забытых местах Вотермифа! Лишь он может дать тебе силу, чтобы противостоять злу. Торопись, времени мало!',
    choices: [
      { text: 'Подойти к зеркалу', nextScene: 'mirror_select' }
    ]
  },


  mirror_select: {
    speaker: 'Рассказчик',
    bg: BACKGROUNDS.mirror,
    text: 'Ты идешь в ванную и смотришь на себя в зеркало.\nПрекрасно выглядите, господин! Или, может, госпожа?..',
    choices: [
      { text: '1. Моя сила спасёт Вотермиф!', onSelect: () => { gameState.gender = 'man' }, nextScene: 'ask_name' },
      { text: '2. Моя красота ещё никогда не подводила меня!', onSelect: () => { gameState.gender = 'woman' }, nextScene: 'ask_name' },
      { text: '3. Зовите меня фембоем.', nextScene: 'gender_fail' }
    ]
  },

  gender_fail: {
    speaker: 'Конец',
    bg: BACKGROUNDS.gameover,
    text: 'К сожалению, Вотермиф располагается не на Западе, поэтому здесь существует лишь два пола.\nТак и не определившись, собака ты или кухонный стул, ты вспоминаешь, что твое существование - лишь миф даже для этого королевства.\n\nTHE END',
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },

  ask_name: {
    speaker: 'Рассказчик',
    bg: BACKGROUNDS.mirror,
    text: () => gameState.gender === 'man'
    ? 'Говорят, сила есть - ума не надо. Но сказать такое тебе в лицо было бы фатальной ошибкой. Скорее всего в первую очередь потому, силы тебе было не занимать...\n\nКак зовут Вашего героя?'
    : 'Ты и вправду очень красива. Стоя у зеркала, в голову приходят лишь мысли о том, как тебе надоело ловить на себе мужские взгляды.\nНаверное, пора бы прекращать ходить на рынок в одном нижнем белье...\n\nКак зовут Вашу героиню?',
    hasInput: true,
    onInputSubmit: (name) => {
      let trimmed = name.trim();
      if(!trimmed) gameState.charName = 'Безымянный герой';
      else gameState.charName = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();

      return "way_start";
    }
  },


  way_start: {
    speaker: 'Рассказчик',
    bg: BACKGROUNDS.view,
    text: () => `Приведя себя в порядок, ты направляешься к окну. Твой взгляд охватывают поля, леса и горы, простирающиеся до самого горизонта.\nИменно там, вдалеке, находятся те самые забытые места, о которых говорил таинственный голос.\n\nКуда отправимся, ${gameState.charName}?`,
    choices: [
      { text: '1. Тёмный лес', nextScene: 'way_forest' },
      { text: '2. Горный перевал', nextScene: 'way_mountain' },
      { text: '3. Довериться госпоже Удаче и тётушке Судьбе', nextScene: 'way_lost' }
    ]
  },

  way_lost: {
    speaker: 'Конец',
    bg: BACKGROUNDS.gameover,
    text: 'Ты выходишь на улицу и уходишь в неизвестном направлении. Жители королевства никак не отреагировали на твоё очередное странное деяние. Пройдя несколько десятков километров, ты понимаешь, что всё же стоило взять с собой карту.\nА как... вернуться назад?\n\nTHE END',
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },


  // === ТЁМНЫЙ ЛЕС ===
  way_forest: {
    speaker: 'Рассказчик',
    bg: BACKGROUNDS.forest,
    text: () => gameState.gender === 'man'
    ? `Ты отправляешься в тёмный лес, полный опасностей и магических существ. В его глубинах скрывается старый мудрец, который знает, как найти меч. По пути ${gameState.charName} встречает опасных врагов!\nТвои действия?`
    : `Ты отправляешься в тёмный лес, полный опасностей и магических существ. Стоп... о каком тёмном лесу может идти речь, когда ночью в своей комнате ${gameState.charName} трясётся от собственной тени?\nОсознав это ещё у входа в лес, ${gameState.charName} разворачивается и поспешно возвращается домой.\nК сожалению, тебе не удастся спасти Вотермиф.\n\nTHE END`,
    choices: () => gameState.gender === 'man' ? [
      { text: '1. Попробовать обойти их и выжить с шансом 50%', nextScene: 'forest_stealth' },
      { text: '2. Вступить в ожесточённое сражение и потерять своё оружие', nextScene: 'forest_fight' },
      { text: '3. Подождать ещё немного', nextScene: 'forest_fail' },
    ] : [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },

  forest_fail: {
    speaker: 'Конец',
    bg: BACKGROUNDS.gameover,
    text: () => `Так и не сделав выбор, ${gameState.charName} остаётся сидеть в кустах на веки вечные...\n\nTHE END`,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },

  forest_stealth: {
    speaker: 'Конец',
    bg: BACKGROUNDS.forest,
    text: () => {
      let chance = Math.floor(Math.random() * 2);
      if(chance === 0) return `От дерева к дереву, от тени к тени, словно спецагент, ${gameState.charName} успешно обходит врагов. Вскоре ты добираешься до мудреца и рассказываешь ему о послании.\nПо счастливой случайности, мудрец хранит меч, этот самый артефакт, у себя! Он отдаёт меч и ты спокойно возвращаешься домой. Кажется, с ним ты и вправду защитишь Вотермиф.\n\nTHE END`;
      else return `Успешно обойдя врагов, ${gameState.charName} показывает им средний палец и танцует на месте. Это действие продолжается около минуты. По завершению акта злорадствования, ты оборачиваешься и видишь перед собой каменного голема.\nДействительно: смеётся тот, кто смеётся последним.\n\nTHE END`;
    },
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },

  forest_fight: {
    speaker: 'Конец',
    bg: BACKGROUNDS.forest,
    text: () => `В голове ты перебираешь все навыки, приобретённые от японских самураев, посещавших королевство годами ранее. Только зачем тебе эти навыки, когда в руках только лук? Вопрос хороший.\nОднако им ты овладел еще в детстве, так что на каждого врага потребовалось всего по одной стреле. Тем не менее, лук всё же ломается из-за феноменальной скорости твоей стрельбы.\nВскоре ты добираешься до мудреца и рассказываешь ему о послании. Мудрец на то и мудрец, что видит ложь насквозь. Из-за отсутствия у тебя оружия он прогоняет тебя прочь.\nА ведь вправду: кто станет слушать поехавшего крестьянина? И это ты еще не рассказал ему, как твой дед... кхм. Не будем об этом.\nК сожалению, тебе не удастся спасти Вотермиф.\n\nTHE END`,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },


  // === ГОРНЫЙ ПЕРЕВАЛ ===
  way_mountain: {
    speaker: () => gameState.gender === 'man' ? 'Конец' : 'Рассказчик',
    bg: BACKGROUNDS.mountains,
    text: () => gameState.gender === 'man'
    ? `Ты отправляешься на горный перевал, окруженный снежными вершинами и охраняемый Древним Драконом. Этот дракон известен своей жестокостью и силой: говорят, он победил элитную царскую кавалерию одним лишь взглядом.\nДойдя до перевала, ты достаёшь своё оружие и идёшь прямиком в логово чудища. Не проходит и минуты, как ${gameState.charName} сгорает дотла. Интересно, кем нужно быть, чтобы явиться к дракону с одним луком?\n\nTHE END`
    : `Ты отправляешься на горный перевал, окруженный снежными вершинами и охраняемый Древним Драконом. Этот дракон известен своей жестокостью и силой: говорят, он победил элитную царскую кавалерию одним лишь взглядом. Ты вспоминаешь фанфик, в котором гоорилось, что однажды это страшное чудище покорил обычный осёл. Хм... бред какой-то.\nПроделав столь долгий путь, ты идешь прямиком в логово. Не проходит и минуты, как существо обнаруживает твоё присутствие. Дракон подлетает к тебе и спрашивает:\n\n- Зачем ты пришла сюда? Я не убиваю красивых девушек, но твои мотивы должны быть вескими!`,
    choices: () => gameState.gender === 'man' ? [
      { text: 'Начать заново', nextScene: 'start' }
    ] : [
      { text: 'Ответить Дракону', nextScene: 'dragon_answer' }
    ]
  },

  dragon_answer: {
    speaker: 'Рассказчик',
    bg: BACKGROUNDS.dragon,
    text: 'Дракон явно зол. Что ты ответишь ему?\n\n(От страха в голове крутится лишь словосочетание "Древний артефакт"... Ничего больше в мысли не лезет!)',
    hasInput: true,
    onInputSubmit: (answer) => {
      if(answer.trim().toLowerCase() === 'древний артефакт') return 'dragon_win';
      else return 'dragon_lose';
    }
  },

  dragon_win: {
    speaker: 'Конец',
    bg: BACKGROUNDS.dragon,
    text: () => `${gameState.charName} рассказывает дракону все подробности. Выслушав тебя, тот улетает и открывает проход к древним сокровищам, которые тебя почему-то не интересуют. Ну и зря.\n${gameState.charName} забирает меч и спокойно возвращается домой. Кажется, с этим мечом ты и вправду защитишь Вотермиф.\n\nTHE END`,
    choices: [
      { text: 'Сыграть ещё раз', nextScene: 'start' }
    ]
  },

  dragon_lose: {
    speaker: 'Конец',
    bg: BACKGROUNDS.gameover,
    text: () => `Не успев открыть и рта, ${gameState.charName} сгорает дотла. Ты была так близко!\n\nВозможно, иногда действительно нужно прислушиваться к внутреннему голосу...\n\nTHE END`,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
};



// === ПРЕЛОАДЕР ФОНОВЫХ ИЗОБРАЖЕНИЙ
function preloadImage(imageUrls, callback) {
  let loadedCount = 0;
  const total = imageUrls.length;

  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    img.onload = img.onerror = () => {
      loadedCount++;

      if(loadedCount === total && callback) callback();
    };
  });
}

// запуск прелоадера сразу при запуске скрипта
preloadImage(Object.values(BACKGROUNDS), () => {
  console.log('Все фоновые картинки успешно загружены!');
});



// === НАЧАЛЬНЫЙ ЭКРАН И МУЗЫКА ===
startGameBtn.addEventListener('click', () => {
  // разблокировка музыки
  bgMusic.play().then(() => {
    console.log('Музыка успешно запущена!');
  }).catch(err => {
    console.log('Не удалось воспроизвести музыку:', err);
  });

  startOverlay.style.opacity = '0';
  setTimeout(() => {
    startOverlay.classList.add('hidden');
    dialogBox.classList.remove('hidden');

    renderScene('start');
  }, 800);
});

// мут музыки
elements.musicBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  
  if(isMuted) {
    elements.musicBtn.textContent = '🔇';
    elements.musicBtn.classList.add('muted');
  } else {
    elements.musicBtn.textContent = '🔊';
    elements.musicBtn.classList.remove('muted');
  }
});



// === ОТРИСОВКА СЦЕНЫ ===
function renderScene(sceneKey) {
  const scene = scenes[sceneKey];
  if(!scene) return;
  if(scene.bg) elements.container.style.backgroundImage = `url('${scene.bg}')`;

  elements.speaker.textContent = typeof scene.speaker === 'function' ? scene.speaker() : scene.speaker;
  const fullText = typeof scene.text === 'function' ? scene.text() : scene.text;
  typeAnimationText(elements.text, fullText, 18);

  // очистка предыдущих вариантов выбора
  elements.choices.innerHTML = '';
  elements.inputContainer.classList.add('hidden');

  // текстовый ввод
  if(scene.hasInput) {
    elements.inputContainer.classList.remove('hidden');
    elements.textInput.value = '';
    elements.textInput.focus();

    const handleSubmit = () => {
      const val = elements.textInput.value;
      const nextKey = scene.onInputSubmit(val);
      elements.submitBtn.removeEventListener('click', handleSubmit);
      renderScene(nextKey);
    };

    // нажатие на кнопку и Enter
    elements.submitBtn.onclick = handleSubmit;
    elements.textInput.onkeydown = (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };
  }
  // стандартный выбор
  else {
    const activeChoices = typeof scene.choices === 'function' ? scene.choices() : scene.choices;

    if(activeChoices) {
      activeChoices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;

        btn.onclick = () => {
          if(choice.onSelect) choice.onSelect();
          renderScene(choice.nextScene);
        };

        elements.choices.appendChild(btn);
      });
    }
  }
}



// === ТЕКСТОВАЯ АНИМАЦИЯ ===
function typeAnimationText(element, rawText, speed = 25) {
  element.innerHTML = '';
  let globalCharIndex = 0; // счетчик для задержки анимации букв

  const lines = rawText.split('\n'); // разбивка текста на строки
  lines.forEach((line, lineIndex) => {
    if(lineIndex > 0) element.appendChild(document.createElement('br'));

    const words = line.split(' '); // разбивка строк на слова
    words.forEach((wordText, wordIndex) => {
      if(wordIndex > 0) {
        // пробел между словами
        const space = document.createElement('span');
        space.className = 'char-space';
        space.innerHTML = '&nbsp;';

        element.appendChild(space);
      }

      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';

      // разбивка слов на символы
      const chars = Array.from(wordText);
      chars.forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = char;

        charSpan.style.animationDelay = `${(globalCharIndex * speed) / 1000}s`;
        globalCharIndex++;

        wordSpan.appendChild(charSpan);
      });

      element.appendChild(wordSpan);
    });
  });
}