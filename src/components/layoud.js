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
import Navbar from "./navbar";

const Layout = () => {
    return (
        <>
            <MDBContainer fluid>
                <header>
                    <Navbar/>
                </header>
                <main>
                    <MDBRow>
                        <MDBCol>
                            <MDBCard>
                                <MDBCardHeader>
                                    <h3>Comercio Electronico</h3>
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

export default Layout;