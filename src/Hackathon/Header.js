import { Typography } from "@mui/material";
import Button from '@mui/material/Button';

const Header = ({ isLoggedIn, setIsLoggedIn, employeeId, logOutHandler }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: '12px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingBottom: '12px',
            background: '#7A8BFF',
            alignItems: 'center'
        }}>
            <div
                id="header-emp-id"
                style={{
                    fontSize: '20px',
                    fontWeight: '600'
                }}>{(isLoggedIn && employeeId) ? `EMPLOYEE NO : ${employeeId}` : ""}</div>

            <div>
                <div
                    id="header-hack-text"
                    style={{
                        fontSize: '20px',
                        fontWeight: '720'
                    }}>HACKATHON</div>
            </div>
            <div
                id="header-logout-text"
            >
                <Button variant="contained" onClick={() => logOutHandler()}>LOG OUT</Button>
            </div>
        </div>
    );
}

export default Header;