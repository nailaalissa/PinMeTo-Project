/* eslint-disable react/prop-types */
// Store.jsx
import { useState, useEffect } from 'react';

const Store = ({ storeId, companyName }) => {
  const [storeInfo, setStoreInfo] = useState(null);

  const fetchStoreInfo = ({ storeId, companyName }) => {
    fetch(`http://localhost:3001/api-Store/${storeId}?companyName=${companyName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setStoreInfo(data);
      })
      .catch((error) => console.error('Error fetching store info:', error));
  };

  useEffect(() => {
    fetchStoreInfo({ storeId, companyName });
  }, [storeId, companyName]);
  //console.log(storeInfo);
  return (
    <div>
      <h2 className="marginButtom">Store Information</h2>
      {storeInfo && (
        <div>
          <p className="marginButtom">
            <strong>Store Name :</strong> {storeInfo.name}
          </p>
          <p className="marginButtom">
            <strong>Address:</strong> {storeInfo.address.street}, {storeInfo.address.zip},{' '}
            {storeInfo.address.city}
          </p>
          <p className="marginButtom">
            <strong>Contact:</strong> Email: {storeInfo.contact.email}
          </p>
          <h3 className="marginButtom">Open Hours</h3>
          <ul>
            {Object.entries(storeInfo.openHours).map(([day, info]) => (
              <li key={day} className="storeState">
                <strong>{day.toUpperCase()}: </strong>
                {info.state === 'Open' ? (
                  <>
                    {info.span.length > 0 && (
                      <span>
                        {info.span[0].open.slice(0, 2)} - {info.span[0].close.slice(0, 2)}
                      </span>
                    )}
                  </>
                ) : (
                  <span>Closed</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Store;
