import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handleStep = (e) => {
    const id = e.target.id;

    if (id === 'next-btn' && step < 3) setStep((s) => s + 1);
    else if (id === 'previous-btn' && step > 1) setStep((s) => s - 1);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="close">
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 && 'active'}>1</div>
            <div className={step >= 2 && 'active'}>2</div>
            <div className={step >= 3 && 'active'}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              id="previous-btn"
              onClick={handleStep}
              style={{ backgroundColor: '#7250f2', color: '#fff' }}>
              Previous
            </button>
            <button
              id="next-btn"
              onClick={handleStep}
              style={{ backgroundColor: '#7250f2', color: '#fff' }}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
