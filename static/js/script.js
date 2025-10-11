// DOM Elements - WITH NULL CHECKS
let fileInput, uploadArea, previewImg, imagePreview, removeImageBtn, analyzeBtn;
let loading, loadingDetails, result, plantNameWrapper, plantName, benefitsWrapper;
let plantBenefits, diseaseWrapper, diseaseName, remedyWrapper, remedyText, errorText;
let retryBtn, uploadProgress, progressBar, progressText;
let realProgressBar, progressPercentage, progressStatus;

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

// Camera variables
let cameraStream = null;
let isCameraActive = false;

// Language Configuration
let currentLanguage = 'en';
const languageConfig = {
    en: {
        analyzeBtn: "Analyze Image",
        loadingText: "AI is analyzing your plant...",
        progressSteps: {
            0: "Initializing AI analysis...",
            10: "Uploading image to server...",
            20: "Analyzing image quality...",
            30: "Detecting leaf patterns...",
            40: "Identifying plant species...",
            50: "Cross-referencing with database...",
            60: "Checking for disease symptoms...",
            70: "Analyzing disease patterns...",
            80: "Generating treatment recommendations...",
            90: "Finalizing report...",
            100: "Analysis complete!"
        },
        resultTitle: "Analysis Result",
        plantName: "Plant Name",
        benefits: "Benefits",
        disease: "Disease",
        remedy: "Remedy",
        exportText: "Export Results",
        retryText: "Try Another Image"
    },
    hi: {
        analyzeBtn: "छवि का विश्लेषण करें",
        loadingText: "AI आपके पौधे का विश्लेषण कर रहा है...",
        progressSteps: {
            0: "AI विश्लेषण शुरू कर रहा है...",
            10: "सर्वर पर छवि अपलोड हो रही है...",
            20: "छवि गुणवत्ता का विश्लेषण...",
            30: "पत्ती पैटर्न की पहचान...",
            40: "पौधे की प्रजाति की पहचान...",
            50: "डेटाबेस के साथ तुलना...",
            60: "रोग के लक्षणों की जाँच...",
            70: "रोग पैटर्न का विश्लेषण...",
            80: "उपचार सिफारिशें तैयार करना...",
            90: "रिपोर्ट अंतिम रूप दी जा रही है...",
            100: "विश्लेषण पूरा हुआ!"
        },
        resultTitle: "विश्लेषण परिणाम",
        plantName: "पौधे का नाम",
        benefits: "फायदे",
        disease: "बीमारी",
        remedy: "इलाज",
        exportText: "परिणाम निर्यात करें",
        retryText: "दूसरी छवि आज़माएं"
    },
    ur: {
        analyzeBtn: "تصویر کا تجزیہ کریں",
        loadingText: "AI آپ کے پلانٹ کا تجزیہ کر رہا ہے...",
        progressSteps: {
            0: "AI تجزیہ شروع کر رہا ہے...",
            10: "سرور پر تصویر اپ لوڈ ہو رہی ہے...",
            20: "تصویر کے معیار کا تجزیہ...",
            30: "پتے کے پیٹرن کی شناخت...",
            40: "پلانٹ کی قسم کی شناخت...",
            50: "ڈیٹا بیس کے ساتھ موازنہ...",
            60: "بیماری کی علامات کی جانچ...",
            70: "بیماری کے پیٹرن کا تجزیہ...",
            80: "علاج کی سفارشات تیار کرنا...",
            90: "رپورٹ حتمی شکل دی جا رہی ہے...",
            100: "تجزیہ مکمل ہوگیا!"
        },
        resultTitle: "تجزیہ کا نتیجہ",
        plantName: "پلانٹ کا نام",
        benefits: "فوائد",
        disease: "بیماری",
        remedy: "علاج",
        exportText: "نتائج برآمد کریں",
        retryText: "دوسری تصویر آزمائیں"
    },
    mr: {
        analyzeBtn: "प्रतिमेचे विश्लेषण करा",
        loadingText: "AI तुमच्या वनस्पतीचे विश्लेषण करत आहे...",
        progressSteps: {
            0: "AI विश्लेषण सुरू करत आहे...",
            10: "सर्व्हरवर प्रतिमा अपलोड होत आहे...",
            20: "प्रतिमा गुणवत्तेचे विश्लेषण...",
            30: "पानांच्या नमुन्यांची ओळख...",
            40: "वनस्पतीच्या प्रजातीची ओळख...",
            50: "डेटाबेसशी तुलना...",
            60: "रोगाच्या लक्षणांची तपासणी...",
            70: "रोग नमुन्यांचे विश्लेषण...",
            80: "उपचार शिफारसी तयार करणे...",
            90: "अहवाल अंतिम रूप दिला जात आहे...",
            100: "विश्लेषण पूर्ण झाले!"
        },
        resultTitle: "विश्लेषण परिणाम",
        plantName: "वनस्पतीचे नाव",
        benefits: "फायदे",
        disease: "रोग",
        remedy: "उपचार",
        exportText: "निकाल निर्यात करा",
        retryText: "दुसरी प्रतिमा वापरा"
    },
    ta: {
        analyzeBtn: "படத்தை பகுப்பாய்வு செய்க",
        loadingText: "AI உங்கள் தாவரத்தை பகுப்பாய்வு செய்கிறது...",
        progressSteps: {
            0: "AI பகுப்பாய்வு தொடங்குகிறது...",
            10: "சர்வரில் படம் பதிவேற்றப்படுகிறது...",
            20: "பட தரம் பகுப்பாய்வு...",
            30: "இலை வடிவங்களை கண்டறிதல்...",
            40: "தாவர இனங்களை அடையாளம் காணுதல்...",
            50: "தரவுத்தளத்துடன் ஒப்பீடு...",
            60: "நோய் அறிகுறிகள் சோதனை...",
            70: "நோய் வடிவங்கள் பகுப்பாய்வு...",
            80: "சிகிச்சை பரிந்துரைகள் உருவாக்குதல்...",
            90: "அறிக்கை இறுதி செய்யப்படுகிறது...",
            100: "பகுப்பாய்வு முடிந்தது!"
        },
        resultTitle: "பகுப்பாய்வு முடிவு",
        plantName: "தாவரத்தின் பெயர்",
        benefits: "பயன்கள்",
        disease: "நோய்",
        remedy: "சிகிச்சை",
        exportText: "முடிவுகளை ஏற்றுமதி செய்க",
        retryText: "மற்றொரு படத்தை முயற்சிக்கவும்"
    },
    te: {
        analyzeBtn: "చిత్రాన్ని విశ్లేషించండి",
        loadingText: "AI మీ మొక్కను విశ్లేషిస్తోంది...",
        progressSteps: {
            0: "AI విశ్లేషణ ప్రారంభిస్తోంది...",
            10: "సర్వర్‌కు చిత్రం అప్‌లోడ్ అవుతోంది...",
            20: "చిత్ర నాణ్యత విశ్లేషణ...",
            30: "ఆకు నమూనాలను గుర్తించడం...",
            40: "మొక్క జాతిని గుర్తించడం...",
            50: "డేటాబేస్‌తో పోలిక...",
            60: "రోగ లక్షణాలను తనిఖీ చేయడం...",
            70: "రోగ నమూనాల విశ్లేషణ...",
            80: "చికిత్స సిఫార్సులను రూపొందించడం...",
            90: "రిపోర్ట్ ఫైనలైజ్ చేయబడుతోంది...",
            100: "విశ్లేషణ పూర్తయింది!"
        },
        resultTitle: "విశ్లేషణ ఫలితం",
        plantName: "మొక్క పేరు",
        benefits: "ప్రయోజనాలు",
        disease: "రోగం",
        remedy: "చికిత్స",
        exportText: "ఫలితాలను ఎగుమతి చేయండి",
        retryText: "మరొక చిత్రాన్ని ప్రయత్నించండి"
    },
    bn: {
        analyzeBtn: "ছবি বিশ্লেষণ করুন",
        loadingText: "AI আপনার গাছপালা বিশ্লেষণ করছে...",
        progressSteps: {
            0: "AI বিশ্লেষণ শুরু করছে...",
            10: "সার্ভারে ছবি আপলোড হচ্ছে...",
            20: "ছবির গুণমান বিশ্লেষণ...",
            30: "পাতার প্যাটার্ন সনাক্তকরণ...",
            40: "গাছের প্রজাতি সনাক্তকরণ...",
            50: "ডাটাবেসের সাথে তুলনা...",
            60: "রোগের লক্ষণ পরীক্ষা...",
            70: "রোগের প্যাটার্ন বিশ্লেষণ...",
            80: "চিকিত্সার সুপারিশ তৈরি করা...",
            90: "রিপোর্ট চূড়ান্ত করা হচ্ছে...",
            100: "বিশ্লেষণ সম্পন্ন!"
        },
        resultTitle: "বিশ্লেষণ ফলাফল",
        plantName: "গাছের নাম",
        benefits: "সুবিধা",
        disease: "রোগ",
        remedy: "চিকিত্সা",
        exportText: "ফলাফল রপ্তানি করুন",
        retryText: "অন্য ছবি চেষ্টা করুন"
    },
    gu: {
        analyzeBtn: "છબીનું વિશ્લેષણ કરો",
        loadingText: "AI તમારા છોડનું વિશ્લેષણ કરી રહ્યું છે...",
        progressSteps: {
            0: "AI વિશ્લેષણ શરૂ કરી રહ્યું છે...",
            10: "સર્વર પર છબી અપલોડ થઈ રહી છે...",
            20: "છબી ગુણવત્તા વિશ્લેષણ...",
            30: "પાંદડા પેટર્ન ઓળખવા...",
            40: "છોડની પ્રજાતિ ઓળખવી...",
            50: "ડેટાબેઝ સાથે સરખામણી...",
            60: "રોગના લક્ષણો તપાસવા...",
            70: "રોગ પેટર્ન વિશ્લેષણ...",
            80: "ઉપચાર સૂચનો બનાવવા...",
            90: "રિપોર્ટ અંતિમ રૂપ આપવામાં આવી રહી છે...",
            100: "વિશ્લેષણ પૂર્ણ!"
        },
        resultTitle: "વિશ્લેષણ પરિણામ",
        plantName: "છોડનું નામ",
        benefits: "ફાયદા",
        disease: "રોગ",
        remedy: "ઉપચાર",
        exportText: "પરિણામો નિકાસ કરો",
        retryText: "બીજી છબી પ્રયાસ કરો"
    }
};

// Initialize the application
function init() {
    initElements();
    setupEventListeners();
    updateLoadingMessage();
    initStickyHeader();
    initCameraFeatures();
    initExportButtons();
    initLanguageFeatures();
}

// Initialize DOM elements with null checks
function initElements() {
    fileInput = document.getElementById('fileInput');
    uploadArea = document.getElementById('uploadArea');
    previewImg = document.getElementById('previewImg');
    imagePreview = document.getElementById('imagePreview');
    removeImageBtn = document.getElementById('removeImage');
    analyzeBtn = document.getElementById('analyzeBtn');
    loading = document.getElementById('loading');
    loadingDetails = document.getElementById('loadingDetails');
    result = document.getElementById('result');
    plantNameWrapper = document.getElementById('plantNameWrapper');
    plantName = document.getElementById('plantName');
    benefitsWrapper = document.getElementById('benefitsWrapper');
    plantBenefits = document.getElementById('plantBenefits');
    diseaseWrapper = document.getElementById('diseaseWrapper');
    diseaseName = document.getElementById('diseaseName');
    remedyWrapper = document.getElementById('remedyWrapper');
    remedyText = document.getElementById('remedyText');
    errorText = document.getElementById('errorText');
    retryBtn = document.getElementById('retryBtn');
    uploadProgress = document.getElementById('uploadProgress');
    progressBar = document.getElementById('progressBar');
    progressText = document.getElementById('progressText');
     // Progress bar elements
    realProgressBar = document.getElementById('realProgressBar');
    progressPercentage = document.getElementById('progressPercentage');
    progressStatus = document.getElementById('progressStatus');
}

// Set up all event listeners - WITH NULL CHECKS
function setupEventListeners() {
    // Only add event listeners if elements exist (on home page)
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeImage);
    }
    
    if (retryBtn) {
        retryBtn.addEventListener('click', resetApp);
    }
    
    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', removeImage);
    }
    
    // Drag and drop events - only if upload area exists
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);
        uploadArea.addEventListener('keydown', handleKeyboardUpload);
    }
}

// Handle file selection
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processImageFile(file);
    }
}

// Process and validate image file
function processImageFile(file) {
    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        showError('Please upload only JPEG, PNG, or WebP images.');
        return;
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        showError('File size should be less than 5MB.');
        return;
    }
    
    // Show upload progress
    showUploadProgress();
    
    // Simulate upload progress
    simulateProgress(() => {
        displayImagePreview(file);
    });
}

// Display image preview
function displayImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        if (previewImg) previewImg.src = e.target.result;
        if (previewImg) {
            previewImg.dataset.mimeType = file.type;
            previewImg.dataset.fileName = file.name;
        }
        
        if (imagePreview) imagePreview.classList.remove('hidden');
        if (uploadProgress) uploadProgress.classList.add('hidden');
        if (analyzeBtn) analyzeBtn.disabled = false;
        if (result) result.classList.add('hidden');
        if (errorText) errorText.textContent = '';
        
        // Add success state to upload area
        if (uploadArea) uploadArea.classList.add('success-state');
    };
    reader.readAsDataURL(file);
}

// Remove uploaded image
function removeImage() {
    if (fileInput) fileInput.value = '';
    if (previewImg) previewImg.src = '';
    if (imagePreview) imagePreview.classList.add('hidden');
    if (analyzeBtn) analyzeBtn.disabled = true;
    if (uploadArea) uploadArea.classList.remove('success-state');
    if (result) result.classList.add('hidden');
}

// Drag and drop handlers
function handleDragOver(e) {
    e.preventDefault();
    if (uploadArea) uploadArea.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    if (uploadArea && !uploadArea.contains(e.relatedTarget)) {
        uploadArea.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    if (uploadArea) uploadArea.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && fileInput) {
        fileInput.files = files;
        processImageFile(files[0]);
    }
}

// Keyboard accessibility for upload
function handleKeyboardUpload(e) {
    if ((e.key === 'Enter' || e.key === ' ') && fileInput) {
        e.preventDefault();
        fileInput.click();
    }
}

// Show upload progress
function showUploadProgress() {
    if (uploadProgress) {
        uploadProgress.classList.remove('hidden');
        if (progressBar) progressBar.style.width = '0%';
        if (progressText) progressText.textContent = 'Processing image...';
    }
}

// Simulate upload progress
function simulateProgress(callback) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            if (progressBar) progressBar.style.width = '100%';
            if (progressText) progressText.textContent = 'Upload complete!';
            setTimeout(callback, 300);
        } else {
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `Processing... ${Math.round(progress)}%`;
        }
    }, 200);
}

// Update loading messages randomly
function updateLoadingMessage() {
    const messages = [
        "Analyzing leaf patterns...",
        "Identifying plant species...",
        "Checking for diseases...",
        "Processing image data...",
        "Comparing with plant database...",
        "Generating detailed report...",
        "Finalizing recommendations..."
    ];
    
    if (loadingDetails) {
        setInterval(() => {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            loadingDetails.textContent = randomMessage;
        }, 4000);
    }
}


// Main analysis function
// Main analysis function में error handling improve करें
async function analyzeImage() {
    if (!previewImg || !previewImg.src) {
        showError("Please upload an image first.");
        return;
    }

    // Show loading with progress bar
    showLoadingStateWithProgress();
    hideResults();

    try {
        // Start real-time progress simulation with language support
        const progressPromise = simulateRealTimeProgress();
        
        // Start API call with language support
        const apiPromise = callGeminiAPIWithLanguage();
        
        // Wait for both to complete
        const [analysisResult] = await Promise.all([apiPromise, progressPromise]);
        
        displayResults(analysisResult);
        
    } catch (error) {
        console.error("Analysis error:", error);
        
        // Progress bar ko 100% tak le jao even if error
        if (realProgressBar) realProgressBar.style.width = '100%';
        if (progressPercentage) progressPercentage.textContent = '100%';
        if (progressStatus) progressStatus.textContent = 'Analysis failed';
        
        setTimeout(() => {
            handleAnalysisError(error);
        }, 1000);
        
    } finally {
        hideLoadingState();
        showRetryButton();
    }
}


// Show loading state
function showLoadingState() {
    if (loading) loading.classList.remove('hidden');
    if (analyzeBtn) analyzeBtn.disabled = true;
    if (result) result.classList.add('hidden');
    if (uploadArea) uploadArea.classList.remove('success-state');
}

// Hide loading state
function hideLoadingState() {
    if (loading) loading.classList.add('hidden');
    if (analyzeBtn) analyzeBtn.disabled = false;
}

// Hide all result sections
function hideResults() {
    if (plantNameWrapper) plantNameWrapper.classList.add('hidden');
    if (benefitsWrapper) benefitsWrapper.classList.add('hidden');
    if (diseaseWrapper) diseaseWrapper.classList.add('hidden');
    if (remedyWrapper) remedyWrapper.classList.add('hidden');
    if (errorText) errorText.textContent = '';
}

// Call Gemini API
 // Modified callGeminiAPIWithLanguage function
// Modified callGeminiAPIWithLanguage function
async function callGeminiAPIWithLanguage() {
    const base64ImageData = previewImg.src.split(',')[1];
    const mimeType = previewImg.dataset.mimeType || 'image/jpeg';

    const payload = {
        imageData: base64ImageData,
        mimeType: mimeType,
        language: currentLanguage
    };

    try {
        const response = await fetch('/api/analyze-plant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
}


// Display analysis results - Store data for PDF
function displayResults(parsedData) {
    if (result) result.classList.remove('hidden');
    
    // Store complete data for PDF export
    window.lastAnalysisData = parsedData;
    
    if (parsedData.error) {
        if (errorText) errorText.textContent = parsedData.error;
        return;
    }

    // Populate basic data
    if (plantName) plantName.textContent = parsedData.plant_name || 'Naam nahi mila';
    if (plantBenefits) plantBenefits.textContent = parsedData.benefits || 'Fayde ki jaankari uplabdh nahi hai.';
    if (diseaseName) diseaseName.textContent = parsedData.disease || 'Jaankari uplabdh nahi';
    if (remedyText) remedyText.textContent = parsedData.remedy || 'Jaankari uplabdh nahi';

    // Show additional information sections
    showAdditionalInfo(parsedData);

    // Show relevant sections
    if (plantNameWrapper) plantNameWrapper.classList.remove('hidden');
    if (benefitsWrapper) benefitsWrapper.classList.remove('hidden');
    if (diseaseWrapper) diseaseWrapper.classList.remove('hidden');
    if (remedyWrapper) remedyWrapper.classList.remove('hidden');

    // Show export buttons
    const exportButtons = document.getElementById('exportButtons');
    if (exportButtons) {
        exportButtons.classList.remove('hidden');
    }

    // Add celebration for healthy plants
    if (diseaseName && parsedData.disease?.toLowerCase() === 'healthy') {
        diseaseName.classList.remove('text-red-600');
        diseaseName.classList.add('text-green-600');
    }
}

// Show additional plant information
function showAdditionalInfo(parsedData) {
    const additionalInfoHTML = `
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            ${parsedData.scientific_name ? `
            <div class="bg-blue-50 p-3 rounded-lg">
                <h4 class="font-semibold text-blue-800 text-sm">Scientific Name</h4>
                <p class="text-blue-700 text-sm">${parsedData.scientific_name}</p>
            </div>
            ` : ''}
            
            ${parsedData.family ? `
            <div class="bg-green-50 p-3 rounded-lg">
                <h4 class="font-semibold text-green-800 text-sm">Plant Family</h4>
                <p class="text-green-700 text-sm">${parsedData.family}</p>
            </div>
            ` : ''}
            
            ${parsedData.origin ? `
            <div class="bg-purple-50 p-3 rounded-lg">
                <h4 class="font-semibold text-purple-800 text-sm">Native Region</h4>
                <p class="text-purple-700 text-sm">${parsedData.origin}</p>
            </div>
            ` : ''}
            
            ${parsedData.plant_type ? `
            <div class="bg-orange-50 p-3 rounded-lg">
                <h4 class="font-semibold text-orange-800 text-sm">Plant Type</h4>
                <p class="text-orange-700 text-sm">${parsedData.plant_type}</p>
            </div>
            ` : ''}
        </div>
        
        ${parsedData.growing_conditions ? `
        <div class="mt-4">
            <h4 class="font-semibold text-gray-700 mb-2">🌱 Growing Conditions</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                ${parsedData.growing_conditions.sunlight ? `
                <div class="flex items-center">
                    <span class="text-yellow-600 mr-2">☀️</span>
                    <span><strong>Sunlight:</strong> ${parsedData.growing_conditions.sunlight}</span>
                </div>
                ` : ''}
                
                ${parsedData.growing_conditions.water ? `
                <div class="flex items-center">
                    <span class="text-blue-600 mr-2">💧</span>
                    <span><strong>Water:</strong> ${parsedData.growing_conditions.water}</span>
                </div>
                ` : ''}
                
                ${parsedData.growing_conditions.soil ? `
                <div class="flex items-center">
                    <span class="text-brown-600 mr-2">🟫</span>
                    <span><strong>Soil:</strong> ${parsedData.growing_conditions.soil}</span>
                </div>
                ` : ''}
                
                ${parsedData.growing_conditions.temperature ? `
                <div class="flex items-center">
                    <span class="text-red-600 mr-2">🌡️</span>
                    <span><strong>Temperature:</strong> ${parsedData.growing_conditions.temperature}</span>
                </div>
                ` : ''}
            </div>
        </div>
        ` : ''}
        
        ${parsedData.care_tips && parsedData.care_tips.length > 0 ? `
        <div class="mt-4">
            <h4 class="font-semibold text-gray-700 mb-2">💡 Care Tips</h4>
            <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                ${parsedData.care_tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
        
        ${parsedData.disease_symptoms && parsedData.disease !== 'Healthy' ? `
        <div class="mt-4">
            <h4 class="font-semibold text-red-700 mb-2">⚠️ Disease Symptoms</h4>
            <p class="text-sm text-gray-700">${parsedData.disease_symptoms}</p>
        </div>
        ` : ''}
        
        ${parsedData.prevention ? `
        <div class="mt-4">
            <h4 class="font-semibold text-green-700 mb-2">🛡️ Prevention</h4>
            <p class="text-sm text-gray-700">${parsedData.prevention}</p>
        </div>
        ` : ''}
    `;

    // Add to result card
    const additionalInfoContainer = document.createElement('div');
    additionalInfoContainer.innerHTML = additionalInfoHTML;
    result.querySelector('.result-card').appendChild(additionalInfoContainer);
}

// Handle analysis errors
function handleAnalysisError(error) {
    let errorMessage = 'Analysis ke dauraan ek error aayi. Kripya dobara try karein.';
    
    if (error.message.includes('API key')) {
        errorMessage = 'API key not configured. Please check the settings.';
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection.';
    } else if (error.message.includes('quota')) {
        errorMessage = 'API quota exceeded. Please try again later.';
    }
    
    // Progress bar ko red karo error ke case mein
    if (realProgressBar) {
        realProgressBar.classList.remove('bg-green-600');
        realProgressBar.classList.add('bg-red-600');
    }
    
    if (errorText) errorText.textContent = errorMessage;
    if (result) result.classList.remove('hidden');
}

// Show retry button
function showRetryButton() {
    if (retryBtn) retryBtn.classList.remove('hidden');
}

// Reset application
function resetApp() {
    if (fileInput) fileInput.value = '';
    if (previewImg) previewImg.src = '';
    if (imagePreview) imagePreview.classList.add('hidden');
    if (result) result.classList.add('hidden');
    if (retryBtn) retryBtn.classList.add('hidden');
    if (uploadArea) uploadArea.classList.remove('success-state');
    if (analyzeBtn) analyzeBtn.disabled = true;
    if (errorText) errorText.textContent = '';
}

// Show error message
function showError(message) {
    if (errorText) errorText.textContent = message;
    if (result) result.classList.remove('hidden');
    if (uploadArea) uploadArea.classList.add('error-state');
    
    // Remove error state after 3 seconds
    setTimeout(() => {
        if (uploadArea) uploadArea.classList.remove('error-state');
    }, 3000);
}

// ==================== CAMERA FEATURES ====================

// Initialize camera features
function initCameraFeatures() {
    const startCameraBtn = document.getElementById('startCamera');
    const capturePhotoBtn = document.getElementById('capturePhoto');
    const stopCameraBtn = document.getElementById('stopCamera');

    // Start camera
    if (startCameraBtn) {
        startCameraBtn.addEventListener('click', startCamera);
    }

    // Capture photo
    if (capturePhotoBtn) {
        capturePhotoBtn.addEventListener('click', capturePhoto);
    }

    // Stop camera
    if (stopCameraBtn) {
        stopCameraBtn.addEventListener('click', stopCamera);
    }
}

// Start camera function
async function startCamera() {
    const video = document.getElementById('cameraVideo');
    const startBtn = document.getElementById('startCamera');
    const captureBtn = document.getElementById('capturePhoto');
    const stopBtn = document.getElementById('stopCamera');
    const cameraPlaceholder = document.getElementById('cameraPlaceholder');
    const cameraSection = document.querySelector('.camera-section');

    try {
        // Request camera access
        cameraStream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        });

        // Show video stream
        video.srcObject = cameraStream;
        video.classList.remove('hidden');
        
        // Hide placeholder
        if (cameraPlaceholder) {
            cameraPlaceholder.classList.add('hidden');
        }
        
        // Update button states
        startBtn.classList.add('hidden');
        captureBtn.classList.remove('hidden');
        stopBtn.classList.remove('hidden');
        
        isCameraActive = true;
        cameraSection.classList.add('camera-active');

    } catch (error) {
        console.error('Camera error:', error);
        cameraSection.classList.add('camera-error');
        if (cameraPlaceholder) {
            cameraPlaceholder.innerHTML = '<p class="text-red-600 text-sm">Camera access denied</p>';
        }
        showError('Camera access denied. Please check permissions.');
    }
}

// Capture photo function
function capturePhoto() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');
    const fileInput = document.getElementById('fileInput');
    
    if (!video || !canvas) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to blob and create file
    canvas.toBlob(function(blob) {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        
        // Create a DataTransfer object to set files
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
        
        // Trigger file processing
        processImageFile(file);
        
        // Stop camera after capture
        stopCamera();
        
    }, 'image/jpeg', 0.8);
}

// Stop camera function
function stopCamera() {
    const video = document.getElementById('cameraVideo');
    const startBtn = document.getElementById('startCamera');
    const captureBtn = document.getElementById('capturePhoto');
    const stopBtn = document.getElementById('stopCamera');
    const cameraPlaceholder = document.getElementById('cameraPlaceholder');
    const cameraSection = document.querySelector('.camera-section');
    
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    
    if (video) {
        video.srcObject = null;
        video.classList.add('hidden');
    }
    
    // Show placeholder again
    if (cameraPlaceholder) {
        cameraPlaceholder.classList.remove('hidden');
        cameraPlaceholder.innerHTML = '<p class="text-sm">Camera preview will appear here</p>';
    }
    
    // Reset button states
    startBtn.classList.remove('hidden');
        captureBtn.classList.add('hidden');
        stopBtn.classList.add('hidden');
    
    // Reset camera section styles
    cameraSection.classList.remove('camera-active', 'camera-error');
    
    isCameraActive = false;
}

// ==================== EXPORT FEATURES ====================

// Initialize export buttons
function initExportButtons() {
    const exportPDFBtn = document.getElementById('exportPDF');
    const exportWordBtn = document.getElementById('exportWord');
    const exportTextBtn = document.getElementById('exportText');

    if (exportPDFBtn) {
        exportPDFBtn.addEventListener('click', exportToPDF);
    }
    
    if (exportWordBtn) {
        exportWordBtn.addEventListener('click', exportToWord);
    }
    
    if (exportTextBtn) {
        exportTextBtn.addEventListener('click', exportToText);
    }
}

// ==================== ENHANCED PDF EXPORT ====================
// Global function for PDF export
window.exportToPDF = async function() {
    const exportBtn = document.getElementById('exportPDF');
    const plantName = document.getElementById('plantName')?.textContent || 'Unknown Plant';
    
    // Loading state
    if (exportBtn) {
        exportBtn.classList.add('export-loading');
        exportBtn.disabled = true;
        exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + getTranslation('Generating PDF...', currentLanguage);
    }

    try {
        const fullData = window.lastAnalysisData || {};
        
        if (!fullData || Object.keys(fullData).length === 0) {
            throw new Error(getTranslation('No analysis data found. Please analyze an image first.', currentLanguage));
        }

        console.log('Starting PDF generation for:', plantName, 'in language:', currentLanguage);
        
        await generateProfessionalPDF(fullData, plantName);
        
        showExportSuccess(getExportSuccessMessage(currentLanguage));
        
    } catch (error) {
        console.error('PDF export failed:', error);
        
        let errorMessage = getExportErrorMessage(currentLanguage);
        if (error.message.includes('No analysis data')) {
            errorMessage = getTranslation('Please analyze a plant image first before exporting.', currentLanguage);
        } else if (error.message.includes('jsPDF')) {
            errorMessage = getTranslation('PDF library error. Please refresh and try again.', currentLanguage);
        }
        
        showError(errorMessage);
        
    } finally {
        // Reset button state
        setTimeout(() => {
            if (exportBtn) {
                exportBtn.classList.remove('export-loading');
                exportBtn.disabled = false;
                exportBtn.innerHTML = '<i class="fas fa-file-pdf"></i> ' + getTranslation('Download PDF Report', currentLanguage);
            }
        }, 1500);
    }
}

 // Complete PDF generation with all required functions
async function generateProfessionalPDF(fullData, plantName) {
    return new Promise((resolve, reject) => {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Use basic fonts for better multi-language support
            doc.setFont('helvetica');
            doc.setFontSize(10);

            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const margin = 15;
            const contentWidth = pageWidth - (2 * margin);
            let yPosition = 15;
            const lineHeight = 5;
            const sectionSpacing = 12;

            // ========== SIMPLE COVER PAGE ==========
            createSimpleCover(doc, pageWidth, pageHeight, plantName, fullData);
            doc.addPage();

            // ========== PLANT IDENTIFICATION ==========
            yPosition = addSimpleSectionHeader(doc, getPDFSectionTitle('PLANT IDENTIFICATION'), margin, yPosition, pageWidth);
            yPosition += 8;

            const plantInfo = [
                { label: getPDFLabel('Common Name'), value: plantName },
                { label: getPDFLabel('Scientific Name'), value: fullData.scientific_name || getTranslation('Not specified', currentLanguage) },
                { label: getPDFLabel('Plant Family'), value: fullData.family || getTranslation('Not specified', currentLanguage) },
                { label: getPDFLabel('Native Origin'), value: fullData.origin || getTranslation('Not specified', currentLanguage) },
                { label: getPDFLabel('Plant Type'), value: fullData.plant_type || getTranslation('Not specified', currentLanguage) },
                { label: getPDFLabel('Toxicity Level'), value: fullData.toxicity || getTranslation('Not specified', currentLanguage) }
            ];

            plantInfo.forEach(info => {
                yPosition = addSimpleInfoRow(doc, info.label, info.value, margin, yPosition, contentWidth, lineHeight);
                if (yPosition > pageHeight - 30) {
                    doc.addPage();
                    yPosition = 20;
                }
            });

            yPosition += sectionSpacing;

            // ========== BENEFITS & USES ==========
            if (yPosition > pageHeight - 100) {
                doc.addPage();
                yPosition = 20;
            }
            
            yPosition = addSimpleSectionHeader(doc, getPDFSectionTitle('BENEFITS & USES'), margin, yPosition, pageWidth);
            yPosition += 8;

            const benefits = fullData.benefits || getTranslation('No benefits information available.', currentLanguage);
            yPosition = addSimpleTextContent(doc, benefits, margin, yPosition, contentWidth, lineHeight, 9);
            
            yPosition += sectionSpacing;

            // Special Features
            if (fullData.special_features && fullData.special_features !== 'Not specified') {
                if (yPosition > pageHeight - 80) {
                    doc.addPage();
                    yPosition = 20;
                }
                yPosition = addSimpleFeatureBox(doc, fullData.special_features, margin, yPosition, contentWidth, lineHeight);
                yPosition += sectionSpacing;
            }

            // ========== GROWING CONDITIONS ==========
            if (yPosition > pageHeight - 150) {
                doc.addPage();
                yPosition = 20;
            }
            
            yPosition = addSimpleSectionHeader(doc, getPDFSectionTitle('GROWING CONDITIONS'), margin, yPosition, pageWidth);
            yPosition += 8;

            const growingConditions = fullData.growing_conditions || {};
            const growingInfo = [
                { label: getPDFLabel('Sunlight'), value: growingConditions.sunlight },
                { label: getPDFLabel('Water'), value: growingConditions.water },
                { label: getPDFLabel('Soil'), value: growingConditions.soil },
                { label: getPDFLabel('Temperature'), value: growingConditions.temperature },
                { label: getPDFLabel('Humidity'), value: growingConditions.humidity }
            ].filter(item => item.value);

            growingInfo.forEach(info => {
                yPosition = addSimpleInfoRow(doc, info.label, info.value, margin, yPosition, contentWidth, lineHeight);
                if (yPosition > pageHeight - 30) {
                    doc.addPage();
                    yPosition = 20;
                }
            });

            // Blooming Season
            if (fullData.blooming_season && fullData.blooming_season !== 'Not specified') {
                if (yPosition > pageHeight - 30) {
                    doc.addPage();
                    yPosition = 20;
                }
                yPosition = addSimpleInfoRow(doc, getPDFLabel('Blooming Season'), fullData.blooming_season, margin, yPosition, contentWidth, lineHeight);
            }

            yPosition += sectionSpacing;

            // ========== CARE TIPS ==========
            const careTips = fullData.care_tips || [];
            if (careTips.length > 0) {
                if (yPosition > pageHeight - 100) {
                    doc.addPage();
                    yPosition = 20;
                }

                yPosition = addSimpleSectionHeader(doc, getPDFSectionTitle('CARE TIPS'), margin, yPosition, pageWidth);
                yPosition += 8;

                careTips.forEach((tip, index) => {
                    if (yPosition > pageHeight - 30) {
                        doc.addPage();
                        yPosition = 20;
                    }
                    
                    yPosition = addSimpleNumberedItem(doc, tip, index + 1, margin, yPosition, contentWidth, lineHeight);
                    yPosition += 4;
                });
                
                yPosition += sectionSpacing;
            }

            // ========== DISEASE ANALYSIS ==========
            if (yPosition > pageHeight - 150) {
                doc.addPage();
                yPosition = 20;
            }

            yPosition = addSimpleSectionHeader(doc, getPDFSectionTitle('DISEASE ANALYSIS'), margin, yPosition, pageWidth);
            yPosition += 8;

            const diseaseName = fullData.disease || getTranslation('No disease information available.', currentLanguage);
            
            if (diseaseName.toLowerCase().includes('healthy')) {
                yPosition = addSimpleHealthStatus(doc, margin, yPosition, contentWidth, lineHeight);
            } else {
                yPosition = addSimpleDiseaseSection(doc, fullData, margin, yPosition, contentWidth, lineHeight);
            }

            yPosition += sectionSpacing;

            // ========== TREATMENT & REMEDIES ==========
            if (yPosition > pageHeight - 100) {
                doc.addPage();
                yPosition = 20;
            }

            yPosition = addSimpleSectionHeader(doc, getPDFSectionTitle('TREATMENT & REMEDIES'), margin, yPosition, pageWidth);
            yPosition += 8;
            
            const remedyText = fullData.remedy || getTranslation('No remedy information available.', currentLanguage);
            
            if (remedyText && !remedyText.includes('N/A') && remedyText !== 'No remedy information available.') {
                yPosition = addSimpleTextContent(doc, remedyText, margin, yPosition, contentWidth, lineHeight, 9);
            } else {
                yPosition = addSimpleNoTreatmentNeeded(doc, margin, yPosition, contentWidth, lineHeight);
            }

            yPosition += sectionSpacing;

            // ========== DISEASE PREVENTION ==========
            const preventionTips = fullData.prevention || getTranslation('Maintain proper plant care practices.', currentLanguage);
            if (preventionTips !== 'Maintain proper plant care practices.') {
                if (yPosition > pageHeight - 100) {
                    doc.addPage();
                    yPosition = 20;
                }

                yPosition = addSimpleSectionHeader(doc, getPDFSectionTitle('DISEASE PREVENTION'), margin, yPosition, pageWidth);
                yPosition += 8;
                yPosition = addSimpleTextContent(doc, preventionTips, margin, yPosition, contentWidth, lineHeight, 9);
            }

            // ========== SIMPLE FOOTER ==========
            addSimpleFooter(doc, pageWidth, pageHeight);

            // ========== SAVE PDF ==========
            const fileName = `PlantDetect_Report_${plantName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')}.pdf`;
            doc.save(fileName);
            
            resolve();
            
        } catch (error) {
            console.error('PDF generation error:', error);
            reject(error);
        }
    });
}


function createSimpleCover(doc, pageWidth, pageHeight, plantName, fullData) {
    // Clean white background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Header with solid color
    doc.setFillColor(22, 101, 52);
    doc.rect(0, 0, pageWidth, 80, 'F');
    
    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('PLANTDETECT REPORT', pageWidth / 2, 30, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('AI-Powered Plant Health Analysis', pageWidth / 2, 45, { align: 'center' });

    // Plant name
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    
    // Simple text splitting for plant name
    const plantNameLines = simpleTextSplit(plantName, 40);
    let nameY = 100;
    plantNameLines.forEach(line => {
        doc.text(line, pageWidth / 2, nameY, { align: 'center' });
        nameY += 10;
    });

    // Scientific name if available
    if (fullData.scientific_name) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        const sciLines = simpleTextSplit(fullData.scientific_name, 50);
        sciLines.forEach(line => {
            doc.text(line, pageWidth / 2, nameY, { align: 'center' });
            nameY += 8;
        });
    }

    // Report date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, nameY + 20, { align: 'center' });
}

function addSimpleSectionHeader(doc, title, margin, yPosition, pageWidth) {
    // Simple underline style
    doc.setTextColor(22, 101, 52);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(title, margin, yPosition);
    
    // Underline
    doc.setDrawColor(22, 101, 52);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition + 1, margin + 50, yPosition + 1);
    
    return yPosition + 8;
}

function addSimpleInfoRow(doc, label, value, margin, yPosition, contentWidth, lineHeight) {
    // Label
    doc.setTextColor(22, 101, 52);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`${label}:`, margin, yPosition);
    
    // Value
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    const valueLines = simpleTextSplit(value || '', 70);
    valueLines.forEach((line, index) => {
        doc.text(line, margin + 40, yPosition + (index * lineHeight));
    });
    
    return yPosition + (valueLines.length * lineHeight) + 6;
}

function addSimpleTextContent(doc, text, margin, yPosition, contentWidth, lineHeight, fontSize = 9) {
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    
    const lines = simpleTextSplit(text, 80);
    lines.forEach(line => {
        if (yPosition > doc.internal.pageSize.height - 20) {
            doc.addPage();
            yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
    });
    
    return yPosition;
}
function addSimpleFeatureBox(doc, feature, margin, yPosition, contentWidth, lineHeight) {
    // Calculate height needed
    const featureLines = simpleTextSplit(feature, 70);
    const boxHeight = Math.max(40, 25 + (featureLines.length * lineHeight));
    
    // Check if new page needed
    if (yPosition + boxHeight > doc.internal.pageSize.height - 30) {
        doc.addPage();
        yPosition = 20;
    }
    
    // Simple box with border
    doc.setFillColor(255, 250, 240);
    doc.rect(margin, yPosition, contentWidth, boxHeight, 'F');
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.5);
    doc.rect(margin, yPosition, contentWidth, boxHeight);
    
    // Title
    doc.setTextColor(245, 158, 11);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('SPECIAL FEATURES', margin + 5, yPosition + 8);
    
    // Content
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    featureLines.forEach((line, index) => {
        doc.text(line, margin + 5, yPosition + 18 + (index * lineHeight));
    });
    
    return yPosition + boxHeight + 10;
}
function addSimpleNumberedItem(doc, text, number, margin, yPosition, contentWidth, lineHeight) {
    // Number
    doc.setFillColor(22, 101, 52);
    doc.circle(margin + 5, yPosition + 3, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(number.toString(), margin + 5, yPosition + 5, { align: 'center' });
    
    // Text
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const textLines = simpleTextSplit(text, 70);
    textLines.forEach((line, index) => {
        doc.text(line, margin + 15, yPosition + 3 + (index * lineHeight));
    });
    
    return yPosition + (textLines.length * lineHeight) + 8;
} 
function addSimpleHealthStatus(doc, margin, yPosition, contentWidth, lineHeight) {
    // Health status
    doc.setFillColor(236, 253, 245);
    doc.rect(margin, yPosition, contentWidth, 20, 'F');
    doc.setDrawColor(34, 197, 94);
    doc.setLineWidth(0.5);
    doc.rect(margin, yPosition, contentWidth, 20);
    
    doc.setTextColor(34, 197, 94);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('PLANT IS HEALTHY', margin + 5, yPosition + 8);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Your plant appears to be in excellent health.', margin + 5, yPosition + 15);
    
    return yPosition + 25;
}

function addSimpleDiseaseSection(doc, fullData, margin, yPosition, contentWidth, lineHeight) {
    const diseaseName = fullData.disease || 'Unknown Disease';
    let currentY = yPosition;
    
    // Disease header
    doc.setFillColor(254, 242, 242);
    doc.rect(margin, currentY, contentWidth, 15, 'F');
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.rect(margin, currentY, contentWidth, 15);
    
    doc.setTextColor(220, 38, 38);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`DISEASE: ${diseaseName}`, margin + 5, currentY + 10);
    
    currentY += 20;
    
    // Symptoms
    if (fullData.disease_symptoms && fullData.disease_symptoms !== 'No specific symptoms detected') {
        currentY = addSimpleSubsection(doc, 'SYMPTOMS', fullData.disease_symptoms, margin, currentY, contentWidth, lineHeight);
    }
    
    return currentY;
}
function addSimpleSubsection(doc, title, content, margin, yPosition, contentWidth, lineHeight) {
    if (yPosition > doc.internal.pageSize.height - 50) {
        doc.addPage();
        yPosition = 20;
    }
    
    // Subsection title
    doc.setTextColor(22, 101, 52);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(title, margin, yPosition);
    
    // Content
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const contentLines = simpleTextSplit(content, 80);
    contentLines.forEach((line, index) => {
        if (yPosition > doc.internal.pageSize.height - 20) {
            doc.addPage();
            yPosition = 20;
        }
        doc.text(line, margin, yPosition + 8 + (index * lineHeight));
    });
    
    return yPosition + (contentLines.length * lineHeight) + 12;
}


function addSimpleNoTreatmentNeeded(doc, margin, yPosition, contentWidth, lineHeight) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('No specific treatment required.', margin, yPosition);
    return yPosition + lineHeight;
}

function addSimpleFooter(doc, pageWidth, pageHeight) {
    const footerY = pageHeight - 15;
    
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.5);
    doc.line(15, footerY - 10, pageWidth - 15, footerY - 10);
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('Generated by PlantDetect AI', pageWidth / 2, footerY - 5, { align: 'center' });
    doc.text('For expert advice, consult certified botanists', pageWidth / 2, footerY, { align: 'center' });
}

// Multi-language Section Header - Improved version
function addMultiLanguageSectionHeader(doc, title, margin, yPosition, pageWidth) {
    // Section header with background
    doc.setFillColor(22, 101, 52);
    doc.roundedRect(margin - 5, yPosition - 5, pageWidth - (2 * margin) + 10, 12, 2, 2, 'F');
    
    // Title - Use simple font for better multi-language support
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    
    // Use the provided title (already translated via getPDFSectionTitle)
    doc.text(title, margin, yPosition + 2);
    
    return yPosition + 15;
}

// Multi-language Info Row
function addMultiLanguageInfoRow(doc, label, value, margin, yPosition, contentWidth, lineHeight) {
    // Label
    doc.setTextColor(22, 101, 52);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`${label}:`, margin, yPosition);
    
    // Value - Handle multi-language text carefully
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    const valueLines = splitTextForPDF(doc, value, contentWidth - 40);
    valueLines.forEach((line, index) => {
        doc.text(line, margin + 35, yPosition + (index * lineHeight));
    });
    
    // Underline
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    doc.line(margin, yPosition + (valueLines.length * lineHeight) + 2, margin + contentWidth, yPosition + (valueLines.length * lineHeight) + 2);
    
    return yPosition + (valueLines.length * lineHeight) + 8;
}
// Smart Text Splitting for PDF
// Smart Text Splitting for PDF - Improved for multi-language
function splitTextForPDF(doc, text, maxWidth) {
    if (!text) return [''];
    
    // For non-English text, we need to be more conservative with line lengths
    const isNonEnglish = /[^\u0000-\u007F]/.test(text);
    const adjustedMaxWidth = isNonEnglish ? maxWidth * 0.6 : maxWidth;
    
    try {
        return doc.splitTextToSize(text, adjustedMaxWidth);
    } catch (error) {
        console.warn('Text splitting failed, using fallback:', error);
        // Fallback: simple splitting for problematic characters
        return simpleTextSplit(text, Math.floor(adjustedMaxWidth / 2.5)); // Approximate character count
    }
}
// Simple text splitter for reliable multi-language support
function simpleTextSplit(text, maxChars) {
    if (!text || typeof text !== 'string') return [''];
    
    // For non-English text, use fewer characters per line
    const isNonEnglish = /[^\u0000-\u007F]/.test(text);
    const actualMaxChars = isNonEnglish ? Math.floor(maxChars * 0.6) : maxChars;
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
        if ((currentLine + ' ' + word).length <= actualMaxChars) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    });
    
    if (currentLine) lines.push(currentLine);
    return lines;
}

// PROFESSIONAL HELPER FUNCTIONS
function createPremiumCover(doc, pageWidth, pageHeight, plantName, fullData) {
    // Clean white background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Header with gradient effect
    doc.setFillColor(22, 101, 52);
    doc.rect(0, 0, pageWidth, 100, 'F');
    
    // Logo/Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('PLANTDETECT', pageWidth / 2, 40, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('AI-Powered Plant Health Analysis', pageWidth / 2, 55, { align: 'center' });
    
    // Plant Info Card
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(20, 80, pageWidth - 40, pageHeight - 150, 5, 5, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(20, 80, pageWidth - 40, pageHeight - 150, 5, 5);
    
    // Plant Name
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const plantNameLines = doc.splitTextToSize(plantName, pageWidth - 80);
    let nameY = 110;
    plantNameLines.forEach((line) => {
        doc.text(line, pageWidth / 2, nameY, { align: 'center' });
        nameY += 12;
    });
    
    // Scientific Name
    if (fullData.scientific_name) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        doc.text(fullData.scientific_name, pageWidth / 2, nameY + 5, { align: 'center' });
    }
    
    // Divider
    doc.setDrawColor(22, 101, 52);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - 50, nameY + 20, pageWidth / 2 + 50, nameY + 20);
    
    // Report Details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}`, pageWidth / 2, nameY + 35, { align: 'center' });
    
    doc.setTextColor(150, 150, 150);
    doc.text('Confidential Plant Health Report', pageWidth / 2, nameY + 45, { align: 'center' });
}

 // Add this function after the createPremiumCover function

function createMultiLanguageCover(doc, pageWidth, pageHeight, plantName, fullData) {
    // Clean white background
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Header with gradient effect
    doc.setFillColor(22, 101, 52);
    doc.rect(0, 0, pageWidth, 100, 'F');
    
    // Logo/Title - Multi-language support
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    
    const appName = {
        en: 'PLANTDETECT',
        hi: 'प्लांटडिटेक्ट',
        ur: 'پلانٹ ڈیٹیکٹ',
        mr: 'प्लांटडिटेक्ट',
        ta: 'பிளாண்ட்டிடெக்ட்',
        te: 'ప్లాంట్ డిటెక్ట్',
        bn: 'প্ল্যান্টডিটেক্ট',
        gu: 'પ્લાન્ટડિટેક્ટ'
    };
    
    doc.text(appName[currentLanguage] || 'PLANTDETECT', pageWidth / 2, 40, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const subtitle = {
        en: 'AI-Powered Plant Health Analysis',
        hi: 'AI-संचालित पौध स्वास्थ्य विश्लेषण',
        ur: 'AI سے چلنے والا پلانٹ ہیلتھ تجزیہ',
        mr: 'AI-चालित वनस्पती आरोग्य विश्लेषण',
        ta: 'AI இயக்கப்பட்ட தாவர சுகாதார பகுப்பாய்வு',
        te: 'AI-నడిచే ప్లాంట్ హెల్త్ అనాలసిస్',
        bn: 'AI-চালিত গাছের স্বাস্থ্য বিশ্লেষণ',
        gu: 'AI-સંચાલિત પ્લાન્ટ હેલ્થ એનાલિસિસ'
    };
    
    doc.text(subtitle[currentLanguage] || 'AI-Powered Plant Health Analysis', pageWidth / 2, 55, { align: 'center' });
    
    // Plant Info Card
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(20, 80, pageWidth - 40, pageHeight - 150, 5, 5, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(20, 80, pageWidth - 40, pageHeight - 150, 5, 5);
    
    // Plant Name
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const plantNameLines = splitTextForPDF(doc, plantName, pageWidth - 80);
    let nameY = 110;
    plantNameLines.forEach((line) => {
        doc.text(line, pageWidth / 2, nameY, { align: 'center' });
        nameY += 12;
    });
    
    // Scientific Name
    if (fullData.scientific_name) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        const sciNameLines = splitTextForPDF(doc, fullData.scientific_name, pageWidth - 80);
        sciNameLines.forEach((line) => {
            doc.text(line, pageWidth / 2, nameY + 5, { align: 'center' });
            nameY += 8;
        });
    }
    
    // Divider
    doc.setDrawColor(22, 101, 52);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - 50, nameY + 20, pageWidth / 2 + 50, nameY + 20);
    
    // Report Details - Multi-language
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    
    const generatedText = {
        en: `Generated on: ${new Date().toLocaleDateString()}`,
        hi: `जनरेट किया गया: ${new Date().toLocaleDateString('hi-IN')}`,
        ur: `تاریخ پیدائش: ${new Date().toLocaleDateString('ur-PK')}`,
        mr: `तयार केले: ${new Date().toLocaleDateString('mr-IN')}`,
        ta: `உருவாக்கப்பட்டது: ${new Date().toLocaleDateString('ta-IN')}`,
        te: `జెనరేట్ చేయబడింది: ${new Date().toLocaleDateString('te-IN')}`,
        bn: `জেনারেট করা হয়েছে: ${new Date().toLocaleDateString('bn-BD')}`,
        gu: `જનરેટ કરવામાં આવ્યું: ${new Date().toLocaleDateString('gu-IN')}`
    };
    
    doc.text(generatedText[currentLanguage] || `Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, nameY + 35, { align: 'center' });
    
    const confidentialText = {
        en: 'Confidential Plant Health Report',
        hi: 'गोपनीय पौध स्वास्थ्य रिपोर्ट',
        ur: 'خفیہ پلانٹ ہیلتھ رپورٹ',
        mr: 'गोपनीय वनस्पती आरोग्य अहवाल',
        ta: 'ரகசிய தாவர சுகாதார அறிக்கை',
        te: 'గోప్య ప్లాంట్ హెల్త్ రిపోర్ట్',
        bn: 'গোপন গাছের স্বাস্থ্য রিপোর্ট',
        gu: 'ગોપ્ય પ્લાન્ટ હેલ્થ રિપોર્ટ'
    };
    
    doc.setTextColor(150, 150, 150);
    doc.text(confidentialText[currentLanguage] || 'Confidential Plant Health Report', pageWidth / 2, nameY + 45, { align: 'center' });
}

function addPremiumSectionHeader(doc, title, margin, yPosition, pageWidth) {
    // Section header with background
    doc.setFillColor(22, 101, 52);
    doc.roundedRect(margin - 5, yPosition - 5, pageWidth - (2 * margin) + 10, 12, 2, 2, 'F');
    
    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, yPosition + 2);
    
    return yPosition + 15;
}

function addPremiumInfoRow(doc, label, value, margin, yPosition, contentWidth, lineHeight) {
    // Label
    doc.setTextColor(22, 101, 52);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`${label}:`, margin, yPosition);
    
    // Value
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    const valueLines = doc.splitTextToSize(value, contentWidth - 40);
    valueLines.forEach((line, index) => {
        doc.text(line, margin + 35, yPosition + (index * lineHeight));
    });
    
    // Underline
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    doc.line(margin, yPosition + (valueLines.length * lineHeight) + 2, margin + contentWidth, yPosition + (valueLines.length * lineHeight) + 2);
    
    return yPosition + (valueLines.length * lineHeight) + 8;
}

function addTextContent(doc, text, margin, yPosition, contentWidth, lineHeight, fontSize = 9) {
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    
    const lines = doc.splitTextToSize(text, contentWidth);
    lines.forEach(line => {
        if (yPosition > doc.internal.pageSize.height - 20) {
            doc.addPage();
            yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
    });
    
    return yPosition;
}

// FIXED: Special Features Box - Larger and better
function addFeatureBox(doc, feature, margin, yPosition, contentWidth, lineHeight) {
    // First calculate how much height we need for the text
    doc.setFontSize(9);
    const featureLines = doc.splitTextToSize(feature, contentWidth - 20);
    const textHeight = featureLines.length * lineHeight;
    const boxHeight = Math.max(45, 35 + textHeight); // Minimum height 45, adjust based on content
    
    // Check if we need a new page
    if (yPosition + boxHeight > doc.internal.pageSize.height - 30) {
        doc.addPage();
        yPosition = 20;
    }
    
    // Feature box with border - larger box
    doc.setFillColor(255, 250, 240);
    doc.roundedRect(margin, yPosition, contentWidth, boxHeight, 5, 5, 'F');
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.8);
    doc.roundedRect(margin, yPosition, contentWidth, boxHeight, 5, 5);
    
    // Title
    doc.setTextColor(245, 158, 11);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('SPECIAL FEATURES', margin + 10, yPosition + 8);
    
    // Divider line under title
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.3);
    doc.line(margin + 10, yPosition + 11, margin + contentWidth - 10, yPosition + 11);
    
    // Feature text with better spacing
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    featureLines.forEach((line, index) => {
        doc.text(line, margin + 10, yPosition + 20 + (index * lineHeight));
    });
    
    return yPosition + boxHeight + 10;
}

// FIXED: Care Tips Numbers - Larger and better visible
function addNumberedItem(doc, text, number, margin, yPosition, contentWidth, lineHeight) {
    // Larger number circle
    doc.setFillColor(22, 101, 52);
    doc.circle(margin + 8, yPosition + 6, 6, 'F'); // Increased radius to 6
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8); // Increased font size
    doc.setFont('helvetica', 'bold');
    doc.text(number.toString(), margin + 8, yPosition + 8, { align: 'center' });
    
    // Text
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const textLines = doc.splitTextToSize(text, contentWidth - 25);
    textLines.forEach((line, index) => {
        doc.text(line, margin + 20, yPosition + 5 + (index * lineHeight));
    });
    
    return yPosition + (textLines.length * lineHeight) + 10;
}

function addHealthStatus(doc, margin, yPosition, contentWidth, lineHeight) {
    // Health status box
    doc.setFillColor(236, 253, 245);
    doc.roundedRect(margin, yPosition, contentWidth, 25, 3, 3, 'F');
    doc.setDrawColor(34, 197, 94);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, yPosition, contentWidth, 25, 3, 3);
    
    // Status text
    doc.setTextColor(34, 197, 94);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('PLANT IS HEALTHY', margin + 8, yPosition + 8);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Your plant appears to be in excellent health. Continue with proper care practices.', margin + 8, yPosition + 15);
    
    return yPosition + 30;
}

function addDiseaseSection(doc, fullData, margin, yPosition, contentWidth, lineHeight) {
    const diseaseName = fullData.disease || 'Unknown Disease';
    let currentY = yPosition;
    
    // Disease header
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(margin, currentY, contentWidth, 20, 3, 3, 'F');
    doc.setDrawColor(220, 38, 38);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, currentY, contentWidth, 20, 3, 3);
    
    // Disease text
    doc.setTextColor(220, 38, 38);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`DETECTED DISEASE: ${diseaseName}`, margin + 8, currentY + 12);
    
    currentY += 25;
    
    // Symptoms
    if (fullData.disease_symptoms && fullData.disease_symptoms !== 'No specific symptoms detected') {
        currentY = addDiseaseSubsection(doc, 'SYMPTOMS', fullData.disease_symptoms, margin, currentY, contentWidth, lineHeight);
    }
    
    // Causes
    if (fullData.disease_causes && fullData.disease_causes !== 'Not specified') {
        currentY = addDiseaseSubsection(doc, 'CAUSES', fullData.disease_causes, margin, currentY, contentWidth, lineHeight);
    }
    
    return currentY;
}

function addDiseaseSubsection(doc, title, content, margin, yPosition, contentWidth, lineHeight) {
    if (yPosition > doc.internal.pageSize.height - 50) {
        doc.addPage();
        yPosition = 20;
    }
    
    // Subsection title
    doc.setTextColor(22, 101, 52);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(title, margin, yPosition);
    
    // Content
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const contentLines = doc.splitTextToSize(content, contentWidth);
    contentLines.forEach((line, index) => {
        if (yPosition > doc.internal.pageSize.height - 20) {
            doc.addPage();
            yPosition = 20;
        }
        doc.text(line, margin, yPosition + 8 + (index * lineHeight));
    });
    
    return yPosition + (contentLines.length * lineHeight) + 15;
}

function addNoTreatmentNeeded(doc, margin, yPosition, contentWidth, lineHeight) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);
    doc.text('No specific treatment required. Maintain proper care practices.', margin, yPosition);
    return yPosition + lineHeight;
}

function addProfessionalFooter(doc, pageWidth, pageHeight) {
    const footerY = pageHeight - 15;
    
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.5);
    doc.line(15, footerY - 10, pageWidth - 15, footerY - 10);
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('Report Generated by PlantDetect AI Technology', pageWidth / 2, footerY - 5, { align: 'center' });
    doc.text('For critical plant health issues, consult certified botanists or agricultural experts.', pageWidth / 2, footerY, { align: 'center' });
}

// PDF Multi-language Support Functions
function getPDFSectionTitle(section) {
    const sectionTitles = {
        'PLANT IDENTIFICATION': {
            en: 'PLANT IDENTIFICATION',
            hi: 'पौधे की पहचान',
            ur: 'پلانٹ کی شناخت',
            mr: 'वनस्पती ओळख',
            ta: 'தாவர அடையாளம்',
            te: 'ప్లాంట్ గుర్తింపు',
            bn: 'গাছ চিহ্নিতকরণ',
            gu: 'છોડ ઓળખ'
        },
        'BENEFITS & USES': {
            en: 'BENEFITS & USES',
            hi: 'फायदे और उपयोग',
            ur: 'فوائد اور استعمال',
            mr: 'फायदे आणि वापर',
            ta: 'பயன்கள் மற்றும் பயன்பாடுகள்',
            te: 'ప్రయోజనాలు మరియు ఉపయోగాలు',
            bn: 'সুবিধা এবং ব্যবহার',
            gu: 'ફાયદા અને ઉપયોગ'
        },
        'GROWING CONDITIONS': {
            en: 'GROWING CONDITIONS',
            hi: 'उगने की स्थितियाँ',
            ur: 'اگنے کی شرائط',
            mr: 'वाढीच्या अटी',
            ta: 'வளர்ச்சி நிலைமைகள்',
            te: 'వృద్ధి పరిస్థితులు',
            bn: 'বর্ধনশীল অবস্থা',
            gu: 'વૃદ્ધિ શરતો'
        },
        'CARE TIPS': {
            en: 'CARE TIPS',
            hi: 'देखभाल युक्तियाँ',
            ur: 'دیکھ بھال کے نکات',
            mr: 'काळजी टिपा',
            ta: 'பராமரிப்பு உதவிக்குறிப்புகள்',
            te: 'సంరక్షణ చిట్కాలు',
            bn: 'যত্নের টিপস',
            gu: 'સંભાળ ટીપ્સ'
        },
        'DISEASE ANALYSIS': {
            en: 'DISEASE ANALYSIS',
            hi: 'रोग विश्लेषण',
            ur: 'بیماری کا تجزیہ',
            mr: 'रोग विश्लेषण',
            ta: 'நோய் பகுப்பாய்வு',
            te: 'రోగం విశ్లేషణ',
            bn: 'রোগ বিশ্লেষণ',
            gu: 'રોગ વિશ્લેષણ'
        },
        'TREATMENT & REMEDIES': {
            en: 'TREATMENT & REMEDIES',
            hi: 'उपचार और इलाज',
            ur: 'علاج اور تدابیر',
            mr: 'उपचार आणि उपाय',
            ta: 'சிகிச்சை மற்றும் தீர்வுகள்',
            te: 'చికిత్స మరియు పరిష్కారాలు',
            bn: 'চিকিত্সা এবং প্রতিকার',
            gu: 'ઉપચાર અને ઉપાય'
        },
        'DISEASE PREVENTION': {
            en: 'DISEASE PREVENTION',
            hi: 'रोग निवारण',
            ur: 'بیماری سے بچاؤ',
            mr: 'रोग प्रतिबंध',
            ta: 'நோய்த் தடுப்பு',
            te: 'రోగ నివారణ',
            bn: 'রোগ প্রতিরোধ',
            gu: 'રોગ નિવારણ'
        }
    };
    
    return sectionTitles[section]?.[currentLanguage] || section;
}
function getPDFLabel(label) {
    const labels = {
        'Common Name': {
            en: 'Common Name',
            hi: 'सामान्य नाम',
            ur: 'عام نام',
            mr: 'सामान्य नाव',
            ta: 'பொதுவான பெயர்',
            te: 'సాధారణ పేరు',
            bn: 'সাধারণ নাম',
            gu: 'સામાન્ય નામ'
        },
        'Scientific Name': {
            en: 'Scientific Name',
            hi: 'वैज्ञानिक नाम',
            ur: 'سائنسی نام',
            mr: 'शास्त्रीय नाव',
            ta: 'அறிவியல் பெயர்',
            te: 'శాస్త్రీయ పేరు',
            bn: 'বৈজ্ঞানিক নাম',
            gu: 'વૈજ્ઞાનિક નામ'
        },
        'Plant Family': {
            en: 'Plant Family',
            hi: 'पौधे का परिवार',
            ur: 'پلانٹ فیملی',
            mr: 'वनस्पती कुटुंब',
            ta: 'தாவர குடும்பம்',
            te: 'ప్లాంట్ ఫ్యామిలీ',
            bn: 'গাছের পরিবার',
            gu: 'છોડ પરિવાર'
        },
        'Native Origin': {
            en: 'Native Origin',
            hi: 'मूल स्थान',
            ur: 'مقامی اصل',
            mr: 'मूळ उगम',
            ta: 'சொந்த தோற்றம்',
            te: 'స్థానిక మూలం',
            bn: 'নেটিভ উত্স',
            gu: 'મૂળ મૂળ'
        },
        'Plant Type': {
            en: 'Plant Type',
            hi: 'पौधे का प्रकार',
            ur: 'پلانٹ کی قسم',
            mr: 'वनस्पती प्रकार',
            ta: 'தாவர வகை',
            te: 'ప్లాంట్ రకం',
            bn: 'গাছের ধরন',
            gu: 'છોડ પ્રકાર'
        },
        'Toxicity Level': {
            en: 'Toxicity Level',
            hi: 'विषाक्तता स्तर',
            ur: 'زہریلا پن کی سطح',
            mr: 'विषाची पातळी',
            ta: 'நச்சுத்தன்மை நிலை',
            te: 'విషపూరితత్వ స్థాయి',
            bn: 'বিষাক্ততা স্তর',
            gu: 'ઝેરીલાપણું સ્તર'
        },
        'Sunlight': {
            en: 'Sunlight',
            hi: 'सूरज की रोशनी',
            ur: 'دھوپ',
            mr: 'सूर्यप्रकाश',
            ta: 'சூரிய ஒளி',
            te: 'సూర్యకాంతి',
            bn: 'সূর্যালোক',
            gu: 'સૂર્યપ્રકાશ'
        },
        'Water': {
            en: 'Water',
            hi: 'पानी',
            ur: 'پانی',
            mr: 'पाणी',
            ta: 'நீர்',
            te: 'నీరు',
            bn: 'পানি',
            gu: 'પાણી'
        },
        'Soil': {
            en: 'Soil',
            hi: 'मिट्टी',
            ur: 'مٹی',
            mr: 'माती',
            ta: 'மண்',
            te: 'న chāvu',
            bn: 'মাটি',
            gu: 'માટી'
        },
        'Temperature': {
            en: 'Temperature',
            hi: 'तापमान',
            ur: 'درجہ حرارت',
            mr: 'तापमान',
            ta: 'வெப்பநிலை',
            te: 'ఉష్ణోగ్రత',
            bn: 'তাপমাত্রা',
            gu: 'તાપમાન'
        },
        'Humidity': {
            en: 'Humidity',
            hi: 'नमी',
            ur: 'نمی',
            mr: 'आर्द्रता',
            ta: 'ஈரப்பதம்',
            te: 'తేమ',
            bn: 'আর্দ্রতা',
            gu: 'આર્દ્રતા'
        },
        'Blooming Season': {
            en: 'Blooming Season',
            hi: 'फूल आने का मौसम',
            ur: 'پھولنے کا موسم',
            mr: 'फुलोरा हंगाम',
            ta: 'மலரும் காலம்',
            te: 'వికసించే సీజన్',
            bn: 'ফুল ফোটার মৌসুম',
            gu: 'ફૂલોની ઋતુ'
        }
    };
    
    return labels[label]?.[currentLanguage] || label;
}

// Utility functions
function showExportSuccess(message) {
    // Remove existing messages
    document.querySelectorAll('.export-message').forEach(msg => msg.remove());
    
    const successDiv = document.createElement('div');
    successDiv.className = 'export-message fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        if (document.body.contains(successDiv)) {
            document.body.removeChild(successDiv);
        }
    }, 3000);
}

function showError(message) {
    // Remove existing messages
    document.querySelectorAll('.export-message').forEach(msg => msg.remove());
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'export-message fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        if (document.body.contains(errorDiv)) {
            document.body.removeChild(errorDiv);
        }
    }, 3000);
}

// Complete Word Export with All AI Data
function exportToWord() {
    const exportBtn = document.getElementById('exportWord');
    const plantName = document.getElementById('plantName')?.textContent || 'Unknown Plant';
    const plantBenefits = document.getElementById('plantBenefits')?.textContent || 'No benefits information available.';
    const diseaseName = document.getElementById('diseaseName')?.textContent || 'No disease information available.';
    const remedyText = document.getElementById('remedyText')?.textContent || 'No remedy information available.';

    exportBtn.classList.add('export-loading');
    exportBtn.disabled = true;

    try {
        // Get all the additional data
        const fullData = window.lastAnalysisData || {};
        const scientificName = fullData.scientific_name || 'Not specified';
        const plantFamily = fullData.family || 'Not specified';
        const plantOrigin = fullData.origin || 'Not specified';
        const plantType = fullData.plant_type || 'Not specified';
        const growingConditions = fullData.growing_conditions || {};
        const careTips = fullData.care_tips || [];
        const diseaseSymptoms = fullData.disease_symptoms || 'No specific symptoms detected';
        const diseaseCauses = fullData.disease_causes || 'Not specified';
        const preventionTips = fullData.prevention || 'Maintain proper plant care practices';
        const toxicity = fullData.toxicity || 'Not specified';
        const propagation = fullData.propagation || 'Not specified';
        const bloomingSeason = fullData.blooming_season || 'Not specified';
        const specialFeatures = fullData.special_features || 'Not specified';

        const wordContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
    <meta charset="utf-8">
    <title>PlantDetect Complete Report - ${plantName}</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 40px; 
            line-height: 1.6;
            color: #2d3748;
        }
        .header { 
            text-align: center; 
            color: #166534; 
            border-bottom: 3px solid #166534; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
        }
        h1 { 
            color: #166534; 
            font-size: 28px;
            margin-bottom: 10px;
        }
        h2 { 
            color: #166534; 
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 20px;
            border-bottom: 2px solid #166534;
            padding-bottom: 5px;
        }
        h3 {
            color: #166534;
            margin-top: 25px;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .info-grid {
            display: table;
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        .info-row {
            display: table-row;
        }
        .info-label {
            display: table-cell;
            padding: 8px 12px;
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            font-weight: bold;
            width: 30%;
            color: #166534;
        }
        .info-value {
            display: table-cell;
            padding: 8px 12px;
            border: 1px solid #bbf7d0;
            background: white;
        }
        .growing-grid {
            display: table;
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        .growing-row {
            display: table-row;
        }
        .growing-icon {
            display: table-cell;
            padding: 8px;
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            width: 50px;
            text-align: center;
            font-size: 16px;
        }
        .growing-detail {
            display: table-cell;
            padding: 8px 12px;
            border: 1px solid #e5e7eb;
            background: white;
        }
        .care-tips {
            margin: 15px 0;
        }
        .care-tip {
            margin: 8px 0;
            padding: 8px 12px;
            background: #f8fafc;
            border-left: 4px solid #10b981;
        }
        .disease-section {
            margin: 15px 0;
            padding: 15px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 5px;
        }
        .healthy-section {
            margin: 15px 0;
            padding: 15px;
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 5px;
        }
        .footer { 
            margin-top: 40px; 
            text-align: center; 
            color: #666; 
            font-size: 12px;
            border-top: 2px solid #e5e7eb;
            padding-top: 20px;
        }
        .special-feature {
            margin: 15px 0;
            padding: 12px;
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🌿 COMPLETE PLANT ANALYSIS REPORT</h1>
        <p><strong>AI-Powered Plant Identification & Disease Detection</strong></p>
        <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
    </div>
    
    <h2>📋 PLANT IDENTIFICATION</h2>
    <div class="info-grid">
        <div class="info-row">
            <div class="info-label">Common Name</div>
            <div class="info-value">${plantName}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Scientific Name</div>
            <div class="info-value">${scientificName}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Plant Family</div>
            <div class="info-value">${plantFamily}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Native Origin</div>
            <div class="info-value">${plantOrigin}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Plant Type</div>
            <div class="info-value">${plantType}</div>
        </div>
        <div class="info-row">
            <div class="info-label">Toxicity Level</div>
            <div class="info-value">${toxicity}</div>
        </div>
    </div>
    
    <h2>💚 PLANT BENEFITS & USES</h2>
    <p>${plantBenefits}</p>
    
    ${specialFeatures !== 'Not specified' ? `
    <div class="special-feature">
        <strong>✨ Special Features:</strong> ${specialFeatures}
    </div>
    ` : ''}
    
    <h2>🌱 OPTIMAL GROWING CONDITIONS</h2>
    <div class="growing-grid">
        ${growingConditions.sunlight ? `
        <div class="growing-row">
            <div class="growing-icon">☀️</div>
            <div class="growing-detail"><strong>Sunlight:</strong> ${growingConditions.sunlight}</div>
        </div>
        ` : ''}
        
        ${growingConditions.water ? `
        <div class="growing-row">
            <div class="growing-icon">💧</div>
            <div class="growing-detail"><strong>Watering:</strong> ${growingConditions.water}</div>
        </div>
        ` : ''}
        
        ${growingConditions.soil ? `
        <div class="growing-row">
            <div class="growing-icon">🟫</div>
            <div class="growing-detail"><strong>Soil:</strong> ${growingConditions.soil}</div>
        </div>
        ` : ''}
        
        ${growingConditions.temperature ? `
        <div class="growing-row">
            <div class="growing-icon">🌡️</div>
            <div class="growing-detail"><strong>Temperature:</strong> ${growingConditions.temperature}</div>
        </div>
        ` : ''}
        
        ${growingConditions.humidity ? `
        <div class="growing-row">
            <div class="growing-icon">💨</div>
            <div class="growing-detail"><strong>Humidity:</strong> ${growingConditions.humidity}</div>
        </div>
        ` : ''}
        
        ${bloomingSeason !== 'Not specified' ? `
        <div class="growing-row">
            <div class="growing-icon">🌸</div>
            <div class="growing-detail"><strong>Blooming Season:</strong> ${bloomingSeason}</div>
        </div>
        ` : ''}
    </div>
    
    ${careTips.length > 0 ? `
    <h2>💡 ESSENTIAL CARE TIPS</h2>
    <div class="care-tips">
        ${careTips.map((tip, index) => `
        <div class="care-tip">
            <strong>${index + 1}.</strong> ${tip}
        </div>
        `).join('')}
    </div>
    ` : ''}
    
    ${propagation !== 'Not specified' ? `
    <h2>🌿 PROPAGATION GUIDE</h2>
    <p>${propagation}</p>
    ` : ''}
    
    <h2>🏥 DISEASE ANALYSIS & HEALTH STATUS</h2>
    ${diseaseName.toLowerCase().includes('healthy') ? `
    <div class="healthy-section">
        <h3>✅ PLANT IS HEALTHY</h3>
        <p>Your plant appears to be in good health. Continue with proper care practices.</p>
    </div>
    ` : `
    <div class="disease-section">
        <h3>⚠️ DETECTED DISEASE: ${diseaseName}</h3>
        
        ${diseaseSymptoms !== 'No specific symptoms detected' ? `
        <p><strong>🔍 Symptoms:</strong> ${diseaseSymptoms}</p>
        ` : ''}
        
        ${diseaseCauses !== 'Not specified' ? `
        <p><strong>🎯 Causes:</strong> ${diseaseCauses}</p>
        ` : ''}
    </div>
    `}
    
    <h2>💊 TREATMENT & REMEDIES</h2>
    <p>${remedyText}</p>
    
    ${preventionTips !== 'Maintain proper plant care practices' ? `
    <h2>🛡️ DISEASE PREVENTION</h2>
    <p>${preventionTips}</p>
    ` : ''}
    
    <div class="footer">
        <p><strong>🔬 Report Generated by PlantDetect AI Technology</strong></p>
        <p>This comprehensive report is generated using advanced AI analysis and should be used for informational purposes only.</p>
        <p>For critical plant health issues, always consult with certified botanists or agricultural experts.</p>
        <p>© ${new Date().getFullYear()} PlantDetect AI • www.plantdetect.com</p>
    </div>
</body>
</html>`;

        const blob = new Blob(['\uFEFF' + wordContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `PlantDetect_Complete_Report_${plantName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Word export error:', error);
        showError('Failed to generate Word document.');
    } finally {
        setTimeout(() => {
            exportBtn.classList.remove('export-loading');
            exportBtn.disabled = false;
        }, 1000);
    }
}

// Complete Text Export with All AI Data
function exportToText() {
    const exportBtn = document.getElementById('exportText');
    const plantName = document.getElementById('plantName')?.textContent || 'Unknown Plant';
    const plantBenefits = document.getElementById('plantBenefits')?.textContent || 'No benefits information available.';
    const diseaseName = document.getElementById('diseaseName')?.textContent || 'No disease information available.';
    const remedyText = document.getElementById('remedyText')?.textContent || 'No remedy information available.';

    exportBtn.classList.add('export-loading');
    exportBtn.disabled = true;

    try {
        // Get all the additional data
        const fullData = window.lastAnalysisData || {};
        const scientificName = fullData.scientific_name || 'Not specified';
        const plantFamily = fullData.family || 'Not specified';
        const plantOrigin = fullData.origin || 'Not specified';
        const plantType = fullData.plant_type || 'Not specified';
        const growingConditions = fullData.growing_conditions || {};
        const careTips = fullData.care_tips || [];
        const diseaseSymptoms = fullData.disease_symptoms || 'No specific symptoms detected';
        const diseaseCauses = fullData.disease_causes || 'Not specified';
        const preventionTips = fullData.prevention || 'Maintain proper plant care practices';
        const toxicity = fullData.toxicity || 'Not specified';
        const propagation = fullData.propagation || 'Not specified';
        const bloomingSeason = fullData.blooming_season || 'Not specified';
        const specialFeatures = fullData.special_features || 'Not specified';

        const textContent = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                        🌿 COMPLETE PLANT ANALYSIS REPORT                    ║
║                 AI-Powered Plant Identification & Disease Detection          ║
╚══════════════════════════════════════════════════════════════════════════════╝

Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

📋 PLANT IDENTIFICATION
────────────────────────────────────────────────────────────────────────────────
Common Name:      ${plantName}
Scientific Name:  ${scientificName}
Plant Family:     ${plantFamily}
Native Origin:    ${plantOrigin}
Plant Type:       ${plantType}
Toxicity Level:   ${toxicity}

💚 PLANT BENEFITS & USES
────────────────────────────────────────────────────────────────────────────────
${plantBenefits}

${specialFeatures !== 'Not specified' ? `
✨ SPECIAL FEATURES
────────────────────────────────────────────────────────────────────────────────
${specialFeatures}
` : ''}

🌱 OPTIMAL GROWING CONDITIONS
────────────────────────────────────────────────────────────────────────────────
${growingConditions.sunlight ? `☀️  Sunlight:    ${growingConditions.sunlight}` : ''}
${growingConditions.water ? `💧  Water:       ${growingConditions.water}` : ''}
${growingConditions.soil ? `🟫  Soil:        ${growingConditions.soil}` : ''}
${growingConditions.temperature ? `🌡️  Temperature: ${growingConditions.temperature}` : ''}
${growingConditions.humidity ? `💨  Humidity:    ${growingConditions.humidity}` : ''}
${bloomingSeason !== 'Not specified' ? `🌸  Blooming:    ${bloomingSeason}` : ''}

${careTips.length > 0 ? `
💡 ESSENTIAL CARE TIPS
────────────────────────────────────────────────────────────────────────────────
${careTips.map((tip, index) => `${index + 1}. ${tip}`).join('\n')}
` : ''}

${propagation !== 'Not specified' ? `
🌿 PROPAGATION GUIDE
────────────────────────────────────────────────────────────────────────────────
${propagation}
` : ''}

🏥 DISEASE ANALYSIS & HEALTH STATUS
────────────────────────────────────────────────────────────────────────────────
${diseaseName.toLowerCase().includes('healthy') ? 
`✅ PLANT IS HEALTHY
Your plant appears to be in good health. Continue with proper care practices.` : 
`⚠️ DETECTED DISEASE: ${diseaseName}

🔍 Symptoms: ${diseaseSymptoms}

🎯 Causes: ${diseaseCauses}`
}

💊 TREATMENT & REMEDIES
────────────────────────────────────────────────────────────────────────────────
${remedyText}

${preventionTips !== 'Maintain proper plant care practices' ? `
🛡️ DISEASE PREVENTION
────────────────────────────────────────────────────────────────────────────────
${preventionTips}
` : ''}

════════════════════════════════════════════════════════════════════════════════

🔬 Report Generated by PlantDetect AI Technology

This comprehensive report is generated using advanced AI analysis and should be 
used for informational purposes only.

For critical plant health issues, always consult with certified botanists or 
agricultural experts.

© ${new Date().getFullYear()} PlantDetect AI • www.plantdetect.com
        `.trim();

        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `PlantDetect_Complete_Report_${plantName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Text export error:', error);
        showError('Failed to generate text file.');
    } finally {
        setTimeout(() => {
            exportBtn.classList.remove('export-loading');
            exportBtn.disabled = false;
        }, 1000);
    }
}

// Fallback text download
async function downloadAsText(plantName, plantBenefits, diseaseName, remedyText) {
    const textContent = `
PLANTDETECT REPORT
==================

Plant Name: ${plantName}
Benefits: ${plantBenefits}
Disease: ${diseaseName}
Remedy: ${remedyText}

Generated: ${new Date().toLocaleDateString()}
    `.trim();

    try {
        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `PlantDetect_${plantName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showError('PDF generation failed. Downloaded as text file instead.');
    } catch (error) {
        showError('Download failed. Please try again.');
    }
}

// ==================== STICKY HEADER ====================

// Sticky Header Functionality
function initStickyHeader() {
    const header = document.querySelector('.sticky-header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (header && mobileMenuBtn && mobileMenu) {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle mobile menu
            mobileMenu.classList.toggle('active');
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// ==================== LANGUAGE FEATURES ====================

// Initialize language functionality
function initLanguageFeatures() {
    const languageButtons = document.querySelectorAll('.language-btn');
    
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            languageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current language
            currentLanguage = this.dataset.lang;
            
            // Update UI text
            updateUIText();
        });
    });
}

// Update UI text based on selected language
function updateUIText() {
    const lang = languageConfig[currentLanguage];
    
    // Update analyze button
    if (analyzeBtn) {
        analyzeBtn.textContent = lang.analyzeBtn;
    }
    
    // Update loading text
    const loadingText = document.querySelector('#loading p.text-green-700');
    if (loadingText) {
        loadingText.textContent = lang.loadingText;
    }
    
    // Update result section titles
    const resultTitle = document.querySelector('#result h3');
    if (resultTitle) {
        resultTitle.textContent = lang.resultTitle;
    }
    
    // Update section headers if they exist
    const plantNameHeader = document.querySelector('#plantNameWrapper h4');
    if (plantNameHeader) {
        plantNameHeader.textContent = lang.plantName + ":";
    }
    
    const benefitsHeader = document.querySelector('#benefitsWrapper h4');
    if (benefitsHeader) {
        benefitsHeader.textContent = lang.benefits + ":";
    }
    
    const diseaseHeader = document.querySelector('#diseaseWrapper h4');
    if (diseaseHeader) {
        diseaseHeader.textContent = lang.disease + ":";
    }
    
    const remedyHeader = document.querySelector('#remedyWrapper h4');
    if (remedyHeader) {
        remedyHeader.textContent = lang.remedy + ":";
    }
    
    // Update export section
    const exportHeader = document.querySelector('#exportButtons h4');
    if (exportHeader) {
        exportHeader.textContent = lang.exportText + ":";
    }
    
    // Update retry button
    if (retryBtn) {
        retryBtn.textContent = lang.retryText;
    }
}

function getTranslation(text, lang) {
    const translations = {
        "Not specified": {
            en: "Not specified",
            hi: "निर्दिष्ट नहीं",
            ur: "متعین نہیں",
            mr: "निर्दिष्ट नाही",
            ta: "குறிப்பிடப்படவில்லை",
            te: "పేర్కొనబడలేదు",
            bn: "নির্দিষ্ট করা হয়নি",
            gu: "નિર્દિષ્ટ નથી"
        },
        "No benefits information available.": {
            en: "No benefits information available.",
            hi: "कोई लाभ जानकारी उपलब्ध नहीं।",
            ur: "کوئی فوائد کی معلومات دستیاب نہیں۔",
            mr: "कोणतीही फायद्याची माहिती उपलब्ध नाही.",
            ta: "பயன் தகவல் எதுவும் இல்லை.",
            te: "ప్రయోజనాల సమాచారం లేదు.",
            bn: "কোনও সুবিধার তথ্য উপলব্ধ নেই।",
            gu: "કોઈ ફાયદાની માહિતી ઉપલબ્ધ નથી."
        },
        "No disease information available.": {
            en: "No disease information available.",
            hi: "कोई रोग जानकारी उपलब्ध नहीं।",
            ur: "کوئی بیماری کی معلومات دستیاب نہیں۔",
            mr: "कोणतीही रोग माहिती उपलब्ध नाही.",
            ta: "நோய் தகவல் எதுவும் இல்லை.",
            te: "రోగం సమాచారం లేదు.",
            bn: "কোনও রোগের তথ্য উপলব্ধ নেই।",
            gu: "કોઈ રોગ માહિતી ઉપલબ્ધ નથી."
        },
        "No remedy information available.": {
            en: "No remedy information available.",
            hi: "कोई उपचार जानकारी उपलब्ध नहीं।",
            ur: "کوئی علاج کی معلومات دستیاب نہیں۔",
            mr: "कोणतीही उपाय माहिती उपलब्ध नाही.",
            ta: "சிகிச்சை தகவல் எதுவும் இல்லை.",
            te: "పరిష్కార సమాచారం లేదు.",
            bn: "কোনও প্রতিকারের তথ্য উপলব্ধ নেই।",
            gu: "કોઈ ઉપાય માહિતી ઉપલબ્ધ નથી."
        }
    };
    
    return translations[text]?.[lang] || text;
}

// Helper functions for export messages
function getExportSuccessMessage(lang) {
    const messages = {
        en: "PDF downloaded successfully!",
        hi: "PDF सफलतापूर्वक डाउनलोड हुआ!",
        ur: "PDF کامیابی سے ڈاؤن لوڈ ہوگیا!",
        mr: "PDF यशस्वीरित्या डाउनलोड झाले!",
        ta: "PDF வெற்றிகரமாக பதிவிறக்கப்பட்டது!",
        te: "PDF విజయవంతంగా డౌన్‌లోడ్ అయ్యింది!",
        bn: "PDF সফলভাবে ডাউনলোড হয়েছে!",
        gu: "PDF સફળતાપૂર્વક ડાઉનલોડ થયું!"
    };
    return messages[lang] || messages.en;
}

function getExportErrorMessage(lang) {
    const messages = {
        en: "PDF download failed. Please try again.",
        hi: "PDF डाउनलोड विफल। कृपया पुनः प्रयास करें।",
        ur: "PDF ڈاؤن لوڈ ناکام ہوا۔ براہ کرم دوبارہ کوشش کریں۔",
        mr: "PDF डाउनलोड अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
        ta: "PDF பதிவிறக்கம் தோல்வியடைந்தது. தயவு செய்து மீண்டும் முயற்சிக்கவும்.",
        te: "PDF డౌన్‌లోడ్ విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.",
        bn: "PDF ডাউনলোড ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।",
        gu: "PDF ડાઉનલોડ નિષ્ફળ થયું. કૃપા કરીને ફરી પ્રયત્ન કરો."
    };
    return messages[lang] || messages.en;
}

// Real-time progress simulation
function simulateRealTimeProgress() {
    return new Promise((resolve) => {
        let progress = 0;
        const totalSteps = 100;
        const stepDuration = 50;
        const steps = languageConfig[currentLanguage].progressSteps;

        const interval = setInterval(() => {
            progress += 1;
            
            // Update progress bar
            if (realProgressBar) {
                realProgressBar.style.width = `${progress}%`;
            }
            if (progressPercentage) {
                progressPercentage.textContent = `${progress}%`;
            }
            
            // Update status text at specific intervals
            if (steps[progress]) {
                if (progressStatus) {
                    progressStatus.textContent = steps[progress];
                }
            }
            
            // Add some randomness to make it look more natural
            if (progress > 20 && progress < 90 && Math.random() > 0.7) {
                clearInterval(interval);
                setTimeout(() => {
                    const newInterval = setInterval(() => {
                        progress += 1;
                        
                        if (realProgressBar) realProgressBar.style.width = `${progress}%`;
                        if (progressPercentage) progressPercentage.textContent = `${progress}%`;
                        if (steps[progress] && progressStatus) progressStatus.textContent = steps[progress];
                        
                        if (progress >= totalSteps) {
                            clearInterval(newInterval);
                            setTimeout(resolve, 500);
                        }
                    }, stepDuration);
                }, 300);
            }
            
            if (progress >= totalSteps) {
                clearInterval(interval);
                setTimeout(resolve, 500);
            }
        }, stepDuration);
    });
}

// Show loading state with progress bar
function showLoadingStateWithProgress() {
    if (loading) loading.classList.remove('hidden');
    if (analyzeBtn) analyzeBtn.disabled = true;
    if (result) result.classList.add('hidden');
    
    // Reset progress bar
    if (realProgressBar) {
        realProgressBar.style.width = '0%';
        realProgressBar.classList.remove('bg-red-600');
        realProgressBar.classList.add('bg-green-600');
    }
    if (progressPercentage) progressPercentage.textContent = '0%';
    if (progressStatus) progressStatus.textContent = 'Initializing analysis...';
}

// ==================== INITIALIZATION ====================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - initializing PlantDetect");
    init();
});

// Also initialize when page fully loads
window.addEventListener('load', function() {
    console.log("Page fully loaded");
});

// Debug info
console.log('PlantDetect PDF Generator Loaded');
console.log('exportToPDF function available:', typeof window.exportToPDF === 'function');