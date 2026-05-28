import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const API = 'https://breathe-esg-ty4m.onrender.com/api/'

function App() {
  const [file, setFile] = useState(null)
  const [sourceType, setSourceType] = useState('SAP')
  const [records, setRecords] = useState([])

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${API}/api/records/`)
      setRecords(res.data)
    } catch (err) {
      console.error("Error fetching records:", err)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const uploadFile = async () => {
    if (!file) {
      alert('Please select a file first!')
      return
    }
    try {
      const formData = new FormData()
      // We send both 'file' and 'csv_file' to bypass any backend naming mismatch bugs
      formData.append('file', file)
      formData.append('csv_file', file)
      formData.append('source_type', sourceType)

      const res = await axios.post(`${API}/api/upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      console.log(res.data)
      alert('Upload successful!')
      setFile(null) 
      fetchRecords()
    } catch (err) {
      console.error("Upload Error:", err)
      // Extracts the EXACT error message string from your Django views
      const errorDetails = err.response?.data 
        ? JSON.stringify(err.response.data) 
        : err.message
      
      alert(`Upload Failed!\nServer Message: ${errorDetails}`)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/api/records/${id}/`, { status })
      fetchRecords()
    } catch (err) {
      console.error("Status Update Error:", err)
    }
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Breathe ESG Dashboard</h1>

      {/* Styled Top Action Bar */}
      <div className="action-bar">
        <select
          className="custom-select"
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
        >
          <option value="SAP">SAP</option>
          <option value="UTILITY">UTILITY</option>
          <option value="TRAVEL">TRAVEL</option>
        </select>

        <label className="file-upload-label">
          <span>Choose File</span>
          <input
            type="file"
            className="hidden-file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <span className="file-name">{file ? file.name : 'No file chosen'}</span>

        <button className="primary-upload-btn" onClick={uploadFile}>
          Upload
        </button>
      </div>

      {/* Modern Table Layout */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Activity</th>
              <th>Amount</th>
              <th>Unit</th>
              <th>Carbon</th>
              <th>Suspicious</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', color: '#64748b', padding: '32px' }}>
                  No records found. Upload a file above to populate data.
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.id}>
                  <td><span className="badge badge-source">{r.source_type}</span></td>
                  <td>{r.activity_type || r.activity}</td>
                  <td className="font-numeric">{r.amount}</td>
                  <td>{r.unit}</td>
                  <td className="font-numeric font-bold">{r.carbon_kg} kg</td>
                  <td>
                    <span className={`badge ${r.suspicious ? 'badge-danger' : 'badge-success'}`}>
                      {r.suspicious ? 'YES' : 'NO'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-text status-${r.status?.toLowerCase()}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-group">
                      <button 
                        className="btn-action btn-approve"
                        onClick={() => updateStatus(r.id, 'APPROVED')}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn-action btn-reject"
                        onClick={() => updateStatus(r.id, 'REJECTED')}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
