///значения
let coins = 0
let tickets = 0
let coins2 = 0
let claimed = "f"
let wheelbutton = document.getElementById('play');
let indicator = document.getElementById('indicator')
let col = document.getElementById('colorsel')
let stavka = document.getElementById('stavka')
let compstavka = document.getElementById('sdelatstavku')
let color = 0
let price = -1
let cra = false
let st2 = document.getElementById('st2')
let tal = document.getElementById('team')
//ставки
let team = true // t=red
col.onclick = function () {
    if (team==true) {
        team=false
        tal.textContent="blue"
    }else {
        team=true
        tal.textContent="red"
    }
}
compstavka.onclick=function () {
if (cra == false){
    if (team==true) {
        color=1
    }else if(team==false){
        color=2
    }else{
    st2.textContent="Ошибка!"
        setTimeout(() => {
        st2.textContent="Сделать ставку"
        }, 2000)
    }
    if (Number(stavka.value)>0) {
        if (stavka.value!=" ") {
            if (Number(stavka.value)<=tickets) {
                price=Number(stavka.value)
                tickets-=price
                update()
            }else{
                st2.textContent="Ошибка!"
        setTimeout(() => {
        st2.textContent="Сделать ставку"
        }, 2000)
            }
        }else{
        st2.textContent="Ошибка!"
        setTimeout(() => {
        st2.textContent="Сделать ставку"
        }, 2000)
        }
    }else{
    st2.textContent="Ошибка!"
        setTimeout(() => {
        st2.textContent="Сделать ставку"
        }, 2000)
    }
    if (color!=0 && price!=-1) {
        cra = true
        st2.textContent="Ставка сделана!"
        save()
    }
  }
}

// игра
let h2play = document.getElementById('h2play')
let played = false
let finished = false
wheelbutton.onclick = function () {
if (finished==true) {
    save()
    location.reload()
}
if (played == false && cra == true) {
    played=true
    let val = Math.random()
    indicator.style.backgroundSize = "5000%"
    if (Math.ceil(val*10) < 6) {
    indicator.style.backgroundSize = "5000%"
        indicator.style.background = "linear-gradient(45deg, #6c6c6c, #ff4055, #ffe740, #6aff78, #4063ff, #7040ff, #5597ff)"
        setTimeout(() => {
            indicator.style.background = "#5597ff"
            indicator.style.backgroundSize = "5000%"
            //тайм-аут blue
            if (color==2) {
                price=price*2
                tickets+=price
                price=0
               h2play.textContent="Сбросить"
               finished=true
            }else{
                price=0
                finished=true
               cra=false
               h2play.textContent="Сбросить"
            }
            update()
        },10000)
    }else {
    indicator.style.backgroundSize = "5000%"
        indicator.style.background = "linear-gradient(45deg, #6c6c6c, #ff4055, #ffe740, #6aff78, #4063ff, #7040ff, #ff2b4a)"
        setTimeout(() => {
            indicator.style.background = "#ff2b4a"
            indicator.style.backgroundSize = "5000%"
            //тайм-аут red
            if (color==1) {
                price=price*2
                tickets+=price
                price=0
               h2play.textContent="Сбросить"
               finished=true
                
            }else{
                price=0
               h2play.textContent="Сбросить"
               finished=true
            }
            cra=false
            update()
        },10000)
    }
    indicator.style.animation = "anim 10s"
}
}
function update() {
    document.getElementById('coins').textContent = coins; document.getElementById('coins2').textContent = coins2;
document.getElementById('tickets').textContent= tickets
}
function save() {
    localStorage.c = coins
    localStorage.c2 = coins2
    localStorage.t = tickets
    localStorage.s = "t"
    localStorage.cl=claimed
    localStorage.code1 = code1
    localStorage.code2 = code2
    update()
}
function rest() {
    coins=0
    coins2=0
    tickets=0
    claimed="f"
    code1=false
    code2=false
    save()
    update()
}
// podarok 
let free = document.getElementById('free')
free.onclick = function () {
    if (claimed == "f") {
        claimed = "t"
        coins+=10;
        save()
        update()
        
    }
}
//обменник
let t1c2 = document.getElementById('t1c2')
t1c2.onclick = function () {
    if (coins >= 2) {
        coins -= 2
        tickets += 1
        save()
        update()
    }
}
let c1t2 = document.getElementById('c1t2')
c1t2.onclick = function () {
    if (tickets >= 1) {
        coins += 2
        tickets -= 1
        save()
        update()
    }
}
////коды
let code = document.getElementById('code')
let send = document.getElementById('send')
// code1
let code1 = false
let code1t = "ozayaki"
// code2
let code2 = false
let code2t = "sexbomba"
// function
send.onclick=function () {
    if (code.value==code1t && code1==false) {
        code1=true
        coins+=200
        code.value=""
        save()
        update()
    }else if (code.value==code2t && code2==false) {
        code2=true
        tickets+=35
        code.value=""
        save()
        update()
    }
    
}
function load() {
if (localStorage.s=="t") {
    coins = Number(localStorage.c);
    coins2 = Number(localStorage.c2);
    tickets = Number(localStorage.t);
    claimed = localStorage.cl;
    code1 = Boolean(localStorage.code1);
    code2 = Boolean(localStorage.code2);
    update()
}
}
load()