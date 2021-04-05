import React from 'react';
import { RoundedButton } from 'styles/Button';

interface IconButtonProps {
  icon: string;
  altText: string;
  handleClick: () => void;
}
export default function IconButton({
  handleClick,
  altText,
  icon,
}: IconButtonProps) {
  return (
    <RoundedButton onClick={handleClick} title={altText}>
      {icon}
    </RoundedButton>
  );
}
