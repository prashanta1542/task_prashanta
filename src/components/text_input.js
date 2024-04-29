import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "./navbar";
function TextInput() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [msg, setMsg] = useState("");
    const navbar=[
        {
            path: '/',
            navitem:"FAQ's"
        },
        {
            path: '/login',
            navitem:"Login"
        },
        {
            path: '/contact',
            navitem:"Contact"
        },
    ]
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
        <>
            <section className="text-gray-600 body-font relative">
                <Navbar props={navbar}/>
                <div className="absolute inset-0 bg-gray-300">
                    <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed" style={{
                        filter: "grayscale(1) contrast(1.2) opacity(0.4)"
                    }}></iframe>
                </div>
                <div className="container px-5 py-24 mx-auto flex">
                        <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Query</h2>
                            <p className="leading-relaxed mb-5 text-gray-600">In search of interior design inspiration?</p>
                            <div className="relative mb-4">
                                <label for="name" className="leading-7 text-sm text-gray-600">Name</label>
                                <input type="text" {...register('name', { required: true })}  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors.name && <p>Name is required</p>}
                            </div>
                            <div className="relative mb-4">
                                <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input type="email" {...register('email', { required: true })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                {errors.email && <p>Email is required</p>}
                            </div>
                            <div className="relative mb-4">
                                <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                                <textarea  {...register('query', { required: true })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                {errors.query && <p>Query is required</p>}
                            </div>
                            <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                            <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
                        </form>
                </div>
            </section>

            <div class="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 text-center text-white bg-gray-800">
                This is a Contact Page with map by Prashanta
            </div>
        </>
    );
}

export default TextInput;