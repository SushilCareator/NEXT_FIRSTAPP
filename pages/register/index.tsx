import React from "react";
import Link from "next/link";

type Props = {};

let body = {
    name: "sushil",
    dec: "name is sushil kumar",
};

const RegisterMain: React.FC<Props> = ({}) => {
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
    }

    return (
        <>
            <h1>Register Main page</h1>
            <a href="/register/hello">Register Button with Refresh</a>
            <br />
            <Link href="/register/sushil">Register Button without Refresh</Link>
            <button onClick={clickHendler}>Add User</button>
        </>
    );
};

export default RegisterMain;
