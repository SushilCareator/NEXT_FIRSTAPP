import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

type Props = {};

let body = {
    name: "sushil",
    dec: "name is sushil kumar",
};

const RegisterMain: React.FC<Props> = ({}) => {
    const routes = useRouter();

    const [name, setName] = useState("");
    const [dec, setDec] = useState("");

    async function clickHendler() {
        const response = await fetch("/api/userdata", {
            method: "POST",
            body: JSON.stringify({ name: name, dec: dec }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        routes.push("/");

        console.log(data);
    }

    return (
        <>
            <h1>Register Main page</h1>
            {/* <a href="/register/hello">Register Button with Refresh</a> */}
            <br />
            <Link href="/register/sushil">Register Button without Refresh</Link>
            <form action="">
                <input
                    type="text"
                    onChange={(e) => {
                        console.log(e.target.value);
                        setName(e.target.value);
                    }}
                />
                <input
                    type="text"
                    onChange={(e) => {
                        console.log(e.target.value);
                        setDec(e.target.value);
                    }}
                />
            </form>
            <button onClick={clickHendler}>Add User</button>
        </>
    );
};

export default RegisterMain;
