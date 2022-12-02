import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import clientHttp from "../../services/clientHttp";
import React from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,} from 'mdb-react-ui-kit';

export const ProductEdit = () => {
    const [product,setProduct]=useState({});
    const { productId } = useParams();
    const [marca, setMarca] = useState([]);
    const [tipoProducto, setTipoProducto] = useState([]);
    const navegacion = useNavigate();

    useEffect(()=>{
        clientHttp.get(`/Marca`)
            .then((response)=>{
                setMarca(response.data);
            });
    },[]);

    useEffect(()=>{
        clientHttp.get(`/TipoProducto`)
        .then((response)=>{
            setTipoProducto(response.data); 
        });
    },[]);


    const handleChange = (event)=>{
        const target = event.target;
        const value = target.value=== "checkbox" ? target.checked : target.value;
        const name = target.id;
        setProduct((productCurrent)=>({...productCurrent,[name]:value}))
    }

    const handleSummit=(event)=>{
        event.preventDefault();
        if(event.target.checkValidity()==true)
        {
            clientHttp.put(`/Producto/?id=${productId}`,product)
            .then((response)=>{
                navegacion(`/products`)
            })
        }
    }

    const {nombre, precio, observaciones, caducidad, marcaId, tipoProductoId}=product;
    return(
        <form className="row" onSubmit={(e)=>handleSummit(e)}>
            <div className="col-6">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <div className="input-group has-validation">
                <input type="text" className="form-control" id="nombre"
                        value={nombre} onChange={(e)=>handleChange(e)} 
                        required 
                        maxLength="40"
                ></input>
                    <div className="invalid-feedback">
                        Nombre Obligatorio
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="precio" className="form-label">Precio</label>
                <div className="input-group has-validation">
                <input type="number" className="form-control" id="precio"
                        value={precio} onChange={(e)=>handleChange(e)} 
                        required 
                ></input>
                    <div className="invalid-feedback">
                        Precio Obligatorio
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="observaciones" className="form-label">Observaciones</label>
                <div className="input-group has-validation">
                <input type="text" className="form-control" id="observaciones"
                        value={observaciones} onChange={(e)=>handleChange(e)} 
                        required 
                        maxLength="150"
                ></input>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="caducidad" className="form-label">Caducidad</label>
                <div className="input-group has-validation">
                <input type="date" className="form-control" id="caducidad"
                        value={caducidad} onChange={(e)=>handleChange(e)} 
                        required 
                ></input>
                    <div className="invalid-feedback">
                        Caducidad Obligatoria
                    </div>
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="marcaId" className="form-label">Marca</label>
                <select className="form-select" id="marcaId" value={marcaId} required 
                    onChange= {e => handleChange(e)}>
                    <option disabled value="">Seleccionar Marca</option>
                    { marca.map((mar)=><option key={mar.id} value={mar.id} >{mar.nombre}</option>) } 
                </select>
                <div className="invalid-feedback">
                    Marca requerida
                </div>
            </div>

            <div className="col-6">
                <label htmlFor="tipoProductoId" className="form-label">Tipo Producto</label>
                <select className="form-select" id="tipoProductoId" value={tipoProductoId} required 
                    onChange= {e => handleChange(e)}>
                    <option disabled value="">Seleccionar Tipo Producto</option>
                    { tipoProducto.map((tip)=><option key={tip.id} value={tip.id} >{tip.nombre}</option>) } 
                </select>
                <div className="invalid-feedback">
                    Tipo Producto requerido
                </div>
            </div>

            <div className="col-12 mt-3">
                <button className="btn btn-danger" type="button" onClick={(e)=>navegacion(`/products`)}>Cancelar</button>
                <button className="btn btn-dark" type="submit">Guardar</button>
            </div>
        </form>
    )
}

const ProductsList=()=>{

    const [products,setProducts]=useState([]);
    const navegacion = useNavigate();
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [productID, setProductID] = useState("");

    useEffect(()=>{
        clientHttp.get(`/Producto`)
        .then((response)=>{
            setProducts(response.data.lista); 
        });
    },[]);

    const handlerEditar=(productId)=>{
        console.log(productId);
        navegacion(`/admin/products/${productId}`)
    }

    const handlerEliminar=(productId)=>{
        setBasicModal(!basicModal);
        setProductID(productId);
    }

    const handlerConfirmarEliminar =(productId)=>{
        clientHttp.delete(`/Producto?id=${productId}`)
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
                            <h3>Id: {products.filter(pro=>pro.id===productID).map((pro)=>pro.id)}</h3>
                            <h3>Nombre: {products.filter(pro=>pro.id===productID).map((pro)=>pro.nombre)}</h3>
                            <h3>Precio: {products.filter(pro=>pro.id===productID).map((pro)=>pro.precio)}</h3>
                            <h3>Observaciones: {products.filter(pro=>pro.id===productID).map((pro)=>pro.observaciones)}</h3>
                            <h3>Caducidad: {products.filter(pro=>pro.id===productID).map((pro)=>pro.caducidad)}</h3>
                            <h3>Marca: {products.filter(pro=>pro.id===productID).map((pro)=>pro.marca)}</h3>
                            <h3>Tipo Producto: {products.filter(pro=>pro.id===productID).map((pro)=>pro.tipoProducto)}</h3>
                        </div>
                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn color='dark' onClick={toggleShow}>
                            Cerrar
                        </MDBBtn>
                        <MDBBtn color='danger' onClick={(e)=>handlerConfirmarEliminar(products.filter(pro=>pro.id===productID).map((pro)=>pro.id))}>
                            Eliminar
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    
    
    <MDBTable align="middle">
        <MDBTableHead dark>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Observaciones</th>
            <th scope="col">Caducidad</th>
            <th scope="col">Marca</th>
            <th scope="col">Tipo Producto</th>
            <th scope="col">Acciones</th>
        </tr>
        </MDBTableHead>
        <MDBTableBody>
            {products.map((pro)=>
                <tr key={pro.id}>
                    <td>{pro.nombre}</td>
                    <td>{pro.precio}</td>
                    <td>{pro.observaciones}</td>
                    <td>{pro.caducidad}</td>
                    <td>
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pro.marca}</p>
                        <p className='text-muted mb-0'>Id: {pro.marcaId}</p>
                    </div>
                    </td>    
                    <td>
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>{pro.tipoProducto}</p>
                        <p className='text-muted mb-0'>Id: {pro.tipoProductoId}</p>
                    </div>    
                    </td>
                    <td>
                    <div>
                        <MDBBtn color="dark" rounded size="sm" onClick={(e)=>handlerEditar(pro.id)}>Editar
                        </MDBBtn>
                        </div>
                        <br/>
                        <div>
                        <MDBBtn color="danger" rounded size="sm" onClick={(e)=>handlerEliminar(pro.id)}>Eliminar
                        </MDBBtn>
                        </div>
                    </td>
                </tr>)} 
        </MDBTableBody>
    </MDBTable></>)
}

export default function ProductsAdmin(){
    return <ProductsList/>
}