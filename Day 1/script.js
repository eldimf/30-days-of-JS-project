const textarea = document.querySelector('textarea'),
voiceList = document.querySelector('select')
speechBtn = document.querySelector('button')

let synth = speechSynthesis
let isSpeeking = true

voices();

function voices() {
    for (let voice of synth.getVoices() ) {
        let selected = voice.name ==="Google US English" ? "selected" :"";
        let option = `<option value=" ${voice.name}" ${selected}> ${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjecentHTML( "beforeend", option);

    }
}

synth.addEventListener('voiceschanged', voices)

function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text)
    for ( let voice of synth.getVoices()){
        if ( voice.name === voiceList.value) {
            utternance.voice = voice
        }
    }
    synth.speak(utternance)
}

speechBtn.addEventListener('click', e => {
    e.preventDefault()
    if (textarea.value !== '') {
        if (!synth.speaking) {
            textToSpeech (textarea.value)
    }
    
}
    if (textarea.value.length > 80) {
        if (isSpeeking) {
        synth.resume()
        isSpeeking = false
        speechBtn.innerHTML = 'Pause Speech'
    } else {
        synth.pause()
        isSpeeking = true
        speechBtn.innerHTML = 'Resume Speech'

    }
    setInterval(() => {
        if ( !synth.speaking && !isSpeeking) {
            isSpeeking =true
            speechBtn.innerText = 'Convert to Speech'
        }
    });
    } else {
        speechbtn.innerText = 'Convert to Speech'
    } 
});

