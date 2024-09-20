import React, { useState } from 'react';
import { FiCopy, FiCheck } from "react-icons/fi";

function App() {
  const [congViecDaLam, setCongViecDaLam] = useState('');
  const [congViecDuKien, setCongViecDuKien] = useState('');
  const [name, setName] = useState('');
  const [baoCao, setBaoCao] = useState({ done: [], upcoming: [] });
  const date = new Date();
  const now = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const taoBaoCao = () => {
    const doneTasks = congViecDaLam.split('\n').filter(item => item.trim() !== '');
    const upcomingTasks = congViecDuKien.split('\n').filter(item => item.trim() !== '');

    setBaoCao({ done: doneTasks, upcoming: upcomingTasks });
  };


  const handleReportCreation = () => {
    taoBaoCao();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="App p-6 max-w-lg mx-auto bg-white rounded-xl space-y-6 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Tạo báo cáo công việc</h1>

        <div className="form-group space-y-4">
          <div>
            <label className="block font-medium">Tên:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Công việc đã làm:</label>
            <textarea
              value={congViecDaLam}
              onChange={(e) => setCongViecDaLam(e.target.value)}
              placeholder="Nhập công việc đã hoàn thành..."
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium">Dự kiến công việc:</label>
            <textarea
              value={congViecDuKien}
              onChange={(e) => setCongViecDuKien(e.target.value)}
              placeholder="Nhập công việc dự kiến..."
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={handleReportCreation}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold w-full"
        >
          Tạo báo cáo
        </button>
        <div className="bao-cao-output mt-6">
          <TextSnippetCopier value={`${name && `${name.split('-')[0] || ''} - Phòng 7 - Báo cáo công việc ${name.split('-')[1] || ''} ${now}.`}
  ${baoCao.done.length > 0 ? `Công việc đã làm:\n${baoCao.done.map(e => `- ${e}`).join('\n')}` : ''}
  ${baoCao.upcoming.length > 0 ? `Dự kiến:\n${baoCao.upcoming.map(e => `- ${e}`).join('\n')}` : ''}`}/>
        </div>
      </div>
    </div>
  );
}

export default App;


const TextSnippetCopier = ({value}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="relative">
          <textarea
            className="w-full p-3 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            value={value}
            readOnly
            aria-label="Text snippet to copy"
          />
          <button
            onClick={copyToClipboard}
            className={`absolute right-2 top-2 p-2 rounded-md transition-colors ${
              copied ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-label="Copy to clipboard"
          >
            {copied ? <FiCheck className="w-5 h-5" /> : <FiCopy className="w-5 h-5" />}
          </button>
        </div>
        {copied && (
          <p className="text-green-600 text-center font-medium">Copied to clipboard!</p>
        )}
        <p className="text-sm text-gray-600 text-center">
          Click the copy button to copy the text snippet to your clipboard.
        </p>
      </div>
  );
};

