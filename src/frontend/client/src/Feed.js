import { AcademicCapIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'

const timeline = [
    {
        id: 1,
        content: 'Learnt',
        target: 'Firecast',
        href: '#',
        icon: AcademicCapIcon,
        iconBackground: 'bg-gray-400',
    },
    {
        id: 2,
        content: 'Discovered',
        target: 'Big Box',
        href: '#',
        icon: ThumbUpIcon,
        iconBackground: 'bg-blue-500',
    },
    {
        id: 3,
        content: 'Discovered',
        target: 'Grow Plant',
        href: '#',
        icon: AcademicCapIcon,
        iconBackground: 'bg-green-500',
    },
    {
        id: 4,
        content: 'Ended',
        target: 'Prehistoric Period',
        href: '#',
        icon: ThumbUpIcon,
        iconBackground: 'bg-blue-500',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Feed() {
    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8 pl-2">
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
                          event.iconBackground,
                          'h-7 w-7 rounded-full flex items-center justify-center ring-4 ring-zinc-200'
                      )}
                  >
                    <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 pr-1 flex justify-between space-x-4">
                                    <div>
                                        <p className="text-sm text-gray-100">
                                            {event.content}{' '}
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