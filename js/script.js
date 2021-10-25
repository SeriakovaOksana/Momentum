const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
const greetingBlock = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const body = document.querySelector('body');
const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');
const quoteBlock = document.querySelector('.quote');
const authorBlock = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');
const toggleAudioBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playlistContainer = document.querySelector('.play-list');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const userCity = document.querySelector('.city');
const volumeBtn = document.querySelector('.volume-button');
const ruBtn = document.querySelector('.ru-btn');
const enBtn = document.querySelector('.en-btn');
const audio = new Audio();
let playNum = 0;
const volumeLine = document.querySelector('.volume-slider');
let mousedown = false;
const timeLine = document.querySelector(".timeline");
const audioName = document.querySelector('.audio-name-text');
let city;
let randomNum = getRandomNum(1, 20);
let isPlay = false;
const quotesLength = 7;
let quotRandomNumber = getRandomNum(0, (quotesLength - 1)); 
let quotesNumbers = [];
const linksTitle = document.querySelector('.links-title');
const linksBoard = document.querySelector('.links-board');
const addBtnWrapper = document.querySelector('.add-button-wrapper')
const addLinkBtn = document.querySelector('.add-link');
const newLinkBoard = document.querySelector('.new-link-board');
const createLinkBtn = document.querySelector('.create-new');
const linkNameInput = document.querySelector('.link-name-input');
const linkUrlInput = document.querySelector('.link-url-input');
const backBtn = document.querySelector('.back');

const myRegExp =/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

const ms = {
    ru : 'м/с',
    en : 'm/s'
};

let language = 'en';

const timeOfDayLang = {
    ru: {'Night' : 'Доброй Ночи', 'Morning' : 'Доброе Утро', 'Afternoon' : 'Добрый День', 'Evening' : 'Добрый Вечер'},
    en: {'Night' : 'Good Night', 'Morning' : 'Good Morning', 'Afternoon' : 'Good Afternoon', 'Evening' : 'Good Evening'}
}

const dateLang = {
    ru : 'ru-Ru',
    en : 'en-Us'
};

const placeholderLang = {
    ru : '[Введите имя]',
    en : '[Enter name]'
}

const playList = [
    {      
      title: 'Aqua Caelestis',
      src: './assets/sounds/Aqua-Caelestis.mp3',
      duration: '00:58'
    },  
    {      
      title: 'River Flows In You',
      src: './assets/sounds/River-Flows-In-You.mp3',
      duration: '03:50'
    },
    {      
        title: 'Ennio Morricone',
        src: './assets/sounds/Ennio-Morricone.mp3',
        duration: '00:58'
    },
    {      
        title: 'Summer Wind',
        src: './assets/sounds/Summer-Wind.mp3',
        duration: '00:58'
    }
];

// 1
// выводим время
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();

    timeBlock.textContent = currentTime;
    showDate();
    getTimeOfDay()
    showGreeting(timeOfDayLang[language][getTimeOfDay()]);

    setTimeout(showTime, 1000);
}

showTime();

// выводим дни недели
function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = date.toLocaleDateString(dateLang[language], options);

    dateBlock.textContent = currentDate;
}

// 2
// приветствие (время суток)
function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    if (hours >= 0 && hours < 6) {
        timeOfDay = 'Night';
    } else if (hours >= 6 && hours < 12) {
        timeOfDay = 'Morning';
    } else if (hours >= 12 && hours < 18) {
        timeOfDay = 'Afternoon';
    } else if (hours >= 18 ) {
        timeOfDay = 'Evening';
    }

    return timeOfDay;
}

function showGreeting(lang) {
    greetingBlock.textContent = `${lang},`;
}

// приветствие (имя пользователя)
function setLocalStorage() {
    localStorage.setItem('name', nameInput.value);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    } 
}

window.addEventListener('load', getLocalStorage);

// 3
// смена фона 
function getRandomNum(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function setBG() { 
    const img = new Image();

    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay().toLocaleLowerCase()}/${randomNum.toString().padStart(2, 0)}.jpg`
    
    img.onload = () => {      
      body.style.backgroundImage = `url(${img.src})`;
    };
}

setBG();

// слайдер изображений 
function getSlideNext() {
    if (randomNum < 20) {
        randomNum++;
        setBG();
    } else {
        randomNum = 1;
        setBG();
    }
}

function getSlidePrev() {
    if (randomNum > 1) {
        randomNum--;
        setBG();
    } else {
        randomNum = 20;
        setBG();
    }
}

nextBtn.addEventListener('click', getSlideNext);
prevBtn.addEventListener('click', getSlidePrev);

// 4
// погода
if (localStorage.getItem('userCity')) {
    city = localStorage.getItem('userCity');
    userCity.value = localStorage.getItem('userCity');
} else {
    city = 'Minsk';
    userCity.value = 'Minsk';
}
async function getWeather(c, l, m) { 
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${c}&lang=${l}&appid=d678403322adcf141be71adc7ef315dc&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(Number(data.main.temp))}°C`;
        weatherDescription.textContent = data.weather[0].description;

        wind.textContent = `${Math.round(Number(data.wind.speed))}${m}`;
        humidity.textContent = `${Math.round(Number(data.main.humidity))}%`;      
        
        localStorage.setItem('userCity', userCity.value);
        userCity.value = data.name;
    } catch (e) {
        userCity.value = 'Please, enter city';
        console.log(`Error! ${e}`);
    }
}

getWeather(city, language, ms[language]);

userCity.addEventListener('change', function() {
    getWeather(userCity.value, language, ms[language]);
});

// 5
// цитата дня
async function getQuotes(lang) {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

    quoteBlock.textContent = data[quotRandomNumber][lang].text;
    authorBlock.textContent = data[quotRandomNumber][lang].author;

    quotesNumbers.push(quotRandomNumber);
}

getQuotes(language);

changeQuoteBtn.addEventListener('click', function() {
    quotRandomNumber = getRandomNum(0, (quotesLength - 1));
    getQuotes(language);
});

// 6
// аудио-плеер
// создаем плейлист в html
playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    li.setAttribute('data-src', el.src);
    playlistContainer.append(li);
});

// эту переменную обязательно оставляем на месте, т.к. мы только сейчас создали элементы плейлиста
const playItems = document.querySelectorAll('.play-item');

function playAudio() { // играть / стоп
    if (!isPlay) {
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        
        audioName.textContent = playList[playNum].title;

        isPlay = true;
    } else {
        audio.pause();
        isPlay = false;
    }

    toggleAudioIcon();
    let currentAudio = document.querySelector(`[data-src="${playList[playNum].src}"]`);
    playItems.forEach(item => item.classList.remove('item-active'));
    currentAudio.classList.add('item-active');
}

function toggleAudioIcon() { // меняем иконку 
    if (isPlay) {
        toggleAudioBtn.classList.add('pause');
    } else {
        toggleAudioBtn.classList.remove('pause');
    }
}

// предыдущий / следующий трек
function prevAudio() {
    isPlay = false;

    if (playNum > 0) {
        playNum--;
    } else {
        playNum = playList.length - 1;
    }

    playAudio();
    toggleAudioIcon();
}

function nextAudio() {
    isPlay = false;

    if (playNum < playList.length - 1) {
        playNum++;
    } else {
        playNum = 0;
    }  

    playAudio();
    toggleAudioIcon();
}

toggleAudioBtn.addEventListener('click', playAudio);

playPrevBtn.addEventListener('click', prevAudio);
playNextBtn.addEventListener('click', nextAudio);

audio.addEventListener('ended', nextAudio);

// 7
// продвинутый аудио-плеер 
// вычисляем длительность аудио
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}
  
audio.addEventListener("loadeddata", () => { // записали длительность аудио
    document.querySelector('.length').textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = 1;
});

audio.addEventListener('timeupdate', updateProgress); // когда проигрывается аудио - заполняется и прогресс-бар

function updateProgress() {
    timeLine.value = (audio.currentTime / audio.duration) * 100;
    timeLine.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${(audio.currentTime / audio.duration) * 100}%, #C4C4C4 ${(audio.currentTime / audio.duration) * 100}%, #C4C4C4 100%)`;
    
    document.querySelector(".current").textContent = getTimeCodeFromNum(audio.currentTime); // записали текущее время аудио
}

// перемотка по прогрессбару
function scrub(event) {
    const scrubTime = (event.offsetX / timeLine.offsetWidth) * audio.duration;
    audio.currentTime = scrubTime;

    const value = timeLine.value;
    timeLine.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

timeLine.addEventListener('click', scrub);
timeLine.addEventListener('mousemove', (event) => mousedown && scrub(event));
timeLine.addEventListener('mousedown', () => mousedown = true);
timeLine.addEventListener('mouseup', () => mousedown = false);

// громкость 
function handleRangeUpdate() {
    audio.volume = volumeLine.value;

    volumeLine.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${volumeLine.value * 100}%, #C4C4C4 ${volumeLine.value * 100}%, #C4C4C4 100%)`;

    if (volumeLine.value === '0') {
        volumeBtn.classList.add('volume-mute');
    } else {
        volumeBtn.classList.remove('volume-mute')
    }
}

volumeLine.addEventListener('change', handleRangeUpdate);
volumeLine.addEventListener('mousemove', handleRangeUpdate);

volumeBtn.addEventListener('click', toggleVolume);

function toggleVolume() {
    volumeBtn.classList.toggle('volume-mute');
    
    if (volumeBtn.classList.contains('volume-mute')) {
        volumeLine.value = 0;
    } else {
        volumeLine.value = 1;
    }

    handleRangeUpdate();
}

// перевод приложения 8
ruBtn.addEventListener('click', function() {
    language = 'ru';
    getWeather(userCity.value, language, ms[language]);
    nameInput.placeholder = placeholderLang[language];
    showTime();
    quotRandomNumber = quotesNumbers[quotesNumbers.length - 1];
    getQuotes(language);
});

enBtn.addEventListener('click', function() {
    language = 'en'; 
    getWeather(userCity.value, language, ms[language]);
    nameInput.placeholder = placeholderLang[language];
    showTime();
    quotRandomNumber = quotesNumbers[quotesNumbers.length - 1];
    getQuotes(language);
});


// links 
function toggleLinksBoard() {
    linksBoard.classList.toggle('links-board-visible');
}
function toggleNewLinksBoard() {
    newLinkBoard.classList.toggle('new-link-board-visible');
}

function showError(inp) {
    inp.classList.add('link-input-error');
}

function hideError(inp) {
    inp.classList.remove('link-input-error');
}

function clearInputs() {
    hideError(linkNameInput);
    hideError(linkUrlInput);

    linkNameInput.value = '';
    linkUrlInput.value = '';
}

function createLink() {
    if (linkNameInput.value && linkUrlInput.value && (myRegExp.test(linkUrlInput.value))) {
        const newLinkItem = document.createElement('div');

        newLinkItem.classList.add('links-item');
        newLinkItem.innerHTML = `
            <a href="https://${linkUrlInput.value}" class="link" target="_blank">
                <img src="assets/svg/link.svg" alt="icon: link-icon" class="link-icon">
                <span class="link-name">${linkNameInput.value}</span>
            </a>
            <img src="assets/svg/delete-link.svg" alt="icon: link-icon" class="link-icon delete-icon">`;
    
        linksBoard.insertBefore(newLinkItem, addBtnWrapper);
        hideError(linkNameInput);
        hideError(linkUrlInput);
        toggleLinksBoard();
        toggleNewLinksBoard();
    } else if (!linkNameInput.value) {
        showError(linkNameInput);
    } else if (!linkUrlInput.value || !(myRegExp.test(linkUrlInput.value))) {
        showError(linkUrlInput);
    } else if (!linkNameInput.value || !linkUrlInput.value) {
        showError(linkNameInput);
        showError(linkUrlInput);
    }
}

function deleteLink(event) {
    if (event.target.classList.contains('delete-icon')) {
        linksBoard.removeChild(event.target.parentNode);
    }
}

linksTitle.addEventListener('click', toggleLinksBoard);
addLinkBtn.addEventListener('click', toggleNewLinksBoard);
addLinkBtn.addEventListener('click', toggleLinksBoard);
addLinkBtn.addEventListener('click', clearInputs);
createLinkBtn.addEventListener('click', createLink);
backBtn.addEventListener('click', toggleNewLinksBoard);
backBtn.addEventListener('click', toggleLinksBoard);

linksBoard.addEventListener('click', deleteLink);

linkNameInput.addEventListener('input', function() {
    hideError(linkNameInput);
});

linkUrlInput.addEventListener('input', function() {
    hideError(linkUrlInput);
});

console.log(`
Сделано:
1. Часы и календарь +15:
    1) время выводится в 24-часовом формате, например: 21:01:00 +5
    2) время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) +5
    3) выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" +5
2. 2.Приветствие +10:
    1) текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь) +5
    2) пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется, данные о нём хранятся в local storage +5
3. Смена фонового изображения +20:
    1) ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20) +5
    2) изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.
    3) изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) +5
    4) изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) +5
    5) при смене слайдов обеспечена плавную смену фоновых изображений +5
4. Виджет погоды +15:
    1) город по умолчанию - Минск, пока пользователь не ввёл другой город; при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage +5
    2) данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел +5
    3) выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) +5
5. Виджет цитата дня +10:
    1) при загрузке страницы приложения отображается рандомная цитата и её автор +5
    2) при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +5
6. Аудиоплеер +15:
    1) при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause +3
    2) при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play +3
    3) треки можно пролистывать кнопками Play-next и Play-prev
    4) треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) +3
    5) трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем +3
    6) после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. +3
7. Продвинутый аудиоплеер (реализуется без использования библиотек) +17:
    1) добавлен прогресс-бар в котором отображается прогресс проигрывания +3
    2) при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека +3
    3) над прогресс-баром отображается название трека +3
    4) отображается текущее и общее время воспроизведения трека +3
    5) есть кнопка звука при клике по которой можно включить/отключить звук +2
    6) добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука +3
8. Перевод приложения на два языка (у меня en/ru) +13:
1) переводится язык и меняется формат отображения даты +3
2) переводится приветствие и placeholder +3
3) переводится прогноз погоды в т.ч описание погоды и город по умолчанию +3
4) переводится цитата дня +3
5) не переводится имя пользователя (но переводится введенный им город) +1
9. В качестве дополнительного функционала реализовала некое подобие Links: по клику на "Links" открывается список ссылок и кнопка создания новой ссылки, по клику на которую открывается блок с инпутами для ввода данных и кнопкой "создать" (добавлена небольшая проверка на пустые поля и неправильный url). Есть возможность добавить / удалить ссылку. Думаю, баллов 8 можно за это накинуть

PS. У меня немного криво реализован - аудио каждый раз начинается сначала, а не продолжается с места паузы, после паузы или переключения трека значение инпута скачет на 50%... Не знаю, сколько баллов за это нужно снизить

Всего: 123 / 150
`);