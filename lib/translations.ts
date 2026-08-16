export const hindiSite = {
  bio: {
    intro: "मैं जिज्ञासु हूँ, किसी अच्छी-सी rabbit hole में आसानी से खो जाता हूँ, और अक्सर मेरे पास समय से एक idea ज़्यादा होता है। मुझे अच्छी बातचीत, चीज़ें बनाना, और यह समझना पसंद है कि वे क्यों चलती हैं या चुपचाप क्यों बिखर जाती हैं। इनमें से कुछ सच बन जाता है; बाकी experiments, notes, आधे बने ideas और वे सवाल बनते हैं जिनके पास मैं बार-बार लौटता हूँ।",
    intensity: "मैं middle-of-the-road इंसान नहीं हूँ। कोई चीज़ सच में मायने रखे तो मैं उसमें पूरा उतर जाता हूँ। अभी सीख रहा हूँ कि यह intensity कहाँ काम आती है, कब इसे थोड़ा थामना चाहिए, और किन चीज़ों को इसे देना वाकई सही है।",
  },
  roles: {
    iisc: {
      title: "रिसर्च इंटर्न",
      employment: "इंटर्नशिप",
      location: "बेंगलुरु · ऑन-साइट",
      highlights: [
        "SpikeLab बनाया, एक open-source neural signal analysis tool, जिसने जाँचे गए 95% मामलों में NeuroExplorer के परिणाम दोहराए।",
        "Spike और burst detection, waveform और firing-rate analysis, deterministic validation, tests और reproducible exports लागू किए।",
      ],
    },
    worldquant: {
      title: "रिसर्च कंसल्टेंट",
      employment: "पार्ट-टाइम",
      location: "रिमोट",
      highlights: [
        "WorldQuant BRAIN प्लेटफ़ॉर्म पर financial और market data से quantitative signals पर शोध किया।",
        "Alpha ideas, backtesting, metric-based filtering और experiment tracking के लिए Python tools बनाए।",
      ],
    },
    bel: {
      title: "समर इंटर्न",
      employment: "इंटर्नशिप",
      location: "पंचकुला · ऑन-साइट",
      highlights: [
        "Testing Department में satellite communication equipment और signal-processing systems पर काम किया।",
        "Device testing, verification, fault identification और technical documentation में सहयोग किया।",
      ],
    },
  },
  projects: {
    spikelab: {
      description: "Offline MEA spike detection, burst analysis, waveform metrics और electrode comparison।",
      highlights: [
        "Continuous recordings और pre-sorted NeuroExplorer spike data के लिए local Streamlit workflow बनाया। इसमें spike, waveform, ISI, firing-rate और burst analysis शामिल हैं।",
        "Burst algorithms, filtered detection, waveform boundaries और EDF calibration के लिए deterministic regression fixtures जोड़े। ये software behaviour जाँचते हैं, biological validity नहीं।",
      ],
    },
    sage: {
      description: "Hybrid retrieval और reranking से financial documents पर citation-grounded research।",
      highlights: [
        "BM25 और vector retrieval को reciprocal-rank fusion, company-balanced retrieval, cross-encoder reranking और page-level citations के साथ जोड़ा।",
        "तीन वास्तविक SEC filings पर 19/19 evaluation checks और 290 passing backend tests दर्ज किए; साथ ही live-use failures और सीमाएँ भी लिखीं।",
      ],
    },
    glimpse: {
      description: "ViT, BERT, co-attention और LoRA के साथ multimodal VQA fusion benchmark।",
      highlights: [
        "आठ frozen-CLIP fusion heads की तुलना की; 657K-parameter GeometryFusion ने 63.3% validation accuracy के साथ track lead किया।",
        "Soft-label, masking, pooling और tokenizer समस्याएँ ठीक करने के बाद ViT-B/16 और BERT co-attention model ने 67.6 VQA soft score हासिल किया।",
      ],
    },
    paperscope: {
      description: "Historical OpenReview evidence से calibrated ML paper evaluation।",
      highlights: [
        "Closed model inputs, private labels, अलग calibration sets और hash validation के साथ leakage-safe evaluation workflow बनाया।",
        "Descriptive ICLR pilots में calibration ने rating MAE 21.8% घटाया, decision accuracy 62.9% से 77.1% की और false accepts 9 से 2 किए।",
      ],
    },
  },
} as const;

export const hindiUi = {
  experience: "अनुभव",
  projects: "प्रोजेक्ट्स",
  detailsReports: "विस्तृत रिपोर्ट्स →",
  copyEmail: "ईमेल कॉपी करें",
  copied: "कॉपी हो गया!",
  home: "होम",
  projectsReports: "प्रोजेक्ट्स और रिपोर्ट्स",
  projectsIntro: "छोटी और साफ़ case studies: सवाल क्या था, मैंने क्या बनाया, क्या काम किया और क्या नहीं।",
  selectedProjects: "चुने हुए प्रोजेक्ट्स",
  projectLink: "प्रोजेक्ट लिंक",
  report: "रिपोर्ट",
  readReport: "रिपोर्ट पढ़ें",
  backHome: "होम पर वापस",
  allProjects: "सभी प्रोजेक्ट्स",
  projectReport: "प्रोजेक्ट रिपोर्ट",
  inOneLine: "एक पंक्ति में",
  question: "सवाल",
  whatBuilt: "मैंने क्या बनाया",
  mainResult: "मुख्य परिणाम",
  findings: "काम से क्या पता चला",
  limitations: "यह क्या साबित नहीं करता",
  conclusion: "निष्कर्ष",
  sourceMaterial: "स्रोत सामग्री",
  sourceDescription: "ऊपर की रिपोर्ट इस portfolio के लिए लिखी गई है। इन links में code और मूल records हैं।",
  sourceCode: "सोर्स कोड",
  moreProjects: "और प्रोजेक्ट्स",
  lastUpdated: "अंतिम अपडेट · 17 अगस्त 2026",
} as const;

export const hindiReports = {
  spikelab: {
    kicker: "बिना black box के neural signal analysis",
    question: "क्या एक local tool multi-electrode array analysis को raw spike detection से burst और waveform measurements तक reproducible बना सकता है, बिना अहम फैसलों को छिपाए?",
    answer: "SpikeLab continuous recordings और pre-sorted NeuroExplorer data को एक traceable analysis workflow में बदलता है। हर चरण देखा, दोहराया और export किया जा सकता है।",
    implementation: [
      "Spike detection, waveform analysis, inter-spike intervals, firing rates, burst detection और electrode comparison के लिए offline Streamlit app बनाया।",
      "Continuous recordings और पहले से sorted NeuroExplorer spike data, दोनों को support किया ताकि measurements अलग workflows में जाँचे जा सकें।",
      "Burst algorithms, filtered detection, waveform boundaries और EDF calibration के लिए reproducible exports और deterministic fixtures जोड़े।",
    ],
    resultLabels: ["जाँचे गए NeuroExplorer परिणाम दोहराए", "regression fixtures से जाँचे गए analysis areas"],
    findings: [
      "Project में दर्ज मामलों में tool ने 95% reference NeuroExplorer output दोहराया।",
      "Fixed inputs अब fixed expected outputs देते हैं, इसलिए detection और burst logic में बदलाव audit करना आसान है।",
      "Workflow raw traces, detected events, derived metrics और exports को एक साथ रखता है।",
    ],
    limitations: [
      "Deterministic fixtures software behaviour जाँचते हैं; वे हर biological preparation के लिए algorithm की correctness साबित नहीं करते।",
      "Detection thresholds और burst parameters में अभी भी experimental judgement चाहिए।",
    ],
    conclusion: "SpikeLab neural-signal analysis को inspect और reproduce करना आसान बनाता है। इसका मुख्य योगदान कोई नया biological claim नहीं, बल्कि recording से जाँचने योग्य results तक भरोसेमंद रास्ता है।",
    evidenceLabels: ["Technical documentation", "Validation notes"],
  },
  sage: {
    kicker: "ऐसे answers जो filing तक वापस ले जाएँ",
    question: "क्या research assistant लंबे financial filings पर सवालों के जवाब देते समय यह भी दिखा सकता है कि जवाब किन pages पर आधारित है?",
    answer: "Sage keyword और semantic search से evidence निकालता है, उसे rerank करता है और page-level citations देता है। लक्ष्य ऐसा जवाब है जिसे reader खुद verify कर सके।",
    implementation: [
      "BM25 keyword search और vector retrieval को reciprocal-rank fusion से जोड़ा ताकि exact financial terms और related passages, दोनों महत्त्व रखें।",
      "Cross-encoder reranking से पहले companies के बीच retrieval balance किया, ताकि एक बड़ी filing context पर हावी न हो।",
      "Citations को source pages से जोड़ा और तीन वास्तविक SEC filings से evaluation set बनाया।",
    ],
    resultLabels: ["documented evaluation checks पास हुए", "backend tests पास हुए"],
    findings: [
      "Financial language के लिए hybrid retrieval, केवल keyword या vector search से अधिक भरोसेमंद रहा।",
      "Company-balanced retrieval ने multi-company questions में हर requested filing का evidence बनाए रखा।",
      "Browser-based user testing ने citation और retrieval failures पकड़े जो unit tests में नहीं दिखे।",
    ],
    limitations: [
      "Citation बताता है कि statement कहाँ से आया; यह model की interpretation सही होने की guarantee नहीं है।",
      "Evaluation केवल तीन SEC filings पर है, इसलिए इसे हर filing type या research question का प्रमाण नहीं मानना चाहिए।",
    ],
    conclusion: "Sage तब उपयोगी है जब polished paragraph से ज़्यादा auditability मायने रखती है। Reader हर answer से सीधे source तक जा सकता है।",
    evidenceLabels: ["User-testing report", "Repository overview"],
  },
  glimpse: {
    kicker: "Multimodal fusion की नियंत्रित तुलना",
    question: "जब image encoder और language encoder को मिलकर visual question का जवाब देना हो, तो कौन-सा fusion design अपनी complexity के लायक है?",
    answer: "Glimpse आठ lightweight CLIP fusion heads की तुलना करता है, फिर बड़ा ViT–BERT co-attention model train करता है। Results के साथ मिले bugs भी दर्ज किए गए हैं।",
    implementation: [
      "Frozen CLIP features पर आठ fusion heads benchmark किए, ताकि तुलना केवल visual और text representations को जोड़ने के तरीके पर केंद्रित रहे।",
      "GeometryFusion बनाया, 657K-parameter head जो embeddings को केवल concatenate करने के बजाय similarity structure इस्तेमाल करता है।",
      "Soft-label, masking, pooling और tokenization समस्याएँ ठीक करते हुए end-to-end ViT-B/16 और BERT co-attention model train किया।",
    ],
    resultLabels: ["सबसे अच्छी frozen-CLIP validation accuracy", "ViT–BERT model का VQA soft score"],
    findings: [
      "GeometryFusion frozen-feature track में आगे रहा और focused fusion experiment के लिए छोटा भी था।",
      "बड़े co-attention model ने documented VQA soft score सुधारा, लेकिन data और masking bugs का असर भी बढ़ाया।",
      "सही soft targets और attention masks architecture choice जितने ही महत्त्वपूर्ण निकले।",
    ],
    limitations: [
      "63.3% accuracy और 67.6 soft score अलग experiment tracks से हैं; इन्हें एक ही metric की तरह compare नहीं करना चाहिए।",
      "ये documented runs के validation results हैं, state-of-the-art performance का दावा नहीं।",
    ],
    conclusion: "सोचा-समझा fusion head सरल combinations से बेहतर हो सकता है और फिर भी छोटा रह सकता है। लेकिन साफ़ labels और masks के बिना architecture comparison पर भरोसा नहीं किया जा सकता।",
    evidenceLabels: ["Experiment report", "Recorded results"],
  },
  paperscope: {
    kicker: "एक वास्तविक venue के अनुसार calibrated paper evaluation",
    question: "क्या AI paper evaluator किसी venue के historical standards सीखकर अधिक उपयोगी बन सकता है, बिना final review decision को input में leak किए?",
    answer: "PaperScope general evaluator की तुलना historical OpenReview evidence पर calibrated evaluator से करता है। Paper text और labels अलग रखकर rating और decision estimates मापे जाते हैं।",
    implementation: [
      "OpenReview से forum-level datasets बनाए और prediction के समय model inputs व final decisions अलग रखे।",
      "Examples के बीच accidental leakage घटाने के लिए अलग calibration और evaluation sets तथा hash checks इस्तेमाल किए।",
      "केवल convincing generated reviews पर भरोसा करने के बजाय rating error, decision accuracy और false accepts मापे।",
    ],
    resultLabels: ["descriptive ICLR pilots में rating MAE", "calibration के बाद decision accuracy", "recorded comparison में false accepts"],
    findings: [
      "Venue calibration ने ICLR pilot runs के तीनों recorded descriptive metrics सुधारे।",
      "सबसे बड़ा practical change कम false accepts था, tested setting में evaluator अधिक conservative हुआ।",
      "Leakage controls ज़रूरी थे, क्योंकि review outcome input तक पहुँच जाए तो अच्छा score बेकार है।",
    ],
    limitations: [
      "Pilot results descriptive हैं; उन्हें statistically significant report नहीं किया गया।",
      "Evidence अभी cross-venue नहीं है; दूसरे conferences या fields में behaviour अलग हो सकता है।",
      "System historical review behaviour estimate करता है। यह scientific quality तय नहीं करता और expert review की जगह नहीं लेता।",
    ],
    conclusion: "Historical calibration ने tested venue के साथ evaluator का alignment सुधारा, खासकर false accepts पर। दावा सीमित है: यह इन ICLR pilots में काम किया और इसे अभी broader validation चाहिए।",
    evidenceLabels: ["Evaluation report", "Repository overview"],
  },
} as const;
