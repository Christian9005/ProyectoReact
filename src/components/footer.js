import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter className='bg-dark text-center text-white'>
            <MDBContainer className='p-4 pb-0'>
                <section className='mb-4'>
                    <MDBBtn outline color="light" floating size='lg' className='m-1' href='https://www.facebook.com/christian.albarracin.3' role='button'>
                        <MDBIcon fab icon='facebook-f' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating size='lg' className='m-1' href='https://twitter.com/christianalbar2' role='button'>
                        <MDBIcon fab icon='twitter' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating size='lg' className='m-1' href='https://www.instagram.com/christian__alexander__/' role='button'>
                        <MDBIcon fab icon='instagram' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating size='lg' className='m-1' href='https://www.linkedin.com/in/christian-albarracin-b66731130/' role='button'>
                        <MDBIcon fab icon='linkedin-in' />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating size='lg' className='m-1' href='https://github.com/Christian9005' role='button'>
                        <MDBIcon fab icon='github' />
                    </MDBBtn>
                </section>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <a className='text-white' href='https://api.whatsapp.com/send?phone=593960067606&text=Me%20interesa%20contratar%20sus%20servicios'>
                    Contacto: Christian Albarracín
                </a>
            </div>
        </MDBFooter>
    );
}

