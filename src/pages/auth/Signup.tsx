import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import EmailStep from '../../components/auth/EmailStep';
import SignupPasswordStep from '../../components/auth/SignUpPasswordStep';
import TeapotSVG from '../../components/auth/TeapotSVG';
import UsernameStep from '../../components/auth/UsernameStep';
import { useAuth } from '../../context/AuthContext';
import { registerUser, sendVerification } from '../../lib/auth';

type Step = 'landing' | 'email' | 'username' | 'password' | 'pending';

function LandingStep({ onContinue }: { onContinue: () => void }) {
  return (
    <>
      <TeapotSVG />
      <h1 className="mb-4 font-medium text-center text-xl">
        Create an account
      </h1>
      <button
        onClick={onContinue}
        className="bg-accent hover:bg-accent-hover transition-colors rounded-2xl w-full py-2 mb-3 text-sm font-medium cursor-pointer"
      >
        Continue using email
      </button>
      <div className="text-center text-muted text-xs">
        Have an account already?{' '}
        <Link to="/login" className="text-white underline text-xs">
          Login
        </Link>
      </div>
    </>
  );
}

export default function SignUp() {
  const [step, setStep] = useState<Step>('landing');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [visible, setVisible] = useState(true);
  const { setUser, setVerified, setApproved, setAdmin } = useAuth();
  const navigate = useNavigate();

  function goTo(next: Step, data?: { email?: string; username?: string }) {
    setVisible(false);
    setTimeout(() => {
      if (data?.email) setEmail(data.email);
      if (data?.username) setUsername(data.username);
      setStep(next);
      setVisible(true);
    }, 150);
  }

  async function handleRegister(password: string) {
    try {
      const data = await registerUser({ email, name: username, password });
      setUser(data);
      setAdmin(data.is_admin === true);
      setVerified(data.is_verified === true);
      setApproved(data.is_approved === true);
      await sendVerification();
      navigate('/');
    } catch (e: unknown) {
      throw e;
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`flex flex-col items-center w-64 transition-opacity duration-150 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {step === 'landing' && <LandingStep onContinue={() => goTo('email')} />}
        {step === 'email' && (
          <EmailStep
            onContinue={(e) => goTo('username', { email: e })}
            onBack={() => goTo('landing')}
          />
        )}
        {step === 'username' && (
          <UsernameStep
            onContinue={(u) => goTo('password', { username: u })}
            onBack={() => goTo('email')}
          />
        )}
        {step === 'password' && (
          <SignupPasswordStep
            email={email}
            onSubmit={handleRegister}
            onBack={() => goTo('username')}
          />
        )}
      </div>
    </div>
  );
}
