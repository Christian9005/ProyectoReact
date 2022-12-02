import { MarcaEdit } from "../pages/admin/marca-admin";


export default [
    {
        name: "Editar Marcas",
        key:"marcas-edit-admin",
        route: "/admin/marcas/:marcaId",
        component: <MarcaEdit/>,
        showLink:false
    }
];