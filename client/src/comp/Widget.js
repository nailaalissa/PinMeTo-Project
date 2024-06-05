import React, { useState } from 'react';

export default function Widget() {
  const [companyName, setCompanyName] = useState('lexicon');
  const [iframeSrc, setIframeSrc] = useState(
    `http://localhost:3000/MapContainer?companyName=lexicon`,
  );
  const [showLink, setShowLink] = useState(false);

  const handleCompanyChange = (e) => {
    setCompanyName(e.target.value);
  };

  const generateIframeLink = () => {
    setIframeSrc(`http://localhost:3000/MapContainer?companyName=${companyName}`);
    setShowLink(true);
  };

  return (
    <div style={{ minHeight: '90vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 className="margin">Map Widget</h1>
        <div className="widgetLink">
          <select className="selectComany" value={companyName} onChange={handleCompanyChange}>
            <option value="lexicon">Lexicon</option>
            <option value="acme">acme</option>
          </select>
          <br />
          <button className="generatLink" onClick={generateIframeLink} style={{ margin: '20px' }}>
            Generate Link
          </button>
        </div>
        {showLink && (
          <>
            <h4>
              Copy the URL link to embed the map widget
              <br />
              <br />
              <p className="widget">
                &lt;iframe src="{`http://localhost:3000/MapContainer?companyName=${companyName}`}"
                title="Widget" width="100%" height="600"&gt;&lt;/iframe&gt;
              </p>
            </h4>
            <iframe
              src={iframeSrc}
              title="Widget"
              width="100%"
              height="600"
              style={{ border: 'none' }}
            ></iframe>
          </>
        )}
      </div>
    </div>
  );
}
