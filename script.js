let btn=document.querySelector("#btn")
let content=document.querySelector("#content")

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1.2;
    text_speak.pitch=1;
    text_speak.volume=5;
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak)
}
function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good morning")   
    }
    else if(hours>=12 && hours<4){
        speak("Good afternoon")
    }
    else{
        speak("Good afternoon")
    }
}
window.addEventListener('load',()=>{
    wishMe()
})
let speechRecognition= Window.SpeechRecognition || window.webkitSpeechRecognition
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
    takeCommand(transcript)
}

btn.addEventListener("click",()=>{
    recognition.start()
   
})
const responseBox = document.getElementById("response");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  responseBox.textContent = "Speech Recognition not supported.";
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  document.getElementById("btn").onclick = () => {
    responseBox.textContent = "Listening...";
    recognition.start();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    responseBox.textContent = "You said: " + transcript;

    if (transcript.includes("play")) {
      const song = transcript.replace("play", "").trim();
      const youtubeURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`;
      window.open(youtubeURL, "_blank");
    } else {
      const googleSearch = `https://www.google.com/search?q=${encodeURIComponent(transcript)}`;
      window.open(googleSearch, "_blank");
    }
  };

  recognition.onerror = (event) => {
    responseBox.textContent = "Error: " + event.error;
  };
}

function takeCommand(message){
     
    if(message.includes("Hello")||message.includes("Hey")){
        speak("hello dear,what can i help you?")
    }
    else if(message.includes("Who are you")||message.includes("name")){
        speak("My name is jarvise and i am a virtual assistant,and i am created by priyanshu sir")
    }else if(message.includes("namaste")){
        speak("hello dear, i am a virtual assistant,and i am created by priyanshu sir")
    }
    else if(message.includes("about you")){
        speak("I am a virtual assistant and my name is jarvise and i am created by priyanshu sir")
    }
    else if(message.includes("Open YouTube")){
        speak("opening youtub...")
        window.open("https://www.youtube.com/","_blank")
    }else if(message.includes("mood")){
        speak("thanks for asking ,now i am very happy ")
    } else if(message.includes("name")){
        speak("I am jarvis,your assistant")
    } else if(message.includes("Open Google")){
        speak("opening google...")
        window.open("https://www.google.com/","_blank")
    } else if(message.includes("Open game")){
        speak("opening game...")
        window.open("https://poki.com/en/g/stickman-dragon-fight","_blank")
    }else if(message.includes("song")){
        speak("playing song")
        window.open("https://www.youtube.com/watch?v=pAQAp59ZZ50","_blank")
    }else if(message.includes("money money")){
        speak("playing music...")
        window.open("https://www.youtube.com/watch?v=oRVJLqRp8lg","_blank")
    }else if(message.includes("sad")||message.includes("Arijit Singh")){
        speak("playing music")
        window.open("https://www.youtube.com/watch?v=XcHCnX6mmxE","_blank")
    }
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }
    else {
        speak(`this is what i found on internet regarding ${message}`);
        window.open(`https://www.google.com/search?q=${message}`);
    }
}
