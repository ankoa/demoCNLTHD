import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelReader() {
    const [data, setData] = useState([]);

    // Xử lý tải lên file Excel
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const binaryStr = evt.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });

            // Lấy tên sheet đầu tiên
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Chuyển dữ liệu từ sheet sang dạng JSON, sử dụng hàng đầu tiên làm tiêu đề
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Dữ liệu là mảng 2D

            // Lấy hàng đầu tiên làm tiêu đề
            const headers = jsonData[0];
            const rows = jsonData.slice(1);

            // Chuyển dữ liệu thành mảng các đối tượng với tiêu đề là thuộc tính
            const formattedData = rows.map(row => {
                const rowData = {};
                row.forEach((cell, index) => {
                    rowData[headers[index]] = cell;
                });
                return rowData;
            });

            setData(formattedData); // Cập nhật dữ liệu
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            <table>
                <thead>
                    <tr>
                        {data[0] && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExcelReader;
