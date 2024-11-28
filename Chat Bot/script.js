function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const messagesDiv = document.querySelector('.chat-messages');

    // Display user's message
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = userInput;
    messagesDiv.appendChild(userMessage);

    // Simulate bot's response (replace with actual AI or predefined responses)
    const botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');
    botMessage.textContent = getBotResponse(userInput);
    messagesDiv.appendChild(botMessage);

    document.getElementById('user-input').value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
}

function getBotResponse(userInput) {

    const responses = {
        "hello": "Hi there!",
        "how are you": "I'm doing well, thank you. How about you?",
        "what's the weather": "I can't tell you the weather, but you can check online.",
        "good morning": "Good morning! How can I help you today?",
        "good afternoon": "Good afternoon! What can I do for you?",
        "good evening": "Good evening!1 How can I assist you?",
        "hi": "Hi there! How can I help?",
        "hello": "Hello! What would you like to talk about?",
        "hey": "Hey! How can I help you today?",
        "how are you doing": "I'm doing well, thank you. How are you?",
        "what's up": "Not much, just helping people. What about you?",
        "can you talk": "Of course, I'm here to chat. What's on your mind?",
        "are you a robot": "I'm a language model, designed to process information and respond to queries.",
        "tell me a joke": "Sure, here's a joke: Why did the scarecrow win an award? Because he was outstanding in his field!",
        "tell me a story": "Once upon a time...",
        "sing a song": "I can't sing, but I can tell you a song lyric. How about 'Twinkle, Twinkle, Little Star'?",
        "what's the weather like": "I can't provide real-time weather information, but you can check a weather website.",
        "can you help me with math": "Sure, what's the math problem?",
        "can you translate something": "Yes, I can translate text. What language would you like to translate from and to?",
        "can you write a poem": "Sure, what would you like the poem to be about?",
        "can you write a story": "Yes, I can write a short story. What genre would you like?",
    };

    return responses[userInput.toLowerCase()] || "I don't understand. Please try asking something else.";
}