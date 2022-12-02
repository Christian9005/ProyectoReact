import routesPrivate from '../routes/routesPrivate';
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

const NavbarPrivate = () => {
    const [showNav, setShowNav] = useState(false);

    return (
        <MDBNavbar expand='lg' dark bgColor='dark'>
            <MDBContainer fluid>
                <MDBNavbarBrand href="/admin">
                    Administracion
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
                        {routesPrivate.filter((route) =>route.showLink===true).map((route)=> <MDBNavbarItem key={route.key}>
                            <Link to={route.route} className="nav-link"> {route.name}</Link>
                        </MDBNavbarItem>)}

                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default NavbarPrivate;
