

const time = {
    init: 0,
    current: 0,
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

        $log.textContent = `${getDisplayStr(time.current)}`
    }, 1000) 
}


const pause = () => {
    clearInterval(time.timerId)
    time.pause = time.current
    localStorage.setItem('time-saver', time.pause)
}

const reset = () => {
    localStorage.removeItem('time-saver')
    clearInterval(time.timerId)
    time.pause = 0
    $log.textContent = 0
}

const getDisplayStr = (seconds) => {
    const d = Number(seconds)
    const h = Math.floor(d / 3600)
    const m = Math.floor(d % 3600 / 60)
    const s = Math.floor(d % 3600 % 60)

    const hDisplay = h > 0 ? `${h}시간` : '';
    const mDisplay = m > 0 ? `${m}분` : '';
    const sDisplay = s > 0 ? `${s}초` : '';

    return `${hDisplay} ${mDisplay} ${sDisplay}`
}


document.querySelector('#playButton')
    .addEventListener('click', play)

document.querySelector('#stopButton')
    .addEventListener('click', pause)

document.querySelector('#resetButton')
    .addEventListener('click', reset)



