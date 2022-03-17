import {useAppContext} from "../utils/AppContextProvider";
import {CONNECTION_STATE} from "../utils/WebSocket";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ConnectionState() {
    const {state, dispatch} = useAppContext();
    let currentState = state.connectionState;
    let bgClassName, textClassName, buttonClassName, displayText;
    if (currentState === CONNECTION_STATE.CONNECTED) {
        bgClassName = 'bg-green-100';
        textClassName = 'text-green-800';
        buttonClassName='text-green-400';
        displayText= 'Connected';
    } else if (currentState === CONNECTION_STATE.DISCONNECTED) {
        bgClassName = 'bg-red-100';
        textClassName = 'text-red-800';
        buttonClassName='text-red-400';
        displayText= 'Disconnected';
    }
    return (
        <>
            <span className={classNames(
                bgClassName,
                textClassName,
                'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium'
            )}>
        <svg className={classNames('-ml-1 mr-1.5 h-2 w-2',buttonClassName)} fill="currentColor" viewBox="0 0 8 8">
          <circle cx={4} cy={4} r={3} />
        </svg>
                {displayText}
      </span>
        </>
    )
}