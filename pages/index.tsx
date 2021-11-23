import { MongoClient } from "mongodb";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import About from "./about/about";

type Props = {
    dataFromDatabase: string;
    data: [];
};

let body = {
    name: "Patel",
    dec: "name is Patel kumar",
};

const Home: React.FC<Props> = ({ dataFromDatabase, data }) => {
    console.log(data);

    async function clickHendler() {
        const response = await fetch("/api/userdata", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        console.log(data);
        console.log(data.length);
    }

    return (
        <>
            <h1>Home Page</h1>
            <About />
            <p>{dataFromDatabase}</p>
            <button onClick={clickHendler}>Add User</button>

            {data.map((datas: any, index: number) => (
                <div key={index}>
                    <h2>{index + 1}</h2>
                    <h3>{datas.name}</h3>
                    <h4>{datas.desc}</h4>
                </div>
            ))}
            {data.length}
        </>
    );
};

// export async function getServerSideProps(context: any) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             dataFromDatabase: "This is sushil kumar from database",
//         },
//     };
// }

export async function getStaticProps(context: any) {
    const route = context.params;
    // console.log(route);

    const client = await MongoClient.connect(
        "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/testnext?retryWrites=true&w=majority"
    );

    const db = client.db();
    const collection = db.collection("user");

    const dataFromServer = await collection.find().toArray();

    client.close();

    return {
        props: {
            dataFromDatabase: "This is sushil kumar from database",
            data: dataFromServer.map((data) => ({
                name: data.data.name,
                desc: data.data.dec,
                id: data._id.toString(),
            })),
        },
        revalidate: 1,
    };
}

export default Home;
