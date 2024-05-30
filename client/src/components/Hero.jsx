import React, { useContext } from "react";

import {
  RiCheckboxBlankCircleFill,
  RiPlayFill,
  RiStarFill,
} from "react-icons/ri";
import { UserContext } from "../../context/userContext";
import { InventarioButtons } from "./Buttons/InventarioButtons";
import { AdminButtons } from "./Buttons/adminButtons";
import { LogisticaButtons } from "./Buttons/logisticaButtons";
import { OperarioButtons } from "./Buttons/OperarioButtons";

const Hero = () => {

    const {user} = useContext(UserContext);

  return (
    <section id="home" className="min-h-[90vh] grid grid-cols-1 xl:grid-cols-8 bg-back">
      {/* Information */}
      <div className="md:col-span-5 flex items-center justify-center p-8 xl:p-16">
        <div className="flex flex-col gap-8">
          <h1 className="dark: text-lime-600 text-5xl xl:text-7xl font-bold xl:leading-[7.5rem] text-third ">
            Bienvenido {" "}
            <span className="text-prim py-2 px-6 border-8 border-prim relative inline-block">
              {user.name}
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -left-5 -top-5 p-2 bg-prim rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -right-5 -top-5 p-2 bg-prim rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -right-5 -bottom-5 p-2 bg-prim rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -left-5 -bottom-5 p-2 bg-prim rounded-full box-content" />
            </span>
          </h1>
          <p className="text-gray-500 text-2xl leading-[2.5rem] dark:text-gray-400">
            Página de gestión de inventario y procesos. Revisa y actualiza el estado de los pedidos Moldecor. 
          </p>

            { user.accType == "acctype1" && <OperarioButtons/>}
            { user.accType == "acctype2" && <InventarioButtons/>}
            { user.accType == "acctype3" && <LogisticaButtons/>}
            { user.accType == "admin" && <AdminButtons/>}
          
        </div>
      </div>
      {/* Image */}
      < div className="md:col-span-3 flex items-center justify-center relative">
        {/* Content image */}
        <div>
          <img
            src="https://www.moldecor.cl/img/logo_moldecor.png"
          />
        </div>
      </div>

        
      
    </section>
  );
};

export default Hero;
