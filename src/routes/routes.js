import ClientsAdmin from "../pages/admin/clients-admin";
import MarcaAdmin from "../pages/admin/marca-admin";
import ProductsAdmin from "../pages/admin/products-admin";

export default [
    {
        name: "Productos",
        key:"products",
        route: "/products",
        component: <ProductsAdmin/>,
        showLink:true
    },
    {
        name: "Clientes",
        key:"clients",
        route: "/clients",
        component: <ClientsAdmin/>,
        showLink:true
    },
    {
        name: "Marcas",
        key:"marcas",
        route: "/marcas",
        component: <MarcaAdmin/>,
        showLink:true
    }
];