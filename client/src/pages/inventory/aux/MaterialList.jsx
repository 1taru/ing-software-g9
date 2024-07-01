import React, { useState } from "react";
import MaterialDetails from "./MaterialDetails";
import DetailsButton from "./DetailsButton";
import { FiMoreVertical } from "react-icons/fi";
import { Menu, MenuItem, MenuButton, MenuList } from "@reach/menu-button";

const MaterialList = ({
  materials,
  handleUpdateQuantity,
  handleUpdateProperties,
  deleteMaterial,
}) => {
  const [expandedMaterialId, setExpandedMaterialId] = useState(null);

  const toggleDetails = (materialId) => {
    setExpandedMaterialId(materialId === expandedMaterialId ? null : materialId);
  };

  return (
    <ul
      role="list"
      className="divide-y divide-gray-300 dark:divide-gray-800 max-w-4xl mx-auto bg-white dark:bg-slate-900 shadow rounded-lg"
    >
      {materials.map((material) => (
        <li
          key={material._id}
          className="flex justify-between items-center gap-x-6 py-5 px-4"
        >
          <div className="flex items-center gap-x-4 flex-grow">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400">
                {material.name}
              </p>
              {expandedMaterialId === material._id && (
                <MaterialDetails material={material} />
              )}
              <DetailsButton
                isExpanded={expandedMaterialId === material._id}
                toggleDetails={toggleDetails}
                materialId={material._id}
              />
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col items-end">
            <Menu>
              <MenuButton className="inline-flex justify-center items-center w-10 h-8 rounded-md border border-gray-300 dark:border-sky-900 shadow-sm bg-lime-600 hover:bg-lime-700 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-indigo-500">
                <FiMoreVertical className="text-white" />
              </MenuButton>
              <MenuList className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-sky-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem
                  onSelect={() => handleUpdateQuantity(material)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-sky-700"
                >
                  Actualizar cantidad
                </MenuItem>
                <MenuItem
                  onSelect={() => handleUpdateProperties(material)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-sky-700"
                >
                  Actualizar propiedades
                </MenuItem>
                <MenuItem
                  onSelect={() => deleteMaterial(material._id)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-sky-700"
                >
                  Eliminar
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MaterialList;
