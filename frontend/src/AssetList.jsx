// src/AssetList.jsx
import { useEffect, useState } from 'react';

function AssetList() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/assets/all') // 确保你 AssetController 中有 `/all` 的 GET 方法
      .then((res) => res.json())
      .then((data) => setAssets(data))
      .catch((err) => console.error('Failed to fetch assets:', err));
  }, []);

  return (
    <div>
      <h2>📊 用户资产列表</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>类型</th>
            <th>名称</th>
            <th>数量</th>
            <th>当前价格</th>
            <th>总价值</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.type}</td>
              <td>{asset.name}</td>
              <td>{asset.amount}</td>
              <td>${asset.currentPrice}</td>
              <td>${(asset.amount * asset.currentPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetList;
