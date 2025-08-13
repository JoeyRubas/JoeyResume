import {ReactNode} from "react";
import './styles.css';

interface Props {
    children: ReactNode;
}

export default function MainWrapper({ children }: Props) {
    return (
        <main data-testid='main_section' className='main_section'>
            {children}
        </main>
    );
}
