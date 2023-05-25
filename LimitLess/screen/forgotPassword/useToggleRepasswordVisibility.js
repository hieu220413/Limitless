import React, {useState} from 'react';

export const useToggleRepasswordVisibility = () => {
  const [repasswordVisibility, setRepasswordVisibility] = useState(true);
  const [rightIcon2, setRightIcon2] = useState('eye-outline');

  const handleRepasswordVisibility = () => {
    if (rightIcon2 === 'eye-outline') {
      setRightIcon2('eye-off-outline');
      setRepasswordVisibility(!repasswordVisibility);
    } else if (rightIcon2 === 'eye-off-outline') {
      setRightIcon2('eye-outline');
      setRepasswordVisibility(!repasswordVisibility);
    }
  };

  return {
    repasswordVisibility,
    rightIcon2,
    handleRepasswordVisibility,
  };
};
