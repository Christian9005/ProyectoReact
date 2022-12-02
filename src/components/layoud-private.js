import { Outlet } from "react-router-dom";
import { MDBContainer, 
    MDBCol, 
    MDBRow, 
    MDBCard, 
    MDBCardBody, 
    MDBCardHeader,
    MDBHeader
} from 'mdb-react-ui-kit';
import Footer from "./footer";
import NavbarPrivate from "./navbar-private";

const LayoutPrivate = () => {
    return (
        <>
            <MDBContainer fluid>
                <header>
                    <NavbarPrivate/>
                </header>
                <main>
                    <MDBRow>
                        <MDBCol>
                            <MDBCard>
                                <MDBCardHeader>
                                    <h3>Comercio Electronico Privado</h3>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <Outlet/>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </main>
                <Footer/>
            </MDBContainer >
        </>
    );
};

export default LayoutPrivate;