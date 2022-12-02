import { ClientEdit } from "../pages/admin/clients-admin";
import { MarcaEdit } from "../pages/admin/marca-admin";
import { ProductEdit } from "../pages/admin/products-admin";


export default [
    {
        name: "Editar Marcas",
        key:"marcas-edit-admin",
        route: "/admin/marcas/:marcaId",
        component: <MarcaEdit/>,
        showLink:false
    },
    {
        name: "Editar Productos",
        key:"products-edit-admin",
        route: "/admin/products/:productId",
        component: <ProductEdit/>,
        showLink:false
    },
    {
        name: "Editar Clientes",
        key:"clients-edit-admin",
        route: "/admin/clients/:clientId",
        component: <ClientEdit/>,
        showLink:false
    }
];