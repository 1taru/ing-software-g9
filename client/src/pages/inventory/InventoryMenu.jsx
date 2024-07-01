import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiMoreVertical } from "react-icons/fi";
import { Menu, MenuItem, MenuButton, MenuList } from "@reach/menu-button";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

export const InventoryMenu = () => {
  const [materials, setMaterials] = useState([]);
  const { user } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [nameInputValue, setNameInputValue] = useState("");
  const [priceInputValue, setPriceInputValue] = useState("");
  const [bodegaInputValue, setBodegaInputValue] = useState("");
  const [formType, setFormType] = useState(null);
  const [expandedMaterialId, setExpandedMaterialId] = useState(null);

  const handleUpdateQuantity = (material) => {
    setSelectedMaterial(material);
    setFormType("quantity");
  };

  const handleUpdateProperties = (material) => {
    setSelectedMaterial(material);
    setFormType("properties");
  };

  const handleSaveProperties = async () => {
    try {
      await axios.put(
        `http://localhost:8000/inventory/updateProperties/${selectedMaterial._id}`,
        { name: nameInputValue, price: priceInputValue, location: bodegaInputValue }
      );
      setNameInputValue("");
      setPriceInputValue("");
      setBodegaInputValue("");
      setSelectedMaterial(null);
      fetchMaterials();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveQuantity = async () => {
    try {
      await axios.put(
        `http://localhost:8000/inventory/updateQuantity/${selectedMaterial._id}`,
        { quantity: inputValue }
      );
      setInputValue("");
      setSelectedMaterial(null);
      fetchMaterials();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/inventory/getMaterials"
      );
      console.log(response);
      setMaterials(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const deleteMaterial = async (materialId) => {
    try {
      await axios.delete(`http://localhost:8000/inventory/${materialId}`);
      setMaterials(materials.filter((material) => material._id !== materialId));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleDetails = (materialId) => {
    setExpandedMaterialId(materialId === expandedMaterialId ? null : materialId);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-slate-800 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-lime-600">
        Lista de Materiales
      </h2>
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
                      Fecha de Actualización:{" "}
                      {new Date(material.lastupdated).toLocaleString()}
                    </p>
                  </>
                )}
                <button
                  onClick={() => toggleDetails(material._id)}
                  className="mt-2 bg-lime-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-1 px-2 rounded text-xs"
                >
                  {expandedMaterialId === material._id ? "Ocultar detalles" : "Ver detalles"}
                </button>
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
              {selectedMaterial === material && formType === "quantity" && (
                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Cantidad"
                  />
                  <button className="bg-lime-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded" onClick={handleSaveQuantity}>Actualizar cantidad</button>
                </div>
              )}
              {selectedMaterial === material && formType === "properties" && (
                <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    placeholder="Nombre"
                    value={nameInputValue}
                    onChange={(e) => setNameInputValue(e.target.value)}
                  />
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    placeholder="Precio"
                    value={priceInputValue}
                    onChange={(e) => setPriceInputValue(e.target.value)}
                  />
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    value={bodegaInputValue}
                    onChange={(e) => setBodegaInputValue(e.target.value)}
                    placeholder="Ubicación"
                  />
                  <button className="bg-lime-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded" onClick={handleSaveProperties}>Actualizar propiedades</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-6">
        {user.accType == "acctype2" && (
          <Link to="/createMaterial" className="m-2">
            <button className="bg-lime-900 dark:bg-gray-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded">
              Crear nuevo material
            </button>
          </Link>
        )}
        <Link to="/" className="m-2">
          <button className="bg-lime-900 dark:bg-gray-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded">
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  );
};
