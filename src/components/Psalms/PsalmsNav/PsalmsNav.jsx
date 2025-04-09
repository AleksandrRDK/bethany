import './PsalmsNav.sass';

const PsalmsNav = () => {
    return (
        <nav className="nav">
            <button className="nav__button">Псалмы</button>
            <button className="nav__button">История</button>
            <button className="nav__button">Избранное</button>
        </nav>
    )
}

export default PsalmsNav;