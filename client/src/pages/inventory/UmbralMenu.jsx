import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiMoreVertical } from "react-icons/fi";
import { Menu, MenuItem, MenuButton, MenuList } from "@reach/menu-button";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { UserContext } from "../../../context/userContext";

export const UmbralMenu = () => {
  const [materials, setMaterials] = useState([]);
  const { user } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [nameInputValue, setNameInputValue] = useState("");
  const [priceInputValue, setPriceInputValue] = useState("");
  const [bodegaInputValue, setBodegaInputValue] = useState("");
  const [formType, setFormType] = useState(null);
  const [expandedMaterialId, setExpandedMaterialId] = useState(null);
  const [newUmbral, setNewUmbral] = useState("");
  const [editMaterialId, setEditMaterialId] = useState(null);

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

  const updateUmbral = async (materialId) => {
    try {
        await axios.put(`http://localhost:8000/inventory/updateUmbral/${materialId}`, { umbral: newUmbral });
        const updatedMaterialsetMaterial = materials.map(material => 
            material._id === materialId ? { ...material, umbral: newUmbral } : material
        );
        setMaterials(updatedMaterialsetMaterial);
        setEditMaterialId(null);
        toast.success("Orden actualizada con éxito");
    } catch (err) {
        console.error(err);
        if(!newUmbral){
            toast.error("Existen campos vacíos.")
        }
        else{
            toast.error("Error al actualizar la orden");
        }
    }
};

  useEffect(() => {
    fetchMaterials();
  }, []);

  const toggleEdit = (material) => {
    setEditMaterialId(editMaterialId === material._id ? null : material._id);
    if (editMaterialId !== material._id) {
      setNewUmbral(material.umbral);
    }
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
                  {material.name + "   -  Umbral de seguridad: " + material.umbral}
                </p>
                <button
                  onClick={() => toggleEdit(material)}
                  className="mt-2 bg-lime-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-1 px-2 rounded text-xs"
                >
                  {editMaterialId === material._id
                    ? "Cancelar"
                    : "Actualizar umbral"}
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 ">
              {editMaterialId === material._id && (
                <div className="mt-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg w-full md:w-64">
                  <label className="block text-xs font-medium text-gray-900 dark:text-gray-400 mb-1">
                    Nuevo Umbral
                  </label>
                  <input
                    type="text"
                    placeholder="Nuevo Estado"
                    value={newUmbral}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newValue = Number(value);
                      setNewUmbral(value === '' ? '' : (newValue >= 0 ? newValue : 0));
                    }}
                    className="mb-2 p-2 text-xs w-full bg-gray-800 text-white border border-gray-300 dark:border-gray-600 rounded"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => updateUmbral(material._id)}
                      className="bg-lime-900 hover:bg-lime-700 text-white font-bold py-1 px-2 rounded text-xs mr-2"
                    >
                      Aplicar Cambios
                    </button>
                    <button
                      onClick={() => toggleEdit(material)}
                      className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-2 rounded text-xs"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
            
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-6">
        <Link to="/" className="m-2">
          <button className="bg-lime-900 dark:bg-gray-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded">
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  );
};
