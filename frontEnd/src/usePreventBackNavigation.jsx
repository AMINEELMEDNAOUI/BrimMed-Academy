import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function usePreventBackNavigation() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      navigate('/', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
}

export default usePreventBackNavigation;
