import { ReactNode } from 'react';
import './styles.css';

interface Props {
  children: ReactNode;
}

export default function AppWrapper({ children }: Props) {
  return (
    <div data-testid="app_container" className="app_container">
      {children}
    </div>
  );
}
