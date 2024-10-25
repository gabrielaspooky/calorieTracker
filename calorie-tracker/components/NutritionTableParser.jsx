"use client";
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const NutritionTableParser = () => {
  const [image, setImage] = useState(null);
  const [nutritionInfo, setNutritionInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Verifica si el archivo es una imagen
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (validImageTypes.includes(file.type)) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); // Crea la vista previa de la imagen
        setError(''); // Limpia cualquier error previo
      } else {
        setError('Por favor, selecciona una imagen válida (JPG, PNG o GIF).');
      }
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;

    setLoading(true);
    setError('');
    setNutritionInfo('');

    try {
      const { data: { text } } = await Tesseract.recognize(
        image,
        'eng',
        {
          logger: (m) => console.log(m), // Puedes ver el progreso en la consola
        }
      );
      setNutritionInfo(text);
    } catch (error) {
      console.error(error); // Muestra el error en la consola
      setError('Error al procesar la imagen. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Nutrición Table Parser</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 border rounded p-2 w-full cursor-pointer"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="mt-4 w-full h-auto rounded-md shadow-lg"
        />
      )}
      <button
        onClick={handleImageUpload}
        disabled={!image || loading}
        className={`bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Cargando...' : 'Procesar Imagen'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {nutritionInfo && (
        <div className="mt-4">
          <h3 className="font-bold">Información Nutricional:</h3>
          <pre className="whitespace-pre-wrap bg-white p-4 rounded shadow">{nutritionInfo}</pre>
        </div>
      )}
    </div>
  );
};

export default NutritionTableParser;
