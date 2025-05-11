from flask import Flask, request, jsonify
import requests
import json
import os
from flask_cors import CORS
app = Flask(__name__)
CORS(app) 
base_url = os.environ.get('OLLAMA_URL', 'http://localhost:11434')
OLLAMA_URL = f"{base_url}/api/generate"
OLLAMA_MODEL = 'llama3.2'

@app.route('/api/priority', methods=['POST'])
def get_priority():
    data = request.get_json()
    task_description = data.get('task')
    if not task_description:
        return jsonify({'error': 'Task description required'}), 400

    prompt = (
        f"Task: '{task_description}'.\n"
        f"Evaluate the priority of this task based on its importance and urgency. "
        f"Respond with one word: LOW, MEDIUM, or HIGH. "
        f"Make sure that critical tasks, such as those related to security or data loss, are marked as HIGH."
    )

    try:
        # Wysyłanie żądania do Ollama
        response = requests.post(OLLAMA_URL, json={
            'model': OLLAMA_MODEL,
            'prompt': prompt
        }, timeout=10, stream=True)

        response.raise_for_status()

        # Odbieranie odpowiedzi w strumieniu
        full_response = ""
        for chunk in response.iter_lines(decode_unicode=True):
            if chunk:
                chunk_data = json.loads(chunk)
                full_response += chunk_data.get('response', '')

        # Walidacja odpowiedzi
        ai_response = full_response.strip().lower()
        valid_priorities = ['low', 'medium', 'high']
        for priority in valid_priorities:
            if priority in ai_response:
                return jsonify({'priority': priority})

        # Jeśli nie znaleziono żadnej prawidłowej wartości
        return jsonify({'error': 'Could not determine priority', 'raw_response': ai_response}), 400

    except (requests.RequestException, ValueError, KeyError) as e:
        return jsonify({'error': f'Service error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=5001)