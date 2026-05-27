# FraudShield - AI-Powered Fraud Detection Platform

FraudShield is a comprehensive fraud detection and risk management platform. It features an interactive real-time dashboard, 3D animations, and a machine learning backend to predict and visualize transaction risks.

## Repository Structure

```text
.
├── src/
│   ├── app.py              # Flask Backend (ML Model Server)
│   ├── main.tsx            # Frontend Entry Point
│   ├── components/         # React Components
│   ├── pages/              # Application Pages
│   └── utils/              # Prediction Logic and Helpers
├── public/                 # Static Assets
├── xgb_fraud_model1.pkl    # Trained XGBoost Model
├── p.ipynb                 # Data Analysis and Model Training Notebook
├── index.html              # Core HTML
├── package.json            # Node.js Dependencies
└── README.md               # Project Documentation
```

## Features

- **Real-time Fraud Prediction**: Integrated XGBoost model to evaluate transaction risk.
- **3D Hero Animation**: WebGL-powered floating cubes for an engaging user experience.
- **Interactive Dashboard**: Simulate transactions and visualize risk with dynamic charts (Risk Gauge, Trend Charts).
- **Responsive & Modern UI**: Built with React, Tailwind CSS, and Framer Motion.
- **Microservices Architecture**: Separate frontend (React/Vite) and backend (Python/Flask) for scalability.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- Git LFS (Large File Storage)

### 1. Clone the repository

```bash
git clone https://github.com/SanjeevJatwar/FraudShield.git
cd FraudShield
```

### 2. Set up the Backend (Python)

It is recommended to use a virtual environment.

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

Run the backend server:

```bash
python src/app.py
```
The server will start at `http://localhost:5000`.

### 3. Set up the Frontend (React)

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the application.

## Git Large File Storage (LFS)

This repository uses Git LFS to manage large files such as the trained model (`.pkl`) and notebooks (`.ipynb`). Ensure you have Git LFS installed and initialized:

```bash
git lfs install
git lfs pull
```

## License

MIT License. See [LICENSE](LICENSE) for more details.

