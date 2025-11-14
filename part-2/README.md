# FraudShield - AI-Powered Fraud Detection Platform

A production-ready fraud detection and risk management platform with an interactive demo dashboard, 3D animations, and real-time fraud prediction capabilities.

## Features

- **3D Hero Animation**: WebGL-powered floating cubes with graceful fallback
- **Interactive Demo Dashboard**: Simulate transactions and visualize fraud risk
- **Real-time Predictions**: Risk scoring with probability gauges and trend charts
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark Theme**: Professional color palette (deep navy, blue, magenta)
- **Solutions Pages**: Fraud Detection, Entity Risk, and Compliance modules
- **Risk Management Guide**: Visual playbook for fraud evaluation

## Pages

1. **Home**: 3D hero, value propositions, metrics, trusted brands
2. **Solutions**: Three solution cards with detailed "How It Works" timeline
3. **Risk Guide**: Step-by-step visual playbook and architecture diagram
4. **Login**: Glassmorphism design with animated gradient background
5. **Demo**: Interactive fraud prediction with charts and history table

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Customization

### Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --bg-primary: #0A0C23;
  --bg-panel: #0F1233;
  --text-primary: #F4F6FF;
  --cta-blue: #247BFF;
  --accent-magenta: #D74FFF;
  --border-subtle: rgba(255, 255, 255, 0.10);
}
```

### Logo

Replace `/public/logo.svg` and `/public/favicon.svg` with your brand assets.

## Backend Integration

The demo page includes a stubbed prediction function. To connect a real backend:

1. **Replace the prediction logic** in `src/utils/predictionLogic.ts`:

```typescript
export async function predictFraud(input: PredictionInput): Promise<PredictionResult> {
  const features = buildFeatures(input);

  const response = await fetch('/api/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(features)
  });

  const data = await response.json();

  return {
    label: data.label,
    probability: data.prob,
    timestamp: input.timestamp,
    amount: input.amount,
    failedLogins: input.failedLoginAttempts
  };
}
```

2. **Expected API response**:

```json
{
  "label": "Fraud",
  "prob": 0.87
}
```

3. **Example payload** (sent to `/api/predict`):

```json
{
  "amount": [250000],
  "oldbalanceOrg": [450000],
  "newbalanceOrig": [200000],
  "oldbalanceDest": [20000],
  "newbalanceDest": [270000],
  "isFlaggedFraud": [0],
  "type_encoded": [0],
  "origin_balance_change": [-250000],
  "dest_balance_change": [250000],
  "time_period_encoded": [12]
}
```

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** for blazing fast builds
- **Tailwind CSS** for styling
- **Three.js** for 3D animations
- **Chart.js** + **react-chartjs-2** for data visualization
- **Lucide React** for icons
- **Supabase** (ready for database integration)

## Accessibility

- Semantic HTML with proper landmarks
- Keyboard navigation support
- Focus states on interactive elements
- Sufficient color contrast ratios (WCAG AA compliant)

## Performance

- Lazy-loaded heavy sections
- Optimized 3D rendering with fallbacks
- Responsive images and assets
- Code splitting for optimal bundle size

## License

MIT License - Feel free to use for commercial projects.
