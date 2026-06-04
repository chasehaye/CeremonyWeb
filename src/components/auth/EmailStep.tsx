import { useState } from 'react';

function EmailStep({
  onContinue,
  onBack,
}: {
  onContinue: (email: string) => void;
  onBack: () => void;
}) {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (
    <>
      <h1 className="text-center font-medium text-xl mb-2">
        What's your email <br /> address?
      </h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) =>
          e.key === 'Enter' && isValidEmail(email) && onContinue(email)
        }
        placeholder="you@example.com"
        autoFocus
        onBlur={() => setTouched(true)}
        className="w-full bg-transparent rounded-lg border border-muted focus:border-accent-bright outline-none py-2 px-2 mb-4 text-sm transition-colors duration-500"
      />
      <button
        onClick={() => isValidEmail(email) && onContinue(email)}
        className="bg-accent hover:bg-accent-hover transition-colors rounded-2xl w-full py-2 text-sm font-medium cursor-pointer"
      >
        Continue
      </button>
      <span
        onClick={() => onBack()}
        className="text-muted text-xs cursor-pointer hover:text-white transition-colors my-2"
      >
        Back
      </span>
      <p className="text-xs text-error h-4">
        {touched && !isValidEmail(email)
          ? 'Please enter a valid email address'
          : ''}
      </p>
    </>
  );
}

export default EmailStep;
