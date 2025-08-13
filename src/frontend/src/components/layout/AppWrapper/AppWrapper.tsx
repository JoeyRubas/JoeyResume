import {ReactNode} from "react";
import './styles.css';
import { showInstructions } from "../../../utilities/envUtils.ts";

interface Props {
    children: ReactNode;
}

export default function AppWrapper({ children }: Props) {
    return (
        <div data-testid='app_container' className={`app_container ${showInstructions && 'instructions'}`}>
            {children}
        </div>
    );
}
