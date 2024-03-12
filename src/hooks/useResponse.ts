import { destroyCookie } from 'nookies';
import { toast } from 'react-toastify';

const useResponse = () => {
  const showSuccessOnLogin = (username: any) => {
    toast.success(`Bem-vindo(a) ${username}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: false,
    });
  };

  const showSuccess = (successMessage: any) => {
    toast.success(successMessage, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: false,
    });
  };

  const showError = (errorMessage: any) => {
    toast.error(errorMessage, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const showNotFoundError = () => {
    toast.error('Ocorreu um erro!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const showUnauthorizedError = () => {
    toast.error('Não Autenticado!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

    destroyCookie(null, '@NEXTION_TOKEN', {
      path: '/auth/login',
    });
    if (!window.location.href.includes('auth')) {
      window.location.assign('/pt_BR/auth/login');
    }
  };

  return {
    showSuccessOnLogin,
    showSuccess,
    showError,
    showNotFoundError,
    showUnauthorizedError,
  };
};

export default useResponse;
