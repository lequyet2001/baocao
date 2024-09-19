import React, { useState } from 'react';

function App() {
  const [congViecDaLam, setCongViecDaLam] = useState('');
  const [congViecDuKien, setCongViecDuKien] = useState('');
  const [ name, setName] = useState('');
  const [baoCao, setBaoCao] = useState({ done: [], upcoming: [] });
  const date = new Date();
  const now = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const taoBaoCao = () => {
    const doneTasks = congViecDaLam.split('\n').filter(item => item.trim() !== '');
    const upcomingTasks = congViecDuKien.split('\n').filter(item => item.trim() !== '');
    
    setBaoCao({ done: doneTasks, upcoming: upcomingTasks });
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
          onClick={taoBaoCao}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg font-bold w-full "
        >
          Tạo báo cáo
        </button>

        <div className="bao-cao-output mt-6">
          <h2 className="text-xl font-bold">{name.split('-')[0]} - Phòng 7 - Báo cáo công việc {name.split('-')[1]} {now}.</h2>
          {baoCao.done.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4">{name.split('-')[2]}:</h3>
              <ul className="list-disc list-inside space-y-2">
                {baoCao.done.map((task, index) => (
                  <div key={index} className="text-gray-700">{task}</div>
                ))}
              </ul>
            </>
          )}
          {baoCao.upcoming.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mt-4">Dự kiến:</h3>
              <ul className="list-disc list-inside space-y-2">
                {baoCao.upcoming.map((task, index) => (
                  <div key={index} className="text-gray-700">{task}</div>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
