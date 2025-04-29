// evita de usuário não logado visualizar à página de criar ticket. redireciona o usuário não logado à página inicial

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const { user } = useSelector((state) => state.auth); // selecionará o usuário do "state auth" pelo redux e ver se está logado ou não
    useEffect(() => {
        if (user) {
            // checa se o usuário está logado
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
        setCheckingStatus(false);
    }, [user]); // iniciará quando o usuário mudar
    return { loggedIn, checkingStatus };
};
