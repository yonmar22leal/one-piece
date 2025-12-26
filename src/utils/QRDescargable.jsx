import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

const QRDescargable = ({ urlPagina = 'https://one-piece-memories.netlify.app' }) => {
  const qrRef = useRef(null);

  const descargarQR = () => {
    if (qrRef.current) {
      toPng(qrRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'mi-pagina-qr.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => console.error('Error:', err));
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-2xl max-w-md mx-auto border-4 border-gray-100">
      <div ref={qrRef} className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-inner">
        <QRCode 
          value={urlPagina} 
          size={220}
          bgColor="#ffffff"
          fgColor="#1f2937"
          level="H"
          viewBox="0 0 220 220"
        />
      </div>
      <button
        onClick={descargarQR}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
      >
        📱 Descargar PNG para llavero
      </button>
      <p className="mt-3 text-sm text-gray-500 text-center max-w-xs">
        Escanea para visitar {urlPagina}
      </p>
    </div>
  );
};

export default QRDescargable;
