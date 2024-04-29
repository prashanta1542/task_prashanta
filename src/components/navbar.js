import React from "react";
import { Route,Link } from "react-router-dom";

export default function Navbar({ props }) {
    return (
        <navbar className="fixed top-0 left-0 right-0 z-40 px-4 py-3">
            <div class="flex justify-between px-6 bg-indigo-500 items-center py-4">
                <div class="flex space-x-4 items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 cursor-pointer text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <h1 class="text-white font-bold text-xl tracking-wide cursor-pointer">Sheraspace</h1>
                </div>
                <ul class="flex space-x-6">
                    {
                        props.map((item, index) => {
                            return (
                                <li key={index} className="text-white text-lg font-semibold tracking-normal">
                                   <a href={item.path}>{item.navitem}</a>
                                </li>
                            )
                        })
                    }


                </ul>
            </div>
        </navbar>

    )
}