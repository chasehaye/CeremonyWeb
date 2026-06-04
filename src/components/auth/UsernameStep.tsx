import { useState } from 'react';

function UsernameStep({
  onContinue,
  onBack,
}: {
  onContinue: (username: string) => void;
  onBack: () => void;
}) {
  const [username, setUsername] = useState('');

  return (
    <>
      <h1 className="text-center font-medium text-xl mb-2">
        What's your <br /> username?
      </h1>
      <input
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onContinue(username)}
        placeholder="(Optional)"
        autoFocus
        className="w-full bg-transparent rounded-lg border border-muted focus:border-accent-bright outline-none py-2 px-2 mb-4 text-sm transition-colors duration-500"
      />
      <button
        onClick={() => username && onContinue(username)}
        className="bg-accent hover:bg-accent-hover transition-colors rounded-2xl w-full py-2 text-sm font-medium cursor-pointer"
      >
        {username ? 'Continue' : 'Skip'}
      </button>
      <span
        onClick={() => onBack()}
        className="text-muted text-xs cursor-pointer hover:text-white transition-colors my-2"
      >
        Back
      </span>
    </>
  );
}

export default UsernameStep;
