import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import clientHttp from "../../services/clientHttp";
import React from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


const ProductsList=()=>{

    const [products,setProducts]=useState([]);

    //const navegacion = useNavigate();

    useEffect(()=>{
        clientHttp.get(`/Producto`)
        .then((response)=>{
            //console.log(response);
            setProducts(response.data.lista); 
        });
    },[]);

    const handlerEditar=(product)=>{
        console.log(product);
        // navegacion(`/admin/clients/${client.id}`)
    }

    const handlerEliminar=(product)=>{
        console.log(product);
        // navegacion(`/admin/clients/${client.id}`)
    }

    return (<MDBTable align="middle">
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
                        <MDBBtn color="dark" rounded size="sm" onClick={(e)=>handlerEditar(pro)}>Editar
                        </MDBBtn>
                        </div>
                        <br/>
                        <div>
                        <MDBBtn color="danger" rounded size="sm" onClick={(e)=>handlerEliminar(pro)}>Eliminar
                        </MDBBtn>
                        </div>
                    </td>
                </tr>)} 
        </MDBTableBody>
    </MDBTable>)
}

export default function ProductsAdmin(){
    return <ProductsList/>
}