const caldr = document.querySelector("#clock__caldr");
const time = document.querySelector("#clock__time");

function getClock(){
    const date  = new Date();
    const year = String(date.getFullYear()).padStart(2,"0")+'년';
    // const mon = String(date.getMonth('en-us', {2-digit})).padStart(2,"0");
    const mon = String(date.toLocaleString('ko-kr', {month: 'long'})).padStart(2,"0");
    const day = String(date.toLocaleString('ko-kr', {day: '2-digit'})).padStart(2,"0");
    caldr.innerText = `${year} ${mon} ${day}`;
    
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    time.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);