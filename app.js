let city = "Bangkok"; // ใช้ let เพราะค่าเปลี่ยนแปลงตลอด
const apiKey = "823f1d96c8a49f0a7c01b076adf7199b"; // API key

const form = document.getElementById('form');
const search = document.getElementById('search');


function setData() {
    showWeather();
}

async function showWeather() {
    // ใช้ try catch เพื่อดัก error ถ้าเกิดมี error ก็ให้แสดง error ออกมา
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // เรียกใช้ api ผ่านชื่อเมือง
        const response = await fetch(url);
        const data = await response.json();
        showDataToUI(data);
    } catch (error) {
        console.log(error);
    }
}

function showDataToUI(data) {
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const weather = document.getElementById('weather');
    const status = document.getElementById('status');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');

    city.innerText = data.name;
    state.innerText = data.sys.country;
    weather.children[0].innerHTML = calculate(parseInt(data.main.temp)) + " C&deg;"; // แปลง string เป็น int + สัญลักษณ์องศาเซลเซียส
    weather.children[1].innerHTML = "min : " + calculate(parseInt(data.main.temp_min)) + " C&deg;" +"&nbsp;&nbsp;&nbsp;&nbsp;"+ " max : " + calculate(parseInt(data.main.temp_max)) + " C&deg;"; // ปัดเศษ

    // status
    status.innerText = data.weather[0].main;
    humidity.innerText = " Humidity : " + data.main.humidity;
    wind.innerText = " Wind : " + data.wind.speed;
}

// แปลงอุณหภูมิจาก เคลวิน เป็น เซลเซียส

function calculate(k) {
    return k - 273;
}

// เรียกใช้เมื่อกดปุ่ม submit ในแบบฟอรม์
function callDataAPI(e) {
    e.preventDefault(); // ไม่ให้หน้าเว็บมีการ Refresh
    city = search.value;
    showWeather();
}

form.addEventListener('submit', callDataAPI);
setData();