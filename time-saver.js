

const time = {
    init: 0,
    current:0,
    pause: 0,
    timerId: ''
}

const $log = document.querySelector('#log')

const play = () => {
    time.init = Date.now()
    time.timerId = setInterval( () => {
        const currentTime = Date.now()
        // 경과한 밀리초 가져오기
        const diff = currentTime - time.init

        // 초(second) 단위 변환하기
        time.current = time.pause + Number(Math.floor(diff / 1000))

        $log.textContent = `${time.current}`
    }, 1000) 
}


const pause = () => {
    clearInterval(time.timerId)
    time.pause = time.current
    $log.textContent = `${time.pause}`
    localStorage.setItem('time-saver', time.pause)
}

const reset = () => {
    localStorage.removeItem('time-saver')
    clearInterval(time.timerId)
    time.pause = 0
    $log.textContent = 0
}


document.querySelector('#playButton')
    .addEventListener('click', play)

document.querySelector('#stopButton')
    .addEventListener('click', pause)

document.querySelector('#resetButton')
    .addEventListener('click', reset)



