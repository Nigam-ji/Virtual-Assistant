    let btn = document.querySelector("#btn");
    let content = document.querySelector("#content");
    let responseBox = document.getElementById("response");

    function speak(text) {
      let text_speak = new SpeechSynthesisUtterance(text);
      text_speak.rate = 1.1;
      text_speak.pitch = 1;
      text_speak.volume = 1;
      text_speak.lang = "hi-IN";
      window.speechSynthesis.speak(text_speak);
    }

    function wishMe() {
      let hours = new Date().getHours();
      if (hours < 12) speak("Good morning");
      else if (hours < 17) speak("Good afternoon");
      else speak("Good evening");
    }

    window.addEventListener("load", () => {
      wishMe();
    });

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      responseBox.textContent = "Speech Recognition not supported.";
    } else {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      btn.addEventListener("click", () => {
        responseBox.textContent = "Listening...";
        recognition.start();
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        content.innerText = "You said: " + transcript;
        responseBox.textContent = "";
        takeCommand(transcript);
      };

      recognition.onerror = (event) => {
        responseBox.textContent = "Error: " + event.error;
      };
    }

    function takeCommand(transcript) {
      transcript = transcript.toLowerCase();

      if (transcript.includes("hello") || transcript.includes("hey")) {
        speak("Hello dear, what can I help you with?");
      } else if (transcript.includes("who are you") || transcript.includes("your name")) {
        speak("My name is Jarvis and I am a virtual assistant, created by Priyanshu sir.");
      } else if (transcript.includes("namaste")) {
        speak("Namaste! I am your assistant Jarvise.");
      } else if (transcript.includes("about you")) {
        speak("I am a virtual assistant named Jarvise, created by Priyanshu sir.");
      } else if (transcript.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
      } else if (transcript.includes("mood")) {
        speak("Thanks for asking. I am feeling great!");
      } else if (transcript.includes("name")) {
        speak("I am Jarvise, your assistant.");
      } else if (transcript.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
      } else if (transcript.includes("open game")) {
        speak("Opening game...");
        window.open("https://poki.com/en/g/stickman-dragon-fight", "_blank");
      } else if (transcript.includes("song")) {
        speak("Playing song...");
        window.open("https://www.youtube.com/watch?v=pAQAp59ZZ50", "_blank");
      } else if (transcript.includes("money money")) {
        speak("Playing music...");
        window.open("https://www.youtube.com/watch?v=oRVJLqRp8lg", "_blank");
      } else if (transcript.includes("sad") || transcript.includes("arijit singh")) {
        speak("Playing music...");
        window.open("https://www.youtube.com/watch?v=XcHCnX6mmxE", "_blank");
      } else if (transcript.includes("time")) {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        speak(`The time is ${time}`);
      } else if (transcript.includes("date")) {
        let date = new Date().toLocaleDateString([], { day: 'numeric', month: 'long' });
        speak(`Today's date is ${date}`);
      } else if (transcript.startsWith("play")) {
        const song = transcript.replace("play", "").trim();
        if (song) {
          speak(`Playing ${song} on YouTube`);
          window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`, "_blank");
        } else {
          speak("Please tell me which song to play.");
        }
      } else {
        speak(`This is what I found on Google regarding ${transcript}`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(transcript)}`, "_blank");
      }
    }
