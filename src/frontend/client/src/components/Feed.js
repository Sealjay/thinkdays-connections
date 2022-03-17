import {AcademicCapIcon, ThumbUpIcon, UserIcon, XCircleIcon} from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Feed({timeline}) {


    const renderSwitch = (event) => {
        switch (event) {
            case 'AcademicCapIcon':
                return <AcademicCapIcon className="h-5 w-5 text-white" aria-hidden="true"  />
            case 'ThumbUpIcon':
                return <ThumbUpIcon className="h-5 w-5 text-white" aria-hidden="true"  />
            case 'UserIcon':
                return <UserIcon className="h-5 w-5 text-white" aria-hidden="true" />
            case 'x-circle':
                return <XCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
            default:
                return null
            }
    }


    return (
        <div className="flow-root">
            <ul className="-mb-8 pl-2">
                {timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                        <div className="relative pb-8">
                            {eventIdx !== timeline.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-zinc-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                  <span
                      className={classNames(
                          event.bgcolor,
                          'h-7 w-7 rounded-full flex items-center justify-center ring-4 ring-zinc-200'
                      )}>
                  {renderSwitch(event.icon)}
                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 pr-1 flex justify-between space-x-4">
                                    <div>
                                        <p className="text-sm text-gray-100">
                                            {event.action}{' '}
                                            <a href={event.href} className="font-medium text-zinc-400">
                                                {event.target}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}