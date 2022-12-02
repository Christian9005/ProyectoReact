import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientHttp from "../../services/clientHttp";
import React from 'react';
import {
    MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

export const MarcaEdit = () => {
    const [marca,setMarca]=useState({});
    const { marcaId } = useParams();

    const navegacion = useNavigate();

    const handleChange = (event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.id;
        setMarca((marcaCurrent)=>({...marcaCurrent,[name]:value}))
    }

    const handleSummit=(event)=>{
        event.preventDefault();
        if(event.target.checkValidity()==true)
        {
            clientHttp.put(`/Marca/?marcaid=${marcaId}`,marca)
            .then((response)=>{
                navegacion(`/marcas`)
            })
        }
    }

    const {nombre}=marca;
    return(
        <form className="row" onSubmit={(e)=>handleSummit(e)}>
            <div className="col-6">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <div className="input-group has-validation">
                <input type="text" className="form-control" id="nombre"
                        value={nombre} onChange={(e)=>handleChange(e)} 
                        required 
                        maxLength="20"
                ></input>
                    <div className="invalid-feedback">
                        Nombre Obligatorio
                    </div>
                </div>
            </div>
            <div className="col-12 mt-3">
                <button className="btn btn-danger" type="button" onClick={(e)=>navegacion(`/marcas`)}>Cancelar</button>
                <button className="btn btn-dark" type="submit">Guardar</button>
            </div>
        </form>
    )
}

const MarcaList = () => {

    const [marcas, setMarcas] = useState([]);
    const navegacion = useNavigate();
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [marcaID, setMarcaID] = useState("");
    
    useEffect(() => {
        clientHttp.get(`/Marca`)
            .then((response) => {
                setMarcas(response.data);
            });
    }, []);

    const handlerEditar = (marcaId) => {
        console.log(marcaId);
        navegacion(`/admin/marcas/${marcaId}`)
    }

    const handlerEliminar = (marcaId) => {
        setBasicModal(!basicModal);
        setMarcaID(marcaId);
    }

    const handlerConfirmarEliminar =(marcaId)=>{
        clientHttp.delete(`/Marca?marcaId=${marcaId}`)
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
                            <h3>Id: {marcas.filter(mar=>mar.id===marcaID).map((mar)=>mar.id)}</h3>
                            <h3>Nombre: {marcas.filter(mar=>mar.id===marcaID).map((mar)=>mar.nombre)}</h3>
                        </div>
                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn color='secundary' onClick={toggleShow}>
                            Cerrar
                        </MDBBtn>
                        <MDBBtn color='danger' onClick={(e)=>handlerConfirmarEliminar(marcas.filter(mar=>mar.id===marcaID).map((mar)=>mar.id))}>
                            Eliminar
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>

    <MDBTable align="middle">
        <MDBTableHead dark>
            <tr>
                <th scope="col">Marca Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Acciones</th>
            </tr>
        </MDBTableHead>
        <MDBTableBody>
            {marcas.map((mar) =>
                <tr key={mar.id}>
                    <td>{mar.id}</td>
                    <td>{mar.nombre}</td>
                    <td>
                        <div>
                            <MDBBtn color="dark" rounded size="sm" onClick={(e)=>handlerEditar(mar.id)}>Editar
                            </MDBBtn>
                        </div>
                        <br />
                        <div>
                            <MDBBtn color="danger" rounded size="sm" onClick={(e)=>handlerEliminar(mar.id)} >Eliminar
                            </MDBBtn>
                        </div>
                    </td>
                </tr>)}
        </MDBTableBody>
    </MDBTable>
    </>)
}

export default function MarcaAdmin() {
    return <MarcaList />
}