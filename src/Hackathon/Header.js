import { Typography } from "@mui/material";
import Button from '@mui/material/Button';

const Header = ({ setIsLoggedIn }) => {
    return (
        <div>
            <div>
                employee no
            </div>
            <div>
                <Typography variant="poster">HACKATHON</Typography>
            </div>
            <div>
                <Button onClick={() => setIsLoggedIn(false)}>LOG OUT</Button>
            </div>
        </div>
    );
}

export default Header;