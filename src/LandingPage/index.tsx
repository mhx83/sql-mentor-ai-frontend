import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div>
            <h1>Zinan Zhang, Minghong Xia, Zixuan Yin</h1>
            <h2>CS 5610 Section 01</h2>
            <ul>
                <li><Link to="/Labs">Labs</Link></li>
                <li><Link to="/Kanbas">Kanbas</Link></li>
                <li><Link id="wd-github" to="https://github.com/mhx83/react-project">Github</Link></li>
            </ul>
        </div>
    );
}