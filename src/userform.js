import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function UserForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [msg, setMsg] = useState("");

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setMsg(responseData.message);
        } catch (error) {
            console.error('Error:', error.message);
        }

        reset({
            email: "",
            name: "",
            query: ""
        });
    };

    useEffect(() => {
        fetch("http://127.0.0.1:5000/sessions", {
            method: "POST"
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
    }, []);
    
    return (
        <div>
            <h1>Query about Sheraspace !!!!!!!</h1>
            <p aria-label="success-msg">{msg}</p>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label>Email:</label>
                <input type="email" {...register('email', { required: true })} />
                {errors.email && <p>Email is required</p>}

                <label>Name:</label>
                <input type="text" {...register('name', { required: true })} />
                {errors.name && <p>Name is required</p>}

                <label>Query:</label>
                <textarea
                    rows={4}
                    cols={50}
                    {...register('query', { required: true })}
                />
                {errors.query && <p>Query is required</p>}

                <input type="submit" />
            </form>
        </div>
    );
}

export default UserForm;
