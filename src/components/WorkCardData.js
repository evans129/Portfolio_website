import finalYearProject from "../assets/projects/final-year-project.jpg";
import faceAnalyzer from "../assets/projects/face-analyzer.jpg";
import minorProject from "../assets/projects/minor-project.jpg";
import faceMaskDetector from "../assets/projects/face-mask-detector.jpg";
import sleepinessChecker from "../assets/projects/sleepiness-checker.jpg";
import faceRecognition from "../assets/projects/face-recognition.jpg";
import snakeGame from "../assets/projects/snake-game.jpg";
import calculator from "../assets/projects/calculator.jpg";
import diabetesPredictor from "../assets/projects/diabetes-predictor.jpg";
import faceEmotionRecognizer from "../assets/projects/face-emotion-recognizer.jpg";

const ProjectCardData = [
  {
    imgsrc: finalYearProject,
    title: "Final Year Project",
    text: "Face analysis platform with a React front end, deep-learning models built with TensorFlow and Keras, and email delivery of results through EmailJS and Yagmail.",
    tags: ["React", "TensorFlow", "Keras", "Streamlit"],
    view: "https://evans129.github.io/Final-Year-Project/",
    source: "https://github.com/evans129/Final-Year-Project",
    featured: true,
  },
  {
    imgsrc: faceAnalyzer,
    title: "Face Analyzer",
    text: "Analyzes a face from a camera capture or uploaded image using transfer-learning models, with a downloadable report and an option to email the analysis.",
    tags: ["TensorFlow", "Transfer learning", "Streamlit"],
    view: "https://evans129-faceanalyzer-app-y9i2zf.streamlit.app/",
    source: "https://github.com/evans129/FaceAnalyzer",
    featured: true,
  },
  {
    imgsrc: minorProject,
    title: "Minor Project",
    text: "Machine learning models for iris species classification, diamond price prediction, and diabetes prediction behind a single web front end.",
    tags: ["Python", "scikit-learn", "Streamlit"],
    view: "https://evans129.github.io/Minor-Project/project_frontpage.html",
    source: "https://github.com/evans129/Minor-Project",
    featured: true,
  },
  {
    imgsrc: faceMaskDetector,
    title: "Face Mask Detector",
    text: "CNN trained on a public Kaggle face-mask dataset with TensorFlow and OpenCV, served as a Streamlit web app.",
    tags: ["TensorFlow", "OpenCV", "CNN"],
    view: "https://evans129-face-mask-detector-app-86yp6y.streamlit.app/",
    source: "https://github.com/evans129/Face_Mask_detector",
  },
  {
    imgsrc: sleepinessChecker,
    title: "Sleepiness Checker",
    text: "Classifies whether a person looks sleepy from a camera capture using a TensorFlow model and OpenCV, deployed with Streamlit.",
    tags: ["TensorFlow", "OpenCV", "Streamlit"],
    view: "https://evans129-sleepiness-checker-app-yjvqpa.streamlit.app/",
    source: "https://github.com/evans129/Sleepiness_checker",
  },
  {
    imgsrc: faceRecognition,
    title: "Face Recognition",
    text: "Detects and recognizes faces in uploaded images with OpenCV, deployed with Streamlit.",
    tags: ["OpenCV", "Python", "Streamlit"],
    view: "https://evans129-face-detector-and-recognizer-app-i8c410.streamlit.app/",
    source: "https://github.com/evans129/Face-Detector-and-Recognizer",
  },
  {
    imgsrc: faceEmotionRecognizer,
    title: "Face Emotion Recognizer",
    text: "Recognizes facial emotions in uploaded images using OpenCV and TensorFlow, deployed with Streamlit.",
    tags: ["TensorFlow", "OpenCV", "Streamlit"],
    view: "https://evans129-face-emotion-recognizer-app-h5itr9.streamlit.app/",
    source: "https://github.com/evans129/Face-Emotion-Recognizer",
  },
  {
    imgsrc: diabetesPredictor,
    title: "Diabetes Predictor",
    text: "Predicts diabetes risk from clinical inputs with a support vector machine (SVM) model, deployed with Streamlit.",
    tags: ["scikit-learn", "SVM", "Streamlit"],
    view: "https://evans129-diabetes-predictor-stream-diabetes-predictor-ui-rs31at.streamlit.app/",
    source: "https://github.com/evans129/Diabetes_predictor_streamlit_ui",
  },
  {
    imgsrc: snakeGame,
    title: "Snake Game",
    text: "Classic snake game with score and high-score tracking, built with vanilla JavaScript.",
    tags: ["JavaScript", "HTML", "CSS"],
    view: "https://evans129.github.io/Snake-Game/",
    source: "https://github.com/evans129/Snake-Game",
  },
  {
    imgsrc: calculator,
    title: "Calculator",
    text: "Responsive calculator built with HTML, CSS, and JavaScript.",
    tags: ["JavaScript", "HTML", "CSS"],
    view: "https://evans129.github.io/calculator_using_html_css_js/cal.html",
    source: "https://github.com/evans129/calculator_using_html_css_js",
  },
];

export default ProjectCardData;
