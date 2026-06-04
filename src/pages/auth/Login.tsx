import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import EmailStep from '../../components/auth/EmailStep';
import PasswordStep from '../../components/auth/PasswordStep';
import TeapotSVG from '../../components/auth/TeapotSVG';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../lib/auth';

type Step = 'landing' | 'email' | 'password';

function LandingStep({ onContinue }: { onContinue: () => void }) {
  return (
    <>
      <TeapotSVG />
      <h1 className="mb-4 font-medium text-xl">Log in to Ceremony</h1>
      <button
        onClick={onContinue}
        className="bg-accent hover:bg-accent-hover transition-colors rounded-2xl w-full py-2 mb-3 text-sm font-medium cursor-pointer"
      >
        Continue using email
      </button>
      <div className="text-center text-muted text-xs">
        Don't have an account?{' '}
        <Link to="/signup" className="text-white underline text-xs">
          Sign up
        </Link>
      </div>
    </>
  );
}

export default function Login() {
  const [step, setStep] = useState<Step>('landing');
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const { setUser, setAdmin, setVerified, setApproved } = useAuth();

  function goTo(next: Step, savedEmail?: string) {
    setVisible(false);
    setTimeout(() => {
      if (savedEmail) setEmail(savedEmail);
      setStep(next);
      setVisible(true);
    }, 150);
  }

  async function handleLogin(password: string) {
    const data = await loginUser({ email, password });
    setUser(data);
    setAdmin(data.is_admin === true);
    setVerified(data.is_verified === true);
    setApproved(data.is_approved === true);
    navigate('/');
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`flex flex-col items-center w-64 transition-opacity duration-150 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {step === 'landing' && <LandingStep onContinue={() => goTo('email')} />}
        {step === 'email' && (
          <EmailStep
            onContinue={(e) => goTo('password', e)}
            onBack={() => goTo('landing')}
          />
        )}
        {step === 'password' && (
          <PasswordStep
            email={email}
            onSubmit={handleLogin}
            onBack={() => goTo('email')}
          />
        )}
      </div>
    </div>
  );
}
