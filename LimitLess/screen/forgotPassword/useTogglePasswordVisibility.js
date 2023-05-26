import React, {useState} from 'react';

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon1, setRightIcon1] = useState('eye-outline');

  const handlePasswordVisibility = () => {
    if (rightIcon1 === 'eye-outline') {
      setRightIcon1('eye-off-outline');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon1 === 'eye-off-outline') {
      setRightIcon1('eye-outline');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon1,
    handlePasswordVisibility,
  };
};
