import { marked } from "marked";

const form = document.getElementById('message-form');
const input = document.getElementById('text-input');
const outputContainer = document.getElementById('interface');

form.addEventListener('submit', handleTranslateRequest);

async function handleTranslateRequest(e) {
    
    e.preventDefault();

    const message = input.value.trim()
    if (!userPrompt) return;

    try {
        const res = await fetch('api/translate', {
            method: "POST",
            Headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ message })
        })
        data = await res.json()

        if(!res.ok) {
            throw new Error(data.message)
        }

    } catch (e) {
        console.log(error);
        outputContainer.innerHTML = `
            <div class="ai chat">
                <p>Sorry an issue was encountered</p>
            </div>
        `
    }

}