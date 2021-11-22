import { useRouter } from "next/router";
import React from "react";

type Props = {
    dataFromDatabase: string;
    path: string;
};

const Register: React.FC<Props> = ({ dataFromDatabase, path }) => {
    const routes = useRouter();
    console.log(routes);

    const dataFromQuery = routes.query.register;

    return (
        <>
            <h1>Register Data page</h1>
            {/* <h2>{dataFromQuery}</h2> */}
            <h2>{dataFromDatabase}</h2>
            <h2>{path}</h2>
        </>
    );
};

export async function getStaticPaths(context: any) {
    return {
        fallback: true,
        paths: [
            { params: { register: "Sushil" } },
            { params: { register: "sushil" } },
            { params: { register: "kumar" } },
            { params: { register: "Kumar" } },
            { params: { register: "singh" } },
            { params: { register: "Singh" } },
        ],
    };
}

export async function getStaticProps(context: any) {
    const route = context.params.register;
    console.log(route);

    return {
        props: {
            dataFromDatabase: "This is sushil kumar from database",
            path: route,
        },
        revalidate: 10,
    };
}

export default Register;
