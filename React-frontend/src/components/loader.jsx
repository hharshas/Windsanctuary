import React from "react";

export const Loader = () => {
    return (
        <div
            class=" inline-block mx-6 my-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span>
        </div>
    )
}