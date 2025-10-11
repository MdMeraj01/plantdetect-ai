# app.py
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Environment variables से API key लें
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

print(f"GEMINI_API_KEY loaded: {'Yes' if GEMINI_API_KEY else 'No'}")  # Debug line

# Route for main page
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/how-it-works')
def how_it_works():
    return render_template('how-it-works.html')

@app.route('/plant-database')
def plant_database():
    return render_template('plant-database.html')

@app.route('/disease-library')
def disease_library():
    return render_template('disease-library.html')

@app.route('/care-guides')
def care_guides():
    return render_template('care-guides.html')

@app.route('/privacy-policy')
def privacy_policy():
    return render_template('privacy-policy.html')

@app.route('/terms-of-service')
def terms_of_service():
    return render_template('terms-of-service.html')

@app.route('/cookie-policy')
def cookie_policy():
    return render_template('cookie-policy.html')


# API Route for plant analysis
@app.route('/api/analyze-plant', methods=['POST'])
def analyze_plant():
    try:
        # Debug: Check if API key is available
        if not GEMINI_API_KEY:
            print("ERROR: GEMINI_API_KEY is not set")
            return jsonify({'error': 'API key not configured on server'}), 500
        
        data = request.get_json()
        image_data = data.get('imageData')
        mime_type = data.get('mimeType')
        language = data.get('language', 'en')

        if not image_data or not mime_type:
            return jsonify({'error': 'Image data and mimeType are required'}), 400

        # Language-specific prompts
        language_prompts = {
            'en': "You are an expert botanist and plant pathologist. Analyze the provided plant leaf image thoroughly and provide comprehensive information in English.",
            'hi': "आप एक विशेषज्ञ वनस्पतिशास्त्री और पादप रोगविज्ञानी हैं। प्रदान की गई पौधे की पत्ती की छवि का पूरी तरह से विश्लेषण करें और हिंदी में व्यापक जानकारी प्रदान करें।",
            'ur': "آپ ایک ماہر نباتاتی ماہر اور پلانٹ پیتھالوجسٹ ہیں۔ فراہم کردہ پلانٹ لیف امیج کا مکمل تجزیہ کریں اور اردو میں جامع معلومات فراہم کریں۔",
            'mr': "तुम्ही एक तज्ञ वनस्पतिशास्त्रज्ञ आणि वनस्पती रोगतज्ज्ञ आहात. प्रदान केलेल्या वनस्पतीच्या पानाच्या प्रतिमेचे सखोल विश्लेषण करा आणि मराठीत सविस्तर माहिती प्रदान करा.",
            'ta': "நீங்கள் ஒரு நிபுணர் தாவரவியலாளர் மற்றும் தாவர நோயியலாளர். வழங்கப்பட்ட தாவர இலை படத்தை முழுமையாக பகுப்பாய்வு செய்து தமிழில் விரிவான தகவல்களை வழங்கவும்.",
            'te': "మీరు ఒక నిపుణుడైన వృక్షశాస్త్రవేత్త మరియు ప్లాంట్ పాథాలజిస్ట్. అందించిన ప్లాంట్ లీఫ్ ఇమేజ్‌ను సమగ్రంగా విశ్లేషించండి మరియు తెలుగులో సమగ్ర సమాచారాన్ని అందించండి.",
            'bn': "আপনি একজন বিশেষজ্ঞ উদ্ভিদবিজ্ঞানী এবং উদ্ভিদ রোগবিজ্ঞানী। প্রদত্ত গাছের পাতার ছবিটি পুঙ্খানুপুঙ্খভাবে বিশ্লেষণ করুন এবং বাংলায় বিস্তারিত তথ্য প্রদান করুন।",
            'gu': "તમે નિષ્ણાત વનસ્પતિશાસ્ત્રી અને વનસ્પતિ રોગવિજ્ઞાની છો. પૂરી પાડેલ વનસ્પતિના પાનની છબીનું સંપૂર્ણ વિશ્લેષણ કરો અને ગુજરાતીમાં વ્યાપક માહિતી પૂરી પાડો."
        }

        prompt = f"""{language_prompts.get(language, language_prompts['en'])}

CRITICAL: Respond ONLY with a VALID JSON object in this EXACT format:

{{
    "plant_name": "Scientific Name (Common Name)",
    "scientific_name": "Full scientific name with genus and species",
    "family": "Plant family name",
    "origin": "Native region/country",
    "plant_type": "e.g., Herb, Shrub, Tree, Succulent, etc.",
    "benefits": "Detailed paragraph about medicinal, culinary, air-purifying, and other benefits (150-200 words)",
    "growing_conditions": {{
        "sunlight": "Required sunlight conditions",
        "water": "Watering requirements and schedule",
        "soil": "Preferred soil type and pH",
        "temperature": "Ideal temperature range",
        "humidity": "Humidity requirements"
    }},
    "care_tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"],
    "disease": "Specific disease name or 'Healthy'",
    "disease_symptoms": "Detailed symptoms description if diseased",
    "disease_causes": "What causes this disease",
    "remedy": "Comprehensive treatment plan with steps",
    "prevention": "How to prevent this disease in future",
    "toxicity": "Information about toxicity to humans/pets",
    "propagation": "How to propagate this plant",
    "blooming_season": "When it flowers (if applicable)",
    "special_features": "Unique characteristics of this plant"
}}

IMPORTANT GUIDELINES:
1. If plant cannot be identified, use: {{"error": "Could not identify the plant. Please ensure the leaf is clear and well-lit."}}
2. For benefits: Include medicinal uses, health benefits, environmental benefits, culinary uses if any
3. For diseases: Be specific - name the exact disease, its symptoms, causes
4. For remedies: Provide step-by-step treatment plan with both organic and chemical options
5. Make all information detailed and practical for gardeners
6. If plant is healthy, still provide comprehensive care information
7. Use bullet points in arrays for better readability
8. Include traditional/ayurvedic uses if applicable

Now analyze the plant leaf image and provide comprehensive information."""

        payload = {
            "contents": [{
                "parts": [
                    {"text": prompt},
                    {"inlineData": {"mimeType": mime_type, "data": image_data}}
                ]
            }],
            "generationConfig": {
                "responseMimeType": "application/json",
                "temperature": 0.2,
                "topK": 40,
                "topP": 0.8
            }
        }

        print(f"Making API call to Gemini with image data length: {len(image_data)}")  # Debug

        # Gemini API call
        api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key={GEMINI_API_KEY}"
        
        response = requests.post(api_url, json=payload, timeout=30)
        response.raise_for_status()
        
        data = response.json()
        candidate = data.get('candidates', [{}])[0]
        json_text = candidate.get('content', {}).get('parts', [{}])[0].get('text')

        if not json_text:
            return jsonify({'error': 'No response received from AI'}), 500

        import json
        parsed_data = json.loads(json_text)
        return jsonify(parsed_data)

    except requests.exceptions.RequestException as e:
        print(f"API request error: {str(e)}")  # Debug
        return jsonify({'error': f'API request failed: {str(e)}'}), 500
    except Exception as e:
        print(f"Server error: {str(e)}")  # Debug
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    api_status = 'configured' if GEMINI_API_KEY else 'not configured'
    return jsonify({
        'status': 'healthy', 
        'message': 'PlantDetect API is running',
        'api_key': api_status
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Debug=True for development