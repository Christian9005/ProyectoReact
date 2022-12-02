import routes from '../routes/routes';
import { Link } from "react-router-dom";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useState } from 'react';

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);

    return (
        <MDBNavbar expand='lg' dark bgColor='dark'>
            <MDBContainer fluid>
                <MDBNavbarBrand href="/">
                    Proyecto React
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type="button"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setShowNav(!showNav)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showNav}>
                    <MDBNavbarNav>

                        {routes.map((route) => <MDBNavbarItem key={route.key}>
                            <Link to={route.route} className="nav-link"> {route.name}</Link>
                        </MDBNavbarItem>)}

                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Navbar;