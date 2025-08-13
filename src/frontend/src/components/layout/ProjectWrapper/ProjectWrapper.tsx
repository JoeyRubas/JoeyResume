import {ReactNode} from "react";
import './styles.css';

interface Props {
    children: ReactNode;
}

export default function ProjectWrapper({ children }: Props) {
    return (
        <div data-testid='project_container' className='project_container'>
            {children}
        </div>
    );
}
