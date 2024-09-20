import React, { useState } from 'react';

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

  const copyToClipboard = () => {
    const reportContent = document.getElementById('baocao-output').value;
    navigator.clipboard.writeText(reportContent).then(() => {
      alert('Báo cáo đã được sao chép vào clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleReportCreation = () => {
    taoBaoCao();
    copyToClipboard();
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
          <textarea
            id="baocao-output"
            readOnly
            value={`${name && `${name.split('-')[0] || ''} - Phòng 7 - Báo cáo công việc ${name.split('-')[1] || ''} ${now}.`}
              ${baoCao.done.length > 0 ? `\nCông việc đã làm:\n${baoCao.done.join('\n')}` : ''}
              ${baoCao.upcoming.length > 0 ? `\nDự kiến:\n${baoCao.upcoming.join('\n')}` : ''}
            `}
            className="w-full h-40 p-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
