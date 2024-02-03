
export default function Header({className}:{className:string}) {
  return (
    <div className={`${className} flex h-11`}>
        <button>Upgrade to Premium</button>
        <ul className="flex">
            <li>
                <img src="/logo.png" alt="coin"/>
            <span>1800</span>
            </li>
            <li>
                <img src="/logo.png" alt="profile"/>
            </li>
        </ul>
    </div>
  )
}
