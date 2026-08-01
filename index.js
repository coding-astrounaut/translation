
const form = document.getElementById('message-form');
const input = document.getElementById('text-input');
const outputContainer = document.getElementById('chat');

form.addEventListener('submit', handleTranslateRequest);

async function handleTranslateRequest(e) {
    
    e.preventDefault();



    const message = input.value.trim()
    if (!message) return;

    outputContainer.innerHTML += `
        <div class="user chat">
            <p>${message}</p>
        </div>
    `
    const selectedLanguage = document.querySelector('input[name="language"]:checked').value;

    try {
        const res = await fetch('http://localhost:3001/api/translate', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userPrompt: message, userLanguage: selectedLanguage })
        })
        const data = await res.json()

        if(!res.ok) {
            throw new Error(data.message)
        }

        outputContainer.innerHTML += `
            <div class="ai chat">
                <p>${data.reply}</p>
            </div>
        `

    } catch (e) {
        console.log(e);
        outputContainer.innerHTML += `
            <div class="ai chat">
                <p>Sorry an issue was encountered</p>
            </div>
        `
    }

}