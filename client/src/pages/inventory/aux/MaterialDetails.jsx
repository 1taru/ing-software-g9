import React from "react";

const MaterialDetails = ({ material }) => {
  return (
    <>
      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
        Precio: {material.price}
      </p>
      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
        Cantidad: {material.quantity}
      </p>
      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
        Ubicación: {material.location}
      </p>
      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
        Fecha de Actualización: {new Date(material.lastupdated).toLocaleString()}
      </p>
    </>
  );
};

export default MaterialDetails;
