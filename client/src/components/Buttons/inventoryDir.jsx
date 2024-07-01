import React from 'react';
import { Link } from 'react-router-dom';

const SubjectsButton = () => {
    return (
        <Link to="/inventario" className="m-2">
            <button className="bg-lime-900 dark:bg-gray-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded">
                Materias
            </button>
        </Link>
    );
};

export default SubjectsButton;
