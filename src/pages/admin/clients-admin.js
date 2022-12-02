import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import clientHttp from "../../services/clientHttp";
import React from 'react';
import {MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter, } from 'mdb-react-ui-kit';

const ClientCreate=()=>{
    return <></>
}


export const ClientEdit=()=>{
    const [ client,setClient]=useState({});
    const { clientId } = useParams();
    const navegacion = useNavigate();

    
    const handleChange = (event) => {
            const target = event.target;
            const value = target.type === "checkbox" ? target.checked : target.value;
            const name = target.id;         
            setClient((clientCurrent)=>({...clientCurrent,[name]: value}));
    };

        
    const handleSubmit= (event) => {
        event.preventDefault();
        if (event.target.checkValidity() === true) {
            clientHttp.put(`/Cliente/?clienteId=${clientId}`,client)
                .then((response)=>{
                    navegacion(`/clients`)
                });
        }
    }

    const {nombreCompleto,cedula,correo,edad,direccion,numeroCelular} = client;

    return (
        <form className="row"  onSubmit={(e)=>handleSubmit(e)}>
            <div className="col-6">
                <label htmlFor="nombreCompleto" className="form-label">Nombre Completo</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="nombreCompleto"
                    value={nombreCompleto} onChange= {e => handleChange(e)}   required maxLength="50" />
                    <div className="invalid-feedback">
                        Nombre Obligatorio
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="cedula" className="form-label">Cedula</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="cedula"
                    value={cedula}  onChange= {e => handleChange(e)} required maxLength="10"  />
                    <div className="invalid-feedback">
                        Cedula Obligatoria
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="correo" className="form-label">Correo</label>
                <div className="input-group has-validation">
                    <input type="email" className="form-control" id="correo"
                    value={correo}
                    onChange= {e => handleChange(e)} required maxLength="40" />
                    <div className="invalid-feedback">
                        Correo Obligatorio
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="edad" className="form-label">Edad </label>
                <div className="input-group has-validation">
                    <input type="number" className="form-control" id="edad"  
                        value={edad}
                        onChange= {e => handleChange(e)}
                        required
                    />
                    <div className="invalid-feedback">
                        Edad Obligatoria
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="direccion" className="form-label">Direccion</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="direccion"  
                        value={direccion}
                        onChange= {e => handleChange(e)}
                        required
                    />
                <div className="invalid-feedback">
                    Direccion es requerido
                </div>
            </div>
            </div>

            <div className="col-6">
                <label htmlFor="numeroCelular" className="form-label">Numero Celular</label>
                <div className="input-group has-validation">
                    <input type="text" className="form-control" id="numeroCelular"
                    value={numeroCelular}  onChange= {e => handleChange(e)} required maxLength="10"  />
                    <div className="invalid-feedback">
                        Celular es Obligatorio
                    </div>
                </div>
            </div>

            <div className="col-12 mt-3">
                <button className="btn btn-danger" type="button" onClick={(e)=>navegacion(`/clients`)}>Cancelar</button>
                <button className="btn btn-dark" type="submit">Guardar</button>
                
            </div>
        </form> )
}


const ClientList=()=>{
    const [clients,setClients]=useState([]);
    const navegacion = useNavigate();
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [clientID, setClientID] = useState("");

    useEffect(()=>{
        clientHttp.get(`/Cliente`)
        .then((response)=>{
            setClients(response.data.lista); 
        });
    },[]);

    const handlerEditar=(clientId)=>{
        console.log(clientId);
        navegacion(`/admin/clients/${clientId}`)
    }

    const handlerEliminar=(clientId)=>{
        setBasicModal(!basicModal);
        setClientID(clientId);
    }

    const handlerConfirmarEliminar =(clientId)=>{
        clientHttp.delete(`/Cliente?clienteId=${clientId}`)
        .then((response)=>{
            console.log(response.data);
            
        });
        setBasicModal(!basicModal);
        navegacion(`/`);
    }

    return (<>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Confirmar Eliminacion </MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <div>
                            <h3>Id: {clients.filter(pro=>pro.id===clientID).map((pro)=>pro.id)}</h3>
                            <h3>Nombre Completo: {clients.filter(pro=>pro.id===clientID).map((pro)=>pro.nombreCompleto)}</h3>
                            <h3>Cedula: {clients.filter(pro=>pro.id===clientID).map((pro)=>pro.cedula)}</h3>
                            <h3>Correo: {clients.filter(pro=>pro.id===clientID).map((pro)=>pro.correo)}</h3>
                            <h3>Edad: {clients.filter(pro=>pro.id===clientID).map((pro)=>pro.edad)}</h3>
                            <h3>Direccion: {clients.filter(pro=>pro.id===clientID).map((pro)=>pro.dirrecion)}</h3>
                            <h3>Numero Celular: {clients.filter(pro=>pro.id===clientID).map((pro)=>pro.numeroCelular)}</h3>
                        </div>
                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn color='dark' onClick={toggleShow}>
                            Cerrar
                        </MDBBtn>
                        <MDBBtn color='danger' onClick={(e)=>handlerConfirmarEliminar(clients.filter(cli=>cli.id===clientID).map((cli)=>cli.id))}>
                            Eliminar
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    
    
    <MDBTable align="middle">
        <MDBTableHead dark>
        <tr>
            <th scope="col">Cedula</th>
            <th scope="col">Nombre Completo</th>
            <th scope="col">Correo</th>
            <th scope="col">Edad</th>
            <th scope="col">Direccion</th>
            <th scope="col">Numero Celular</th>
            <th scope="col">Acciones</th>
        </tr>
        </MDBTableHead>
        <MDBTableBody>
            {clients.map((cli)=>
                <tr key={cli.id}>
                    <td>{cli.cedula}</td>
                    <td>{cli.nombreCompleto}</td>
                    <td>{cli.correo}</td>
                    <td>{cli.edad}</td>
                    <td>{cli.direccion}</td>
                    <td>{cli.numeroCelular}</td>                    
                    <td>
                        <div>
                        <MDBBtn color="dark" rounded size="sm" onClick={(e)=>handlerEditar(cli.id)}>Editar
                        </MDBBtn>
                        </div>
                        <br/>
                        <div>
                        <MDBBtn color="danger" rounded size="sm" onClick={(e)=>handlerEliminar(cli.id)}>Eliminar
                        </MDBBtn>
                        </div>
                    </td>
                </tr>)} 
        </MDBTableBody>
    </MDBTable></>);
}


export default function ClientsAdmin(){
    return <ClientList />
}